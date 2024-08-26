import { Color } from "../objects/Color";
import HoverTranslateButton from "./HoverTranslateButton";
import { useEffect, useState } from 'react';
import { useLocomotiveScroll } from '../LocomotiveScrollProvider';

function MainTopBar() {
    const scrollRef = useLocomotiveScroll();
    const [top, setTop] = useState(0);
    const black = new Color("#000000");

    const scrollToPosition = (id: string) => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollTo(document.querySelector(`#${id}`));
        }
    };

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        scrollToPosition(id);
    };

    useEffect(() => {
        const handleScroll = (args) => {
            const top = document.getElementById('main-top-bar')?.clientHeight;
            if (!top) return;
            if (args.scroll.y < (window.innerHeight - top) || args.scroll.y > (window.innerHeight + top * 2)) {
                setTop(_ => 0);
            } else {
                setTop(_ =>  -top);
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

    return (
        <div id="main-top-bar" className="animated-quick" style={{ top: top }}>
            <div className="hstack space-between">
                <h1 className="top-bar-item text" 
                    onClick={() => handleClick("main-entrance")}>
                    <span className="asterisk">*</span>
                </h1>
                <div className="hstack pad-between" style={{ marginBottom: "8px" }}>
                    <HoverTranslateButton 
                        text={"work"} 
                        onClick={() => handleClick("our-work")} 
                        primaryColor={black} />
                    <HoverTranslateButton 
                        text={"us"} 
                        onClick={() => handleClick("meet-us-entrance")}
                        primaryColor={black} />
                    <HoverTranslateButton 
                        text={"contact"} 
                        onClick={() => handleClick("")} 
                        primaryColor={black} />
                </div>
            </div>
        </div>
    );
}

export default MainTopBar;