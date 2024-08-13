import OurWorkBar from "./OurWorkBar";
import OurWorkEntrance from "./OurWorkEntrance";
import OurWorkCallToAction from "./OurWorkCallToAction";
import { useState, useEffect } from 'react';
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Work, WorkType, WorkDetail, WorkDetailType, CallToActionType } from "../objects/Work";

function OurWork() {
    const { height } = useWindowDimensions();
    const [lockScroll, setLockScroll] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const newScrollPosition = scrollPosition - height / 1.5;

    const handleClipPath = () => {
        const round = Math.min(30, (newScrollPosition + height / 8) / -12);
        return `inset(0 round ${round}px)`
    };

    const handleScale = () => {
        const rect = document.getElementById("our-work")?.getBoundingClientRect();

        if (!rect || (newScrollPosition - rect.top) > 0) {
            return "scale(1)";
        }

        const scale = Math.max(0.8, Math.pow(newScrollPosition / rect.top, 3) / 4 + 1);
        return `scale(${Math.min(1, scale)})`;
    };

    const ponderWork = new Work(
        "Ponder",
        WorkType.IOSAPP,
        
        // Ground Colors
        "#69709D",
        "#434660",
        "#22223B",

        // Accent Colors
        "#B47DF2",
        "#504177",

        // Text Colors
        "#FFFFFF",
        "#A9A9A9",

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
        "#FFFFFF",
        "#000000",
        "#FFFFFF",

        // Accent Colors
        "#FF0000",
        "#0000FF",

        // Text Colors
        "#000000",
        "#FFFFFF",

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
        if (lockScroll) {
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }        
    }, [lockScroll]);

    return (
        <>
            <div className="vstack expanding" id="our-work" style={{ clipPath: handleClipPath(), transform: handleScale(), backgroundColor: works[workIndex].backgroundColor }}>
                <OurWorkBar work={works[workIndex]} color={works[workIndex].primaryTextColor.toString()}/>
                <OurWorkEntrance work={works[workIndex]} detailIndex={detailIndex} />
                <OurWorkCallToAction works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} setLockScroll={setLockScroll} />
            </div>
        </>
    );
}

export default OurWork;