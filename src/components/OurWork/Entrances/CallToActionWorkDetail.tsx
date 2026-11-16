import { useState } from "react";
import { Work, WorkType } from "../../../objects/Work";
import SlideLayout from "./SlideLayout";

// Closing slide for a work: its icon (with an App Store badge for iOS apps), name, tagline and
// where to get it. The link itself is the main button in the footer.
function CallToActionWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const [loaded, setLoaded] = useState(false);
    const detail = work.details[detailIndex];

    const icon = (
        <span className={`ow-app-icon ${loaded ? "is-loaded" : ""}`}>
            <img src={`/${detail.images[0]}`} alt={`${work.name} icon`} onLoad={() => setLoaded(true)} draggable={false} />
            {
                work.workType === WorkType.IOSAPP
                    ? <img className="ow-app-store-badge" src="/app-store-logo-icon.png" alt="Apple App Store" draggable={false} />
                    : null
            }
        </span>
    );

    return <SlideLayout centered media={icon} title={detail.title} subtitle={detail.subtitle} description={detail.description} />;
}

export default CallToActionWorkDetail;
