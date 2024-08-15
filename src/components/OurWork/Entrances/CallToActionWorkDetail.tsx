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
                    <div key={ `${work.name}-${detailIndex}`  } className="vstack work-detail no-scroll">
                        <div className="hstack">
                            <div className="zstack">
                                <img className="app-icon animated" src={"../../../../public/" + workDetail.images[0]} alt={workDetail.title} onLoad={() => handleImageLoaded(0)} style={{ opacity: imageLoaded ? 1 : 0 }} />
                                <img className="app-store-icon animated" src={"../../../../public/app-store-logo-icon.png"} alt="Apple App Store Logo" onLoad={() => handleImageLoaded(1)} style={{ opacity: imageLoaded ? 1 : 0 }} />
                            </div>
                            <div className="vstack leading">
                                <h2 className="max-detail-text scaling-text animated" style={{ margin: "0px", color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, opacity: imageLoaded ? 1 : 0 }}>
                                    {replaceSpecialCharacters(workDetail.title)}
                                </h2>
                                {
                                    workDetail.subtitle &&
                                    <h4 className="max-detail-text scaling-text animated" style={{ margin: "5px 0 0 0", color: work.primaryTextColor.toRgbString(), fontFamily: work.subtitleFont, opacity: imageLoaded ? 1 : 0 }}>
                                        {replaceSpecialCharacters(workDetail.subtitle)}
                                    </h4>
                                }
                            </div>
                        </div>
                        {
                            workDetail.description &&
                            <h3 className="max-detail-text scaling-text animated" style={{ maxWidth: "400px", marginTop: "20px", color: work.primaryTextColor.toRgbString(), fontFamily: work.bodyFont, opacity: imageLoaded ? 1 : 0 }}>
                                {replaceSpecialCharacters(workDetail.description)}
                            </h3>
                        }
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