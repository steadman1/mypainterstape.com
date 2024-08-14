import { useState } from 'react';
import { Work } from '../../../objects/Work';
import replaceSpecialCharacters from '../../../replaceSpecialCharacters';
import { Arrow, Direction } from '../../Icons/Arrow';

function DescriptionWithManyImagesWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageScrollIndex, setImageScrollIndex] = useState(0);

    const workDetail = work.details[detailIndex];

    const imageWidth = 180;

    const handleNext = () => {
        setImageScrollIndex((prevIndex) => 
            (prevIndex + 1) % workDetail.images.length
        );
    };

    const handlePrev = () => {
        setImageScrollIndex((prevIndex) => 
            (prevIndex - 1 + workDetail.images.length) % workDetail.images.length
        );
    };

    const border = `2px solid ${work.lightAccentColor.toRgbString()}`;
    
    const buttons = (
        <div className="hstack space-between">
            <button className="call-to-action-primary animated" onClick={() => handlePrev()} style={{ backgroundColor: work.darkAccentColor.toRgbString(), border: work.usesStroke ? border : "none", padding: "10px" }}>
                <Arrow color={work.lightAccentColor.toRgbString()} direction={Direction.WEST} />
            </button>

            <div className="hstack">
            {
                workDetail.images.map((_, index) => (
                    <div key={ index } className="image-indicator animated" style={{ backgroundColor: (imageScrollIndex == index ? work.lightAccentColor.toRgbString() : work.darkAccentColor.toRgbString()) }} />
                ))
            }
            </div>

            <button className="call-to-action-primary animated" onClick={() => handleNext()} style={{ backgroundColor: work.darkAccentColor.toRgbString(), border: work.usesStroke ? border : "none", padding: "10px" }}>
                <Arrow color={work.lightAccentColor.toRgbString()} direction={Direction.EAST} />
            </button>
        </div>
    );

    return (
        <div key={ detailIndex } className="changing-stack work-detail">
            <div className="vstack" style={{ width: `${imageWidth * 2.5}px`, margin: "0 10px 10px 0" }}>
                <img
                        className="image animated"
                        src={workDetail.images[imageScrollIndex]}
                        alt={workDetail.title}
                        onLoad={() => setImageLoaded(true)}
                        style={{
                            opacity: imageLoaded ? 1 : 0,
                            width: `${imageWidth}px`,
                            borderRadius: "10px",
                        }}
                    />
                { workDetail.images.length > 1 ? buttons : null }
            </div>
            <h3 className="animated" style={{ width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, fontWeight: "medium", opacity: imageLoaded ? 1 : 0 }}>
                {replaceSpecialCharacters(workDetail.title)}
            </h3>
        </div>
    );
}

export default DescriptionWithManyImagesWorkDetail;