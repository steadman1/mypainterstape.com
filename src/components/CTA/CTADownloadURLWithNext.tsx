import { Work } from "../../objects/Work";
import { useState } from "react";
import { Arrow, Direction } from "../Icons/Arrow";
import CheckMark from "../Icons/CheckMark";
import HoverTranslateButton from "../HoverTranslateButton";

function CTADownloadURLWithNext({ works, workIndex, setWorkIndex, detailIndex, setDetailIndex, setLockScroll }: { works: Work[], workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>>, setLockScroll: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [secondaryHover , setSecondaryHover] = useState(false);
    const [tertiaryHover , setTertiaryHover] = useState(false);

    const url = works[workIndex].details[detailIndex].URL;

    const handleForward = () => {
        if ((workIndex + 1) >= works.length) {
            setLockScroll(false);

            return;
        } else if (workIndex < works.length && (detailIndex + 1) >= works[workIndex].details.length) {
            setWorkIndex(workIndex + 1);
            setDetailIndex(0);
            
            return;
        } else {
            setDetailIndex(detailIndex + 1);
            return;
        }
    }
    const handleBackward = () => {
        setLockScroll(true);
        if (detailIndex - 1 < 0) {
            if (workIndex - 1 < 0) {
                return;
            } else {
                setWorkIndex(workIndex - 1);
                setDetailIndex(works[workIndex - 1].details.length - 1);
                return;
            }
        } else {
            setDetailIndex(detailIndex - 1);
            return;
        }
    }
    const handleClick = (forward: boolean) => {
        if (forward) {
            handleForward();
        } else {
            handleBackward();
        }
    }
    const handleURL = () => {
        if (url) {
            window.open(url, "_blank").focus();
        }
    }

    const primaryColor = works[workIndex].lightAccentColor;
    const secondaryColor = works[workIndex].darkAccentColor;

    const isFinal = (workIndex + 1) >= works.length && (detailIndex + 1) >= works[workIndex].details.length; 
    
    return (
        <div className="vstack">
            <button className="call-to-action-primary animated" onClick={() => handleURL()} style={{ backgroundColor: secondaryColor.toRgbString(), border: works[workIndex].usesStroke ? border : "none" }}>
                <div className="hstack bottom-alignment">
                    <div style={{ marginRight: "5px", marginBottom: "3px" }}><Arrow color={primaryColor.toRgbString()} direction={Direction.NORTHEAST} /></div>
                    <HoverTranslateButton text={ "Coming Soon" } onClick={() => handleClick(true)} primaryColor={primaryColor}  /> 
                </div>
            </button>
            <div className="hstack space-between" style={{ padding: "0 10px"}}>
                <button className="call-to-action-secondary" onMouseEnter={() => setSecondaryHover(true)} onMouseLeave={() => setSecondaryHover(false)} onClick={() => handleClick(false)} style={{ textDecorationColor: primaryColor.transparentize(secondaryHover ? 1 : 0).toRgbaString() }}>
                    <div className="hstack bottom-alignment">
                        <h3 className="text-width call-to-action-text" style={{ color: primaryColor.toRgbaString() }}>Back</h3>
                    </div>
                </button>
                <div className="hstack" onMouseEnter={() => setTertiaryHover(true)} onMouseLeave={() => setTertiaryHover(false)} onClick={() => handleClick(true)} style={{ cursor: "pointer" }}>
                    { isFinal ? <CheckMark color={primaryColor.toRgbString()} /> : <Arrow color={primaryColor.toRgbString()} direction={Direction.SOUTH} /> }
                    <button className="call-to-action-secondary" style={{ textDecorationColor: primaryColor.transparentize(tertiaryHover ? 1 : 0).toRgbaString() }}>
                        <div className="hstack bottom-alignment">
                            <h3 className="text-width call-to-action-text" style={{ color: primaryColor.toRgbaString() }}>{isFinal ? "Done" : "Next"}</h3>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CTADownloadURLWithNext;