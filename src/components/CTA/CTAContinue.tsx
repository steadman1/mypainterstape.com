import { Arrow, Direction } from "../Icons/Arrow";
import { Work } from "../../objects/Work";
import CheckMark from "../Icons/CheckMark";
import HoverUnderlineButton from "../HoverUnderlineButton";
import HoverTranslateButton from "../HoverTranslateButton";

function CTAContinue({ works, workIndex, setWorkIndex, detailIndex, setDetailIndex, lockScroll, setLockScroll }: { works: Work[], workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>>, lockScroll: boolean, setLockScroll: React.Dispatch<React.SetStateAction<boolean>> }) {
    const handleForward = () => {
        if (!lockScroll) {
            setLockScroll(true);
            return;
        }

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
        if (!lockScroll) {
            setLockScroll(true);
            return;
        }

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

    // const url = works[workIndex].details[detailIndex].URL;
    const primaryColor = works[workIndex].lightAccentColor;
    const secondaryColor = works[workIndex].darkAccentColor;

    const border = `2px solid ${primaryColor.toRgbString()}`;
  
    const isFinal = (workIndex + 1) >= works.length && (detailIndex + 1) >= works[workIndex].details.length; 

    return (
    <div className="vstack">
        {
            <button className="call-to-action-primary animated" onClick={() => handleClick(true)} style={{ backgroundColor: secondaryColor.toRgbString(), border: works[workIndex].usesStroke ? border : "none" }}>
                <div className="hstack bottom-alignment">
                    <div style={{ marginRight: "5px", marginBottom: "3px" }}>{ isFinal ? <CheckMark color={primaryColor.toRgbString()} /> : <Arrow color={primaryColor.toRgbString()} direction={Direction.SOUTH} /> }</div>
                    <HoverTranslateButton text={ isFinal ? "Finish" : "Continue"} onClick={() => handleClick(true)} primaryColor={primaryColor}  /> 
                </div>
            </button>
        }
        { 
            workIndex > 0 || detailIndex > 0 ? <HoverUnderlineButton text={"Back"} onClick={() => handleClick(false)} primaryColor={primaryColor} /> : null
        }
    </div>
  );
}

export default CTAContinue;