import Color from "../../objects/Color";
import { Arrow, Direction } from "../Icons/Arrow";
import { Work } from "../../objects/Work";
import CheckMark from "../Icons/CheckMark";
import { useState } from "react";

function CTAContinue({ works, workIndex, setWorkIndex, detailIndex, setDetailIndex, setLockScroll }: { works: Work[], workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>>, setLockScroll: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [secondaryHover , setSecondaryHover] = useState(false);

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

    const url = works[workIndex].details[detailIndex].URL;
    const primaryColor = works[workIndex].lightAccentColor;
    const secondaryColor = works[workIndex].darkAccentColor;

    const border = `2px solid ${primaryColor.toRgbString()}`;
  
    const isFinal = (workIndex + 1) >= works.length && (detailIndex + 1) >= works[workIndex].details.length; 

    return (
    <div className="vstack">
        <button className="call-to-action-primary animated" onClick={() => handleClick(true)} style={{ backgroundColor: secondaryColor.toRgbString(), border: works[workIndex].usesStroke ? border : "none" }}>
            <div className="hstack bottom-alignment">
                <div style={{ marginRight: "5px", marginBottom: "3px" }}>{ isFinal ? <CheckMark color={primaryColor.toRgbString()} /> : <Arrow color={primaryColor.toRgbString()} direction={Direction.SOUTH} /> }</div>
                <h3 className="text-width call-to-action-text" style={{ color: primaryColor.toRgbString() }}>{ isFinal ? "Finish" : "Continue"}</h3>
            </div>
        </button>
        <button className="call-to-action-secondary" onMouseEnter={() => setSecondaryHover(true)} onMouseLeave={() => setSecondaryHover(false)} onClick={() => handleClick(false)} style={{ textDecorationColor: primaryColor.transparentize(secondaryHover ? 1 : 0).toRgbaString() }}>
            <div className="hstack bottom-alignment">
                <h3 className="text-width call-to-action-text" style={{ color: primaryColor.toRgbaString() }}>Back</h3>
            </div>
        </button>
    </div>
  );
}

export default CTAContinue;