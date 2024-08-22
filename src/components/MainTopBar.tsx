import { Color } from "../objects/Color";
import HoverTranslateButton from "./HoverTranslateButton";
import { useEffect, useState } from 'react';

function MainTopBar() {
    const [top, setTop] = useState(0);
    const black = new Color("#000000");

    const handleClick = (e) => {
        console.log("clicked");
    };

    useEffect(() => {
        const handleScroll = () => {
            const top = document.getElementById('main-top-bar')?.clientHeight;
            if (!top) return;
            if (window.scrollY < (window.innerHeight - top)) {
                setTop(_ => 0);
            } else {
                setTop(_ =>  -top);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div id="main-top-bar" className="animated-quick" style={{ top: top }}>
            <div className="hstack space-between">
                <h1 className="top-bar-item text"><span className="asterisk">*</span></h1>
                <div className="hstack pad-between" style={{ marginBottom: "8px" }}>
                    <HoverTranslateButton 
                        text={"work"} 
                        onClick={handleClick} 
                        primaryColor={black} />
                    <HoverTranslateButton 
                        text={"us"} 
                        onClick={handleClick}
                        primaryColor={black} />
                    <HoverTranslateButton 
                        text={"contact"} 
                        onClick={handleClick} 
                        primaryColor={black} />
                </div>
            </div>
        </div>
    );
}

export default MainTopBar;