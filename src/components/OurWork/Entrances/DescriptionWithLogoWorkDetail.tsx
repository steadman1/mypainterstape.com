import { useState } from 'react';
import { Work } from '../../../objects/Work';
import replaceSpecialCharacters from '../../../replaceSpecialCharacters';

function DescriptionWithLogoWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const [logoLoaded, setLogoLoaded] = useState(false);
    const workDetail = work.details[detailIndex];

    return (
        <div className="changing-stack work-detail no-scroll">
            <div>
                <img className="logo animated" src={"../../../../public/" + workDetail.images[0]} alt={workDetail.title} onLoad={() => setLogoLoaded(true)} style={{ opacity: logoLoaded ? 1 : 0 }} />
            </div>
            <h3 className="animated" style={{ width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, fontWeight: "medium", opacity: logoLoaded ? 1 : 0 }}>
                {replaceSpecialCharacters(workDetail.title)}
            </h3>
        </div>
    );
}

export default DescriptionWithLogoWorkDetail;