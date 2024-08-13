import { CallToActionType } from "../objects/Work";
import CTAContinue from "./CTAContinue";
import CTADownloadURLWithNext from "./CTADownloadURLWithNext";

function OurWorkCallToAction({ ctaType, url, primaryColor, secondaryColor, workIndex, setWorkIndex, detailIndex, setDetailIndex }: { ctaType: CallToActionType, url: string | undefined, primaryColor: Color, secondaryColor: Color, workIndex: number, setWorkIndex: React.Dispatch<React.SetStateAction<number>>, detailIndex: number, setDetailIndex: React.Dispatch<React.SetStateAction<number>> }) {
    let ctaComponent;
    switch (ctaType) {
        case CallToActionType.CONTINUE: {
            ctaComponent = <CTAContinue primaryColor={primaryColor} secondaryColor={secondaryColor} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex}/>
            break;
        }   
        case CallToActionType.DOWNLOAD_URL_WITH_NEXT: {
            ctaComponent = <CTADownloadURLWithNext url={url} primaryColor={primaryColor} secondaryColor={secondaryColor} workIndex={workIndex} setWorkIndex={setWorkIndex} detailIndex={detailIndex} setDetailIndex={setDetailIndex}/>
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