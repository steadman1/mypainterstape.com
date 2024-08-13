import Color from "../objects/Color";
import Arrow from "./Arrow";
import { Work } from "../objects/Work";
import CheckMark from "./Checkmark";

function CTAContinue({ works, workIndex, setWorkIndex, detailIndex, setDetailIndex, setLockScroll }: { works: Work[], workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>>, setLockScroll: React.Dispatch<React.SetStateAction<boolean>> }) {
    const handleClick = () => {
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

    const url = works[workIndex].details[detailIndex].URL;
    const primaryColor = works[workIndex].lightAccentColor;
    const secondaryColor = works[workIndex].darkAccentColor;

    const border = `2px solid ${primaryColor.toString()}`;
  
    const isFinal = (workIndex + 1) >= works.length && (detailIndex + 1) >= works[workIndex].details.length; 

    return (
    <div>
        <button className="call-to-action-primary animated" onClick={handleClick} style={{ backgroundColor: secondaryColor.toString(), border: works[workIndex].usesStroke ? border : "none" }}>
            <div className="hstack bottom-alignment">
                { isFinal ? <CheckMark color={primaryColor.toString()} /> : <Arrow color={primaryColor.toString()} /> }
                <h3 className="text-width call-to-action-text" style={{ color: primaryColor.toString() }}>{ isFinal ? "Finish" : "Continue"}</h3>
            </div>
        </button>
    </div>
  );
}

export default CTAContinue;