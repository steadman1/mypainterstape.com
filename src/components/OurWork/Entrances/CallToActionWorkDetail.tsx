import { Work, WorkType } from "../../../objects/Work";
import { useState } from "react";
import replaceSpecialCharacters from "../../../replaceSpecialCharacters";

function CallToActionWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const [imageLoaded, setImageLoaded] = useState([false, false]);

    const workDetail = work.details[detailIndex];

    const handleImageLoaded = (index) => {
        const imageLoadedCopy = [...imageLoaded];
        imageLoadedCopy[index] = true;
        setImageLoaded(imageLoadedCopy);
    }
    
    switch (work.workType) {
        case WorkType.IOSAPP: {
            return (
                <>
                    <div className="vstack work-detail no-scroll">
                        <div className="hstack">
                            <div className="zstack">
                                <img className="app-icon animated" src={"../../../../public/" + workDetail.images[0]} alt={workDetail.title} onLoad={() => handleImageLoaded(0)} style={{ opacity: imageLoaded ? 1 : 0 }} />
                                <img className="app-store-icon animated" src={"../../../../public/app-store-logo-icon.png"} alt="Apple App Store Logo" onLoad={() => handleImageLoaded(1)} style={{ opacity: imageLoaded ? 1 : 0 }} />
                            </div>
                            <h2 className="max-detail-text scaling-text animated" style={{ color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, opacity: imageLoaded ? 1 : 0 }}>
                                {replaceSpecialCharacters(workDetail.title ?? "")}
                            </h2>
                        </div>
                        <h3 className="max-detail-text scaling-text animated" style={{ marginTop: "10px", color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, opacity: imageLoaded ? 1 : 0 }}>
                            {replaceSpecialCharacters(workDetail.description ?? "")}
                        </h3>
                    </div>
                </>
            );
            break;
        }
        case WorkType.WEBAPP: {
            return (
                <>
                </>
            );
            break;
        }
        case WorkType.DESIGN: {
            return (
                <>
                </>
            );
            break;
        }
    }

    
}

export default CallToActionWorkDetail;