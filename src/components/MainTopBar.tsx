import { Color } from "../objects/Color";
import HoverTranslateButton from "./HoverTranslateButton";
import { useState } from 'react';
import { useLocomotiveScroll } from '../hooks/useLocomotiveScroll';
import { useLocomotiveScrollEvent, getLayoutTop } from '../hooks/useLocomotiveScrollEvent';

function MainTopBar() {
    const scrollRef = useLocomotiveScroll();
    const [top, setTop] = useState(0);
    const [logoHover, setLogoHover] = useState(false);
    const black = new Color("#000000");

    const scrollToPosition = (id: string) => {
        if (scrollRef && scrollRef.current) {
            const element = document.getElementById(id);
            if (element) scrollRef.current.scrollTo(element);
        }
    };

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        scrollToPosition(id);
    };

    // Slide the bar away while the Our Work card covers the top of the screen; the card has
    // its own navigation.
    useLocomotiveScrollEvent(({ scroll }) => {
        const barHeight = document.getElementById('main-top-bar')?.clientHeight ?? 0;
        const ourWork = document.getElementById('our-work');
        if (!barHeight || !ourWork) return;

        const local = scroll.y - getLayoutTop(ourWork);
        const coversTop = local > -barHeight * 1.5 && local < ourWork.offsetHeight - barHeight;
        setTop(coversTop ? -barHeight * 1.5 : 0);
    });

    return (
        <div id="main-top-bar" className="animated-quick" style={{ top: top }}>
            <div className="hstack space-between">
                <h1 className="top-bar-item text">
                    {/* Rolls on hover like the nav buttons: the asterisk drops away and a copy
                        drops in from above. */}
                    <button
                        className="top-bar-asterisk"
                        aria-label="Back to top"
                        onMouseEnter={() => setLogoHover(true)}
                        onMouseLeave={() => setLogoHover(false)}
                        onClick={() => handleClick("main-entrance")}
                    >
                        <span className="zstack top-bar-asterisk-roll" aria-hidden="true">
                            <span className="asterisk animated" style={{ transform: `translateY(${logoHover ? 0 : -100}%)` }}>*</span>
                            <span className="asterisk animated" style={{ transform: `translateY(${logoHover ? 100 : 0}%)` }}>*</span>
                        </span>
                    </button>
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
                        onClick={() => handleClick("footer")} 
                        primaryColor={black} />
                </div>
            </div>
        </div>
    );
}

export default MainTopBar;