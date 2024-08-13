import { CallToActionType } from "../objects/Work";
import CTAContinue from "./CTAContinue";
import CTADownloadURLWithNext from "./CTADownloadURLWithNext";
import { Work } from "../objects/Work";

function OurWorkCallToAction({ works, workIndex, setWorkIndex, detailIndex, setDetailIndex, setLockScroll }: { works: Work[], workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>>, setLockScroll: React.Dispatch<React.SetStateAction<boolean>> }) {
    let ctaComponent;

    const ctaType = works[workIndex].details[detailIndex].ctaType;

    switch (ctaType) {
        case CallToActionType.CONTINUE: {
            ctaComponent = <CTAContinue works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} setLockScroll={setLockScroll}/>
            break;
        }   
        case CallToActionType.DOWNLOAD_URL_WITH_NEXT: {
            ctaComponent = <CTADownloadURLWithNext works={works} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex} setLockScroll={setLockScroll}/>
            break;
        }
    }
  
    return (
        <div id="our-work-call-to-action">
            { ctaComponent }
        </div>
    );
}

export default OurWorkCallToAction;