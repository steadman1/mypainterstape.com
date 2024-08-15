import { useState } from 'react';
import { Work } from '../../../objects/Work';
import replaceSpecialCharacters from '../../../replaceSpecialCharacters';

function DescriptionWithLogoWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const [logoLoaded, setLogoLoaded] = useState(false);
    const workDetail = work.details[detailIndex];

    return (
        <div key={ `${work.name}-${detailIndex}`  } className="changing-stack work-detail no-scroll">
            <div>
                <img className="logo animated" src={"../../../../public/" + workDetail.images[0]} alt={workDetail.title} onLoad={() => setLogoLoaded(true)} style={{ opacity: logoLoaded ? 1 : 0 }} />
            </div>
            <div className="vstack leading">
                <h3 className="animated" style={{ width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, fontWeight: "medium" }}>
                    {replaceSpecialCharacters(workDetail.title)}
                </h3>
                {
                    workDetail.subtitle && 
                    <h3 className="animated" style={{ marginTop: "10px", width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.subtitleFont, fontWeight: "medium" }}>
                        {replaceSpecialCharacters(workDetail.subtitle)}
                    </h3>
                }
                {
                    workDetail.description && 
                    <h4 className="animated" style={{ margin: "0", width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.bodyFont, fontWeight: "medium" }}>
                        {replaceSpecialCharacters(workDetail.description)}
                    </h4>
                }
            </div>
        </div>
    );
}

export default DescriptionWithLogoWorkDetail;