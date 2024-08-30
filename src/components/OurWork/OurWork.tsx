import OurWorkBar from "./OurWorkBar";
import OurWorkEntrance from "./OurWorkEntrance";
import OurWorkCallToAction from "./OurWorkCallToAction";
import { OurWorkNavigation, NavigationDirection } from "./OurWorkNavigation";
import { useState, useEffect, useCallback } from 'react';
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Work, WorkType, WorkDetail, WorkDetailType, CallToActionType } from "../../objects/Work";
import { Color } from "../../objects/Color";
import { isMobile } from 'react-device-detect';
import { useLocomotiveScroll } from '../../LocomotiveScrollProvider';

enum ScrollDirection {
    UP = 1,
    DOWN = -1,
    NONE = 0
}

function OurWork() {
    const scrollRef = useLocomotiveScroll();
    const { width, height } = useWindowDimensions();
    const [lockScroll, setLockScroll] = useState(true);
    const [round, setRound] = useState(30);
    const [scale, setScale] = useState(0.9);
    const [scrollPosition, setScrollPosition] = useState(0);

    const maxRound = 30;

    const scrollToPosition = (id: string) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(document.querySelector(`#${id}`));
        }
    };

    const handleRound = () => {
        const newScrollPosition = scrollPosition - height / 1.2;
        const rect = document.getElementById("our-work");

        if (!lockScroll) {
            return maxRound;
        }

        if (!rect || (newScrollPosition - rect.offsetTop) > 0) {
            return 0;
        }
        
        return Math.max(Math.min(maxRound, (newScrollPosition + height / 4) / -12), 0);
    };

    const handleScale = () => {
        const newScrollPosition = scrollPosition - height / 1.2;
        const rect = document.getElementById("our-work");

        if (!lockScroll) {
            return 0.9;
        }

        if (!rect || (newScrollPosition - rect.offsetTop) > 0) {
            return 1;
        }

        const scale = Math.max(0.7, Math.pow(newScrollPosition / rect.offsetTop, 3) / 4 + 1);
        return Math.min(1, scale);
    };

    const works = Work.works;

    const [workIndex, setWorkIndex] = useState(0);
    const [detailIndex, setDetailIndex] = useState(0);

    const getlockScroll = () => {
        return lockScroll;
    };

    const scrollSnap = () => {
        const snapThreshold = isMobile ? 0.15 : 0.2;
        
        const rect = document.getElementById("our-work")?.getBoundingClientRect();
        if (rect?.top && rect?.bottom && rect?.height && Math.abs(rect.top) < snapThreshold * height) {
            scrollToPosition("our-work");
        }
    };

    useEffect(() => {
        if (lockScroll && scrollRef && scrollRef.current) {
            scrollRef.current.scrollTo(document.querySelector("#our-work"));
        }
    }, [lockScroll]);

    useEffect(() => {
        setRound(_ => handleRound());
        setScale(_ => handleScale());
    }, [scrollPosition, lockScroll]);

    useEffect(() => {
        if (lockScroll) {
          scrollSnap();
        }
        
        let isScrolling: any = null;
        const handleScroll = (args) => {
            setScrollPosition(_ => args.scroll.y);
    
            if (lockScroll) {
                window.clearTimeout(isScrolling);
    
                isScrolling = setTimeout(() => {
                    scrollSnap();
                }, isMobile ? 132 : 66);
            }
        };
    
        const addScrollListener = () => {
            if (scrollRef && scrollRef.current) {
                scrollRef.current.on('scroll', handleScroll);
            }
        }
        window.addEventListener('locomotive-scroll-initialized', addScrollListener);

        return () => {
            window.removeEventListener('locomotive-scroll-initialized', addScrollListener);
        }
    }, [scrollRef.current, scrollRef]);

    const border = `2px solid ${works[workIndex].lightAccentColor.toRgbString()}`;

    const direction = width > 500 ? NavigationDirection.VERTICAL : NavigationDirection.HORIZONTAL

    return (
        <>
            <div data-scroll-section id="our-work" className={ `vstack expanding ${!lockScroll ? "animated" : ""}` } style={{ maxWidth: width * scale, backgroundColor: works[workIndex].backgroundColor.toRgbString(), border: works[workIndex].usesStroke ? border : "none", borderRadius: `${round}px` }}>
                <OurWorkNavigation direction={direction} works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} lockScroll={lockScroll} setLockScroll={setLockScroll} />
                <OurWorkBar work={works[workIndex]} color={works[workIndex].primaryTextColor.toRgbString()}/>
                <OurWorkEntrance work={works[workIndex]} detailIndex={detailIndex} />
                <OurWorkCallToAction works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} lockScroll={lockScroll} setLockScroll={setLockScroll} />
            </div>
        </>
    );
}

export default OurWork;
