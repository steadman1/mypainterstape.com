import { useState } from 'react';
import { Work } from '../../../objects/Work';
import replaceSpecialCharacters from '../../../replaceSpecialCharacters';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

function DescriptionWithImageWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const workDetail = work.details[detailIndex];

    // TAKEN FROM ./DescriptionWithManyImagesWorkDetail.tsx
    const { height } = useWindowDimensions();
    const imageWidth = Math.min(180, height * 0.25);

    return (
        <div key={ `${work.name}-${detailIndex}`  } className="changing-stack work-detail no-scroll">
            <div>
                <img 
                    className="image animated" 
                    src={"../../../../" + workDetail.images[0]} 
                    alt={workDetail.title} onLoad={() => setImageLoaded(true)} 
                    style={{ 
                        opacity: imageLoaded ? 1 : 0,
                        width: imageWidth,
                        marginRight: "10px"
                    }} 
                />
            </div>
            <div
                className="vstack leading"
                style={{ marginTop: "10px", overflowY: "auto" }}
            >
                <h3 className="max-detail-text scaling-text animated" style={{ color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, fontWeight: "bold", opacity: imageLoaded ? 1 : 0 }}>
                    {replaceSpecialCharacters(workDetail.title)}
                </h3>
                <h4 className="max-detail-text scaling-text animated" style={{ marginTop: "10px", color: work.primaryTextColor.toRgbString(), fontFamily: work.bodyFont, opacity: imageLoaded ? 1 : 0 }}>
                    {replaceSpecialCharacters(workDetail.description ?? "")}
                </h4>
            </div>
        </div>
    );
}

export default DescriptionWithImageWorkDetail;