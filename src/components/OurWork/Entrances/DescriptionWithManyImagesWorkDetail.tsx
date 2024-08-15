import { useEffect, useState } from 'react';
import { Work } from '../../../objects/Work';
import replaceSpecialCharacters from '../../../replaceSpecialCharacters';
import { Arrow, Direction } from '../../Icons/Arrow';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

function DescriptionWithManyImagesWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageScrollIndex, setImageScrollIndex] = useState(0);
    const [imageScrollerWidth, setImageScrollerWidth] = useState(0);
    const [workDetailClasses, setWorkDetailClasses] = useState("vstack work-detail");
    const { width, height } = useWindowDimensions();

    const workDetail = work.details[detailIndex];

    const imageWidth = Math.min(180, height * 0.25);

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

    const getImageScrollerWidth = () => {
        const imageScroller = document.getElementById("image-scroller");
        
        if (!imageScroller) return Math.max(width, workDetail.images.length * imageWidth);

        return imageScroller.offsetWidth;
    };
    
    const buttons = (
        <div className="hstack space-between" style={{ width: `${Math.min(width, 300)}px` }}>
            <button className="call-to-action-primary animated" onClick={() => handlePrev()} style={{ backgroundColor: work.darkAccentColor.toRgbString(), border: work.usesStroke ? border : "none", padding: "10px" }}>
                <Arrow color={work.lightAccentColor.toRgbString()} direction={Direction.WEST} />
            </button>

            <div className="hstack">
            {
                workDetail.images.map((_, index) => (
                    <div key={ index } className="image-indicator animated" style={{ margin: "2px", backgroundColor: (imageScrollIndex == index ? work.lightAccentColor.toRgbString() : work.darkAccentColor.toRgbString()) }} />
                ))
            }
            </div>

            <button className="call-to-action-primary animated" onClick={() => handleNext()} style={{ backgroundColor: work.darkAccentColor.toRgbString(), border: work.usesStroke ? border : "none", padding: "10px" }}>
                <Arrow color={work.lightAccentColor.toRgbString()} direction={Direction.EAST} />
            </button>
        </div>
    );

    const setup = () => {
        setImageScrollIndex(Math.floor(work.details[detailIndex].images.length / 2) - 1);
        setImageScrollerWidth(getImageScrollerWidth());
        setWorkDetailClasses(getWorkDetailClasses());
    }

    useEffect(() => {
        setup();
    }, []);

    const getWorkDetailClasses = () => {
        const workDetailElement = document.getElementById("work-detail");

        if (!workDetailElement) return workDetailClasses;
        // if (workDetailElement.classList.contains("no-scroll")) return `${workDetailClasses} no-scroll`;

        const workBarHeight = 150;
        const workCallToActionHeight = 148;

        // sum height of all workDetail element children
        let workDetailChildrenHeight = 0;
        for (let i = 0; i < workDetailElement.children.length; i++) {
            workDetailChildrenHeight += workDetailElement.children[i].clientHeight;
        }

        if (workDetailChildrenHeight < (height - workCallToActionHeight - workBarHeight)) {
            return `${workDetailClasses.replaceAll("no-scroll", "")} no-scroll`;
        }

        return workDetailClasses.replaceAll("no-scroll", "");
    }

    return (
        <div key={ `${work.name}-${detailIndex}`  } id="work-detail" className={ workDetailClasses }>
            <div className= "hstack" style={{ width: "100vw", margin: "0 0 10px 0" }}>
                <div className= "hstack" id="image-scroller">
                {
                    workDetail.images.map((image, index) => (
                        <img
                        key={ `${detailIndex}-${index}` }
                        className="image animated"
                        src={image}
                        alt={`Images showcasing the iOS app "Ponder" and ${workDetail.title}`}
                        onLoad={() => {setImageLoaded(true); setup();}}
                        style={{
                            opacity: imageLoaded ? 1 : 0,
                            width: `${imageWidth}px`,
                            transformOrigin: "70%",
                            transform: workDetail.images.length <= 1 ? "" : `
                            translateX(${(imageScrollerWidth / 2 - imageWidth / 2) - imageWidth * imageScrollIndex - (index - imageScrollIndex) * 60}px)
                            rotate(${(index - imageScrollIndex) * 4}deg)
                            scale(${1 - Math.abs(index - imageScrollIndex) * 0.05})
                            `,
                            zIndex: -Math.abs(index - imageScrollIndex),
                            borderRadius: "10px",
                        }}
                    />
                    ))
                }
                </div>
            </div>
            <div>
                { workDetail.images.length > 1 ? buttons : null }
            </div>
            <div className="vstack leading" style={{ marginTop: "10px", }}>
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

export default DescriptionWithManyImagesWorkDetail;