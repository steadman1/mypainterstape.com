import OurWorkBar from "./OurWorkBar";
import OurWorkEntrance from "./OurWorkEntrance";
import OurWorkCallToAction from "./OurWorkCallToAction";
import { useState, useEffect } from 'react';
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Work, WorkType, WorkDetail, WorkDetailType, CallToActionType } from "../objects/Work";
import { Color } from "../objects/Color";

function OurWork() {
    const { height } = useWindowDimensions();
    const [lockScroll, setLockScroll] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const newScrollPosition = scrollPosition - height / 1.4;

    const maxRound = 30;

    const round = lockScroll ? Math.min(maxRound, (newScrollPosition + height / 8) / -12) : maxRound;
    const handleClipPath = () => {
        return `inset(0 round ${round}px)`
    };

    const handleScale = () => {
        const rect = document.getElementById("our-work")?.getBoundingClientRect();

        if (!lockScroll) {
            return `scale(0.9)`;
        }

        if (!rect || (newScrollPosition - rect.top) > 0) {
            return "scale(1)";
        }

        const scale = Math.max(0.7, Math.pow(newScrollPosition / rect.top, 3) / 4 + 1);
        return `scale(${Math.min(1, scale)})`;
    };

    const ponderWork = new Work(
        "Ponder",
        WorkType.IOSAPP,
        
        // Ground Colors
        new Color("#69709D"),
        new Color("#434660"),
        new Color("#22223B"),

        // Accent Colors
        new Color("#B47DF2"),
        new Color("#504177"),

        // Text Colors
        new Color("#FFFFFF"),
        new Color("#A9A9A9"),

        // UI Stroke
        false,

        // Fonts
        "Inter",
        "Inter",
        "Manrope",
        
        // Work Details
        [
            new WorkDetail(
                WorkDetailType.DESCRIPTION_WITH_LOGO,
                ["ponder-full-cloud.png"],
                CallToActionType.CONTINUE,
                "Introducing Ponder, your new Lucid Dreaming Journal.",
            ),
        ]
    )
    const lotusWork = new Work(
        "Lotus",
        WorkType.IOSAPP,
        
        // Ground Colors
        new Color("#FFFFFF"),
        new Color("#000000"),
        new Color("#FFFFFF"),

        // Accent Colors
        new Color("#000000"),
        new Color("#FFFFFF"),

        // Text Colors
        new Color("#000000"),
        new Color("#FFFFFF"),

        // UI Stroke
        true,

        // Fonts
        "Inter",
        "Inter",
        "Manrope",

        // Work Details
        [
            new WorkDetail(
                WorkDetailType.DESCRIPTION,
                [],
                CallToActionType.CONTINUE,
                "Introducing Lotus, your new Spotify Companion.",
            )
        ]
    )

    const works = [
        ponderWork,
        lotusWork
    ]

    const [workIndex, setWorkIndex] = useState(0);
    const [detailIndex, setDetailIndex] = useState(0);

    const handleScroll = () => {
        const rect = document.getElementById("our-work")?.getBoundingClientRect();
        const position = window.scrollY;
        setScrollPosition(position);

        if (rect && rect.top <= 0) {
            const scrollTo = position + rect.top;

            if (lockScroll) {
                window.scrollTo({ left: 0, top: scrollTo, behavior: "instant" });
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };      
    }, [lockScroll]);

    const border = `2px solid ${works[workIndex].lightAccentColor}`;

    return (
        <>
            <div className={ `vstack expanding ${lockScroll ? "animated-background-color-only" : "animated"}` } id="our-work" style={{ clipPath: handleClipPath(), transform: handleScale(), backgroundColor: works[workIndex].backgroundColor.toRgbString(), border: works[workIndex].usesStroke ? border : "none", borderRadius: `${round}px` }}>
                <OurWorkBar work={works[workIndex]} color={works[workIndex].primaryTextColor.toRgbString()}/>
                <OurWorkEntrance work={works[workIndex]} detailIndex={detailIndex} />
                <OurWorkCallToAction works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} setLockScroll={setLockScroll} />
            </div>
        </>
    );
}

export default OurWork;