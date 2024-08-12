import OurWorkBar from "./OurWorkBar";
import OurWorkEntrance from "./OurWorkEntrance";
import { useState, useEffect } from 'react';
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Work, WorkType, WorkDetail, WorkDetailType } from "../objects/Work";

function OurWork() {
    const { height } = useWindowDimensions();
    const [scrollPosition, setScrollPosition] = useState(0);
    const newScrollPosition = scrollPosition - height / 1.1;

    const handleClipPath = () => {
        const round = Math.min(24, newScrollPosition / -18);
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
                "Introducing Lotus, your new Spotify Companion.",
            )
        ]
    )

    const works = [
        ponderWork,
        lotusWork
    ]

    const [workIndex, setWorkIndex] = useState(0);

    const handleScroll = () => {
        const rect = document.getElementById("our-work")?.getBoundingClientRect();
        const position = window.scrollY;
        setScrollPosition(position);

        if (rect && rect.top <= 0) {
            const scrollTo = position + rect.top;

            if (workIndex < works.length) {
                window.scrollTo({ left: 0, top: scrollTo, behavior: "instant" });
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="vstack" id="our-work" style={{ clipPath: handleClipPath(), transform: handleScale() }}>
                <OurWorkBar />
                <OurWorkEntrance work={works[workIndex]} index={workIndex} />
            </div>
        </>
    );
}

export default OurWork;