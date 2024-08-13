import Color from "../objects/Color";
import DownArrow from "./Arrow";

function CTAContinue({ works, primaryColor, secondaryColor, workIndex, setWorkIndex, detailIndex, setDetailIndex }: { works: Work[], primaryColor: Color; secondaryColor: Color; workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>> }) {
    const handleClick = () => {
        if (workIndex < works.length && detailIndex >= works[workIndex].details.length) {
            setWorkIndex(workIndex + 1);
            setDetailIndex(0);
            
            return;
        } else if (workIndex >= works.length) {
            //setLockScroll(false);
            return;
        }
    }
  
    return (
    <div>
        <button className="call-to-action-primary" onClick={handleClick} style={{ backgroundColor: secondaryColor.toString() }}>
            <div className="hstack">
                {/* <DownArrow color={primaryColor.toString()} /> */}
                <h3 className="text-width call-to-action-text" style={{ color: primaryColor.toString() }}>Continue</h3>
                
            </div>
        </button>
    </div>
  );
}

export default CTAContinue;