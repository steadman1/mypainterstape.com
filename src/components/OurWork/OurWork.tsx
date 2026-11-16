import OurWorkHeader from "./OurWorkHeader";
import OurWorkEntrance from "./OurWorkEntrance";
import OurWorkFooter from "./OurWorkFooter";
import { useState, useEffect, useCallback, useMemo, useRef, CSSProperties } from 'react';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Work, WorkDetail, WorkDetailType } from "../../objects/Work";
import { useLocomotiveScrollEvent, getLayoutTop, getScrollY, ScrollArgs } from "../../hooks/useLocomotiveScrollEvent";

type WorkSlide = {
    workIndex: number;
    detailIndex: number;
    // Position and length of this slide on the scroll track, in slide units.
    start: number;
    weight: number;
};

// Viewport heights of scrolling per slide unit.
const SCROLL_PER_SLIDE = 0.8;
// Viewport heights over which the card grows to full screen on the way in (and shrinks on the way out).
const ENTRY_DISTANCE = 0.85;
const CARD_MIN_SCALE = 0.9;
const CARD_MAX_RADIUS = 30;
// Lands a programmatic scroll just inside a slide rather than on its edge.
const SLIDE_LANDING_OFFSET = 0.04;

// Image stacks get extra scroll length so each image gets its own stretch of scrolling.
const slideWeight = (detail: WorkDetail) => {
    if (detail.type === WorkDetailType.DESCRIPTION_WITH_MANY_IMAGES && detail.images.length > 1) {
        return 1 + 0.6 * (detail.images.length - 1);
    }
    return 1;
};

// Fraction of each image's stretch of scrolling spent holding still at either end, so every
// image rests at the front for a while before the next one takes its place.
const IMAGE_HOLD = 0.25;

const smoothstep = (t: number) => t * t * (3 - 2 * t);

// Continuous position in an image stack (0 = first image in front, 1 = second, ...) for a
// given progress (0 to 1) through the slide.
const imagePosition = (progress: number, count: number) => {
    if (count <= 1) return 0;
    const x = clamp(progress * count - 0.5, 0, count - 1);
    const index = Math.min(Math.floor(x), count - 2);
    const t = clamp((x - index - IMAGE_HOLD) / (1 - 2 * IMAGE_HOLD), 0, 1);
    return index + smoothstep(t);
};

const imageCount = (detail: WorkDetail) =>
    detail.type === WorkDetailType.DESCRIPTION_WITH_MANY_IMAGES ? detail.images.length : 0;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

enum StagePosition {
    BEFORE,
    INSIDE,
    AFTER,
}

function OurWork() {
    const works = Work.works;
    const { height } = useWindowDimensions();

    const slides = useMemo(() => {
        let start = 0;
        return works.flatMap((work, workIndex) => work.details.map((detail, detailIndex) => {
            const slide: WorkSlide = { workIndex, detailIndex, start, weight: slideWeight(detail) };
            start += slide.weight;
            return slide;
        }));
    }, [works]);

    const lastSlide = slides[slides.length - 1];
    const totalUnits = lastSlide.start + lastSlide.weight;
    const unitPx = height * SCROLL_PER_SLIDE;
    const pinRange = totalUnits * unitPx;
    const trackHeight = pinRange + height;

    const trackRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const [slideIndex, setSlideIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const [position, setPosition] = useState(StagePosition.BEFORE);
    const slideIndexRef = useRef(0);
    // Where an in-flight programmatic scroll is headed, so Next/Back pressed mid-flight step
    // from the destination rather than from whatever slide is passing by.
    const pendingSlide = useRef<{ index: number, offset: number, until: number } | null>(null);

    // The image stack follows scroll every frame, so its position is published to the stack
    // directly instead of going through React state.
    const imagePositionRef = useRef(0);
    const imageListeners = useRef(new Set<(position: number) => void>());
    const subscribeImagePosition = useCallback((listener: (position: number) => void) => {
        imageListeners.current.add(listener);
        listener(imagePositionRef.current);
        return () => { imageListeners.current.delete(listener); };
    }, []);

    const handleScroll = useCallback(({ scroll }: ScrollArgs) => {
        const track = trackRef.current;
        const stage = stageRef.current;
        const card = cardRef.current;
        if (!track || !stage || !card) return;

        const local = scroll.y - getLayoutTop(track);

        const pending = pendingSlide.current;
        if (pending && (Math.abs(local - pending.offset) < 4 || performance.now() > pending.until)) {
            pendingSlide.current = null;
        }

        // Pin the stage for the length of the track. Written straight to the DOM so it lands
        // in the same frame as Locomotive's own section transform.
        stage.style.transform = `translate3d(0, ${clamp(local, 0, pinRange)}px, 0)`;

        // Grow into a full-screen card on the way in, shrink back to a card on the way out.
        const before = clamp(-local / (height * ENTRY_DISTANCE), 0, 1);
        const after = clamp((local - pinRange) / (height * ENTRY_DISTANCE), 0, 1);
        const inset = easeOutCubic(Math.max(before, after));
        const scale = 1 - (1 - CARD_MIN_SCALE) * inset;
        card.style.transform = `scale(${scale})`;
        card.style.borderRadius = `${(CARD_MAX_RADIUS * inset) / scale}px`;

        setPosition(local < -1 ? StagePosition.BEFORE : local > pinRange + 1 ? StagePosition.AFTER : StagePosition.INSIDE);

        const units = clamp(local / unitPx, 0, totalUnits - 1e-6);
        let index = slides.findIndex((slide) => units < slide.start + slide.weight);
        if (index < 0) index = slides.length - 1;

        const slide = slides[index];
        const count = imageCount(works[slide.workIndex].details[slide.detailIndex]);
        const progress = (units - slide.start) / slide.weight;
        const imageAt = imagePosition(progress, count);
        imagePositionRef.current = imageAt;
        imageListeners.current.forEach((listener) => listener(imageAt));
        setImageIndex(Math.round(imageAt));

        if (index !== slideIndexRef.current) {
            setDirection(index > slideIndexRef.current ? "forward" : "backward");
            slideIndexRef.current = index;
            setSlideIndex(index);
        }
    }, [height, pinRange, slides, totalUnits, unitPx, works]);

    const scrollRef = useLocomotiveScrollEvent(handleScroll);

    // The track height depends on the viewport, so Locomotive has to re-measure after a resize.
    useEffect(() => {
        const scroll = scrollRef?.current;
        if (!scroll) return;
        scroll.update();
        handleScroll({ scroll: { x: 0, y: getScrollY(scroll) } });
    }, [trackHeight, handleScroll, scrollRef]);

    const scrollToTrackOffset = useCallback((offset: number) => {
        const scroll = scrollRef?.current;
        const track = trackRef.current;
        if (!scroll || !track) return 0;

        const target = getLayoutTop(track) + offset;
        const distance = Math.abs(target - getScrollY(scroll));
        const duration = clamp(500 + distance * 0.15, 700, 1600);
        // The installed runtime is Locomotive v3, whose scrollTo takes positional arguments
        // (the bundled @types describe v4's options object).
        (scroll.scrollTo as unknown as (target: number, offset: number, duration: number) => void)(target, 0, duration);
        return duration;
    }, [scrollRef]);

    const goToSlide = useCallback((index: number, image = 0) => {
        const target = clamp(index, 0, slides.length - 1);
        const slide = slides[target];
        const count = imageCount(works[slide.workIndex].details[slide.detailIndex]);
        // The middle of an image's stretch is where imagePosition() puts it at the front.
        const within = count > 0 ? ((image + 0.5) / count) * slide.weight : SLIDE_LANDING_OFFSET;
        const offset = (slide.start + within) * unitPx;
        const duration = scrollToTrackOffset(offset);
        // Cleared when the scroll arrives; the deadline is only a fallback if it never does.
        pendingSlide.current = { index: target, offset, until: performance.now() + duration + 3000 };
    }, [slides, works, scrollToTrackOffset, unitPx]);

    const inFlightSlide = () => pendingSlide.current?.index ?? null;

    const currentSlide = useCallback(() => inFlightSlide() ?? slideIndex, [slideIndex]);

    const goToWork = useCallback((workIndex: number) => {
        goToSlide(slides.findIndex((slide) => slide.workIndex === workIndex));
    }, [goToSlide, slides]);

    const exit = useCallback(() => {
        pendingSlide.current = null;
        scrollToTrackOffset(trackHeight);
    }, [scrollToTrackOffset, trackHeight]);

    const enter = useCallback(() => {
        goToSlide(position === StagePosition.AFTER ? slides.length - 1 : 0);
    }, [goToSlide, position, slides.length]);

    const next = useCallback(() => {
        const current = currentSlide();
        if (position === StagePosition.BEFORE && inFlightSlide() === null) return goToSlide(0);
        if (current + 1 >= slides.length) return exit();
        goToSlide(current + 1);
    }, [position, currentSlide, slides.length, goToSlide, exit]);

    const back = useCallback(() => {
        const current = currentSlide();
        if (current > 0) goToSlide(current - 1);
    }, [currentSlide, goToSlide]);

    const selectImage = useCallback((image: number) => goToSlide(slideIndex, image), [goToSlide, slideIndex]);

    const isInside = position === StagePosition.INSIDE;

    // Left and right arrow keys step between slides while the section fills the screen.
    useEffect(() => {
        if (!isInside) return;
        const handleKey = (event: KeyboardEvent) => {
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
            if (event.key === "ArrowRight") next();
            else if (event.key === "ArrowLeft") back();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isInside, next, back]);

    const slide = slides[slideIndex];
    const work = works[slide.workIndex];

    // Each work's palette and fonts, for the stylesheet.
    const theme = {
        "--ow-bg": work.backgroundColor.toRgbString(),
        "--ow-text": work.primaryTextColor.toRgbString(),
        "--ow-accent": work.lightAccentColor.toRgbString(),
        "--ow-accent-bg": work.darkAccentColor.toRgbString(),
        "--ow-title-font": `"${work.titleFont}"`,
        "--ow-subtitle-font": `"${work.subtitleFont}"`,
        "--ow-body-font": `"${work.bodyFont}"`,
        borderColor: work.usesStroke ? work.lightAccentColor.toRgbString() : "transparent",
    } as CSSProperties;

    return (
        <section data-scroll-section id="our-work" ref={trackRef} style={{ height: trackHeight }}>
            <div className="our-work-stage" ref={stageRef} style={{ height }}>
                <div className="our-work-card" ref={cardRef} style={theme}>
                    <OurWorkHeader
                        works={works}
                        workIndex={slide.workIndex}
                        isInside={isInside}
                        onSelectWork={goToWork}
                        onExit={exit}
                        onEnter={enter}
                    />
                    <div id="our-work-entrance">
                        <OurWorkEntrance
                            key={slideIndex}
                            work={work}
                            detailIndex={slide.detailIndex}
                            imageIndex={imageIndex}
                            subscribeImagePosition={subscribeImagePosition}
                            onSelectImage={selectImage}
                            direction={direction}
                        />
                    </div>
                    <OurWorkFooter
                        work={work}
                        detailIndex={slide.detailIndex}
                        isFirst={slideIndex === 0}
                        isFinal={slideIndex === slides.length - 1}
                        isInside={isInside}
                        onNext={next}
                        onBack={back}
                    />
                </div>
            </div>
        </section>
    );
}

export default OurWork;
