import { CallToActionType } from "../../objects/Work";
import CTAContinue from "../CTA/CTAContinue";
import CTADownloadURLWithNext from "../CTA/CTADownloadURLWithNext";
import { Work } from "../../objects/Work";

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
        <div id="our-work-call-to-action" style={{ width: "100vw", background: `linear-gradient(to top, ${works[workIndex].backgroundColor.transparentize(1).toRgbaString()} 60%, ${works[workIndex].backgroundColor.transparentize(0).toRgbaString()} 100%)`}}>
            { ctaComponent }
        </div>
    );
}

export default OurWorkCallToAction;