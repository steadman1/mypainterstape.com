import OurWorkBar from "./OurWorkBar";
import OurWorkEntrance from "./OurWorkEntrance";
import OurWorkCallToAction from "./OurWorkCallToAction";
import { OurWorkNavigation, NavigationDirection } from "./OurWorkNavigation";
import { useState, useEffect, useCallback } from 'react';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Work, WorkType, WorkDetail, WorkDetailType, CallToActionType } from "../../objects/Work";
import { Color } from "../../objects/Color";
import { isMobile } from 'react-device-detect';

enum ScrollDirection {
    UP = 1,
    DOWN = -1,
    NONE = 0
}

function OurWork() {
    const { width, height } = useWindowDimensions();
    const [lockScroll, setLockScroll] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(window.scrollY);
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

    const getlockScroll = () => {
        return lockScroll;
    };

    const scrollSnap = (force: boolean) => {
        const snapThreshold = isMobile ? 0.45 : 0.3;
        
        const rect = document.getElementById("our-work")?.getBoundingClientRect();
        if (getlockScroll() || force) {
            if (rect?.top && rect?.bottom && rect?.height && Math.abs(rect.top) < snapThreshold * height) {
                const topBottomPadding = Math.floor((height - rect.height) / 2);
                window.scrollTo({ top: (window.scrollY + rect.top - (isMobile ? 0 : topBottomPadding)), behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        const events = ["scroll", "touchmove", "wheel"];
        
        if (lockScroll) {
            scrollSnap(true);
        }
        
        events.forEach(eventString => {
            let isScrolling: any = null;
            window.addEventListener(eventString, function () {
                setScrollPosition(window.scrollY);

                if (getlockScroll()) {
                    window.clearTimeout(isScrolling);

                    isScrolling = setTimeout(() => {
                        scrollSnap(false);
                    }, (isMobile ? 132 : 66));
                }
            }, false);

            return () => {
                window.removeEventListener(eventString, function () {
                    setScrollPosition(window.scrollY);

                    if (getlockScroll()) {
                        window.clearTimeout(isScrolling);

                        isScrolling = setTimeout(() => {
                            scrollSnap(false);
                        }, 66);
                    }
                }, false);
            }
        });
    }, [lockScroll, height]);


    const border = `2px solid ${works[workIndex].lightAccentColor.toRgbString()}`;

    const direction = width > 500 ? NavigationDirection.VERTICAL : NavigationDirection.HORIZONTAL

    return (
        <>
            <div className={ `vstack expanding ${!lockScroll ? "animated" : ""}` } id="our-work" style={{  clipPath: `inset(0 round ${handleRound()}px)`, transform: handleScale(), backgroundColor: works[workIndex].backgroundColor.toRgbString(), border: works[workIndex].usesStroke ? border : "none", borderRadius: `${handleRound()}px` }}>
                <OurWorkNavigation direction={direction} works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} lockScroll={lockScroll} setLockScroll={setLockScroll} />
                <OurWorkBar work={works[workIndex]} color={works[workIndex].primaryTextColor.toRgbString()}/>
                <OurWorkEntrance work={works[workIndex]} detailIndex={detailIndex} />
                <OurWorkCallToAction works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} lockScroll={lockScroll} setLockScroll={setLockScroll} />

            </div>
        </>
    );
}

export default OurWork;