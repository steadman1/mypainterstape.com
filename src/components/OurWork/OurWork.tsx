import OurWorkBar from "./OurWorkBar";
import OurWorkEntrance from "./OurWorkEntrance";
import OurWorkCallToAction from "./OurWorkCallToAction";
import { OurWorkNavigation, NavigationDirection } from "./OurWorkNavigation";
import { useState, useEffect } from 'react';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Work, WorkType, WorkDetail, WorkDetailType, CallToActionType } from "../../objects/Work";
import { Color } from "../../objects/Color";

function OurWork() {
    const { width, height } = useWindowDimensions();
    const [lockScroll, setLockScroll] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const newScrollPosition = scrollPosition - height / 1.4;

    const maxRound = 30;

    const handleRound = () => {
        const rect = document.getElementById("our-work")?.getBoundingClientRect();

        if (!lockScroll) {
            return maxRound;
        }

        if (!rect || (newScrollPosition - rect.top) > 0) {
            return 0;
        }
        
        return Math.min(maxRound, (newScrollPosition + height / 8) / -12);
    };

    const handleScale = () => {
        const rect = document.getElementById("our-work")?.getBoundingClientRect();

        if (!lockScroll) {
            return "scale(0.9)";
        }

        if (!rect || (newScrollPosition - rect.top) > 0) {
            return "scale(1)";
        }

        const scale = Math.max(0.7, Math.pow(newScrollPosition / rect.top, 3) / 4 + 1);
        return `scale(${Math.min(1, scale)})`;
    };

    const works = Work.works;

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
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lockScroll]);

    useEffect(() => {
        const rect = document.getElementById("our-work")?.getBoundingClientRect();
        const position = window.scrollY;

        if (rect && rect.top <= 0) {
            const scrollTo = position + rect.top;

            if ((workIndex + 1) >= works.length || (detailIndex + 1) >= works[workIndex].details.length) {
                console.log("scrolling to", scrollTo);
                window.scrollTo({ left: 0, top: scrollTo, behavior: "smooth" });
            }
        }
    }, [workIndex, detailIndex]);

    const border = `2px solid ${works[workIndex].lightAccentColor.toRgbString()}`;

    const direction = width > 500 ? NavigationDirection.VERTICAL : NavigationDirection.HORIZONTAL

    return (
        <>
            <div className={ `vstack expanding ${!lockScroll ? "animated" : ""}` } id="our-work" style={{ clipPath: `inset(0 round ${handleRound()}px)`, transform: handleScale(), backgroundColor: works[workIndex].backgroundColor.toRgbString(), border: works[workIndex].usesStroke ? border : "none", borderRadius: `${handleRound()}px` }}>
                <OurWorkNavigation direction={direction} works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} lockScroll={lockScroll} setLockScroll={setLockScroll} />
                <OurWorkBar work={works[workIndex]} color={works[workIndex].primaryTextColor.toRgbString()}/>
                <OurWorkEntrance work={works[workIndex]} detailIndex={detailIndex} />
                <OurWorkCallToAction works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} lockScroll={lockScroll} setLockScroll={setLockScroll} />

            </div>
        </>
    );
}

export default OurWork;