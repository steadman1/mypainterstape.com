import { Work } from "../objects/Work";

function CTADownloadURLWithNext({ works, workIndex, setWorkIndex, detailIndex, setDetailIndex, setLockScroll }: { works: Work[], workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>>, setLockScroll: React.Dispatch<React.SetStateAction<boolean>> }) {
    const url = works[workIndex].details[detailIndex].URL;
    const primaryColor = works[workIndex].lightAccentColor;
    const secondaryColor = works[workIndex].darkAccentColor;
    
    return (
        <div>
        
        </div>
    );
}

export default CTADownloadURLWithNext;