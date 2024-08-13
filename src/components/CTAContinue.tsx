import Color from "../objects/Color";
import Arrow from "./Arrow";
import { Work } from "../objects/Work";

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
  
    return (
    <div>
        <button className="call-to-action-primary" onClick={handleClick} style={{ backgroundColor: secondaryColor.toString() }}>
            <div className="hstack">
                {/* <Arrow color={primaryColor.toString()} /> */}
                <h3 className="text-width call-to-action-text" style={{ color: primaryColor.toString() }}>Continue</h3>
                
            </div>
        </button>
    </div>
  );
}

export default CTAContinue;