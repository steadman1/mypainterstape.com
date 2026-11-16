import { useEffect, useRef, useState } from 'react';
import { Work } from '../../../objects/Work';
import { Arrow, Direction } from '../../Icons/Arrow';
import SlideLayout from './SlideLayout';

type Props = {
    work: Work,
    detailIndex: number,
    // Image at the front, rounded; drives the dots and arrows.
    imageIndex: number,
    // Continuous stack position from scroll (1.5 = halfway from the second image to the third).
    subscribeImagePosition: (listener: (position: number) => void) => () => void,
    onSelectImage: (index: number) => void,
};

// How the stack looks, in "depth steps" (1 = the image directly behind the front one).
const DEPTH_STEP_Z = 120;      // px further back per step
const DEPTH_STEP_LIFT = 7;     // % of the image's height it rises per step, to peek over the front
const DEPTH_STEP_DIM = 0.14;   // brightness lost per step
const DEPTH_STEP_BLUR = 1.5;   // px of blur per step (depth of field)
const VISIBLE_BEHIND = 2.6;    // steps behind the front that are still drawn

// The front image, on its way out: comes toward the viewer, grows, blurs and fades.
const EXIT_Z = 180;
const EXIT_SCALE = 0.18;
const EXIT_BLUR = 16;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A 2.5D stack of images. The front image is sharp; the next ones wait behind it, smaller,
// darker and a little blurred. Scrolling pushes the front image toward the viewer as it blurs
// and fades away, and the next one moves up to take its place.
function ImageStackWorkDetail({ work, detailIndex, imageIndex, subscribeImagePosition, onSelectImage }: Props) {
    const [loaded, setLoaded] = useState(false);
    const stackRef = useRef<HTMLDivElement>(null);
    const detail = work.details[detailIndex];
    const count = detail.images.length;

    useEffect(() => subscribeImagePosition((position) => {
        const images = stackRef.current?.children;
        if (!images) return;
        const reduced = reducedMotion();

        for (let i = 0; i < images.length; i++) {
            const image = images[i] as HTMLElement;
            const depth = i - position; // < 0: leaving, 0: front, > 0: waiting behind

            if (depth <= -1 || depth > VISIBLE_BEHIND + 0.4) {
                image.style.visibility = "hidden";
                image.style.opacity = "0";
                continue;
            }
            image.style.visibility = "visible";

            if (reduced) {
                // A plain crossfade between the front image and the next.
                image.style.transform = "translate3d(-50%, 0, 0)";
                image.style.filter = "";
                image.style.opacity = String(Math.max(0, 1 - Math.abs(depth)));
                image.style.zIndex = String(depth < 0 ? 100 : 99 - i);
                continue;
            }

            if (depth < 0) {
                const t = -depth;
                image.style.transform = `translate3d(-50%, ${-2 * t}%, ${EXIT_Z * t}px) scale(${1 + EXIT_SCALE * t})`;
                image.style.filter = `blur(${(EXIT_BLUR * t).toFixed(2)}px)`;
                image.style.opacity = String(1 - t);
                image.style.zIndex = "100";
            } else {
                const fadeOut = Math.max(0, depth - (VISIBLE_BEHIND - 0.6)); // the last one fades in from nothing
                image.style.transform = `translate3d(-50%, ${-DEPTH_STEP_LIFT * depth}%, ${-DEPTH_STEP_Z * depth}px)`;
                image.style.filter = depth < 0.01
                    ? ""
                    : `blur(${(DEPTH_STEP_BLUR * depth).toFixed(2)}px) brightness(${(1 - DEPTH_STEP_DIM * depth).toFixed(3)})`;
                image.style.opacity = String(Math.max(0, 1 - fadeOut));
                image.style.zIndex = String(99 - Math.round(depth * 10));
            }
        }
    }), [subscribeImagePosition]);

    const stack = (
        <div className="ow-stack-wrap">
            <div ref={stackRef} className={`ow-stack ${loaded ? "is-loaded" : ""}`} role="group" aria-label={`${detail.title} images`}>
                {
                    detail.images.map((image, index) => (
                        <img
                            key={image}
                            className="ow-stack-image"
                            src={`/${image}`}
                            alt={`${work.name}: ${detail.title} (${index + 1} of ${count})`}
                            onLoad={index === 0 ? () => setLoaded(true) : undefined}
                            onClick={index === imageIndex ? undefined : () => onSelectImage(index)}
                            data-cursor={index === imageIndex ? undefined : ""}
                            draggable={false}
                        />
                    ))
                }
            </div>
            {
                count > 1 ? (
                    <div className="ow-stack-controls">
                        <button className="ow-icon-button" aria-label="Previous image" disabled={imageIndex === 0} onClick={() => onSelectImage(imageIndex - 1)}>
                            <Arrow color="currentColor" direction={Direction.WEST} />
                        </button>
                        <div className="ow-dots">
                            {
                                detail.images.map((image, index) => (
                                    <button
                                        key={image}
                                        className={`ow-dot ${index === imageIndex ? "is-active" : ""}`}
                                        aria-label={`Show image ${index + 1} of ${count}`}
                                        aria-current={index === imageIndex ? "true" : undefined}
                                        onClick={() => onSelectImage(index)}
                                    />
                                ))
                            }
                        </div>
                        <button className="ow-icon-button" aria-label="Next image" disabled={imageIndex === count - 1} onClick={() => onSelectImage(imageIndex + 1)}>
                            <Arrow color="currentColor" direction={Direction.EAST} />
                        </button>
                    </div>
                ) : null
            }
        </div>
    );

    return <SlideLayout media={stack} title={detail.title} subtitle={detail.subtitle} description={detail.description} />;
}

export default ImageStackWorkDetail;
