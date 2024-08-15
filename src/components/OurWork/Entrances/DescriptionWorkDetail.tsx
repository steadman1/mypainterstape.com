import { Work } from "../../../objects/Work";
import replaceSpecialCharacters from "../../../replaceSpecialCharacters";

function DescriptionWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const workDetail = work.details[detailIndex];

    return (
        <div key={ `${work.name}-${detailIndex}`  } className="vstack work-detail no-scroll">
            <h3 className="center-text animated" style={{ width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, fontWeight: "medium" }}>
                {replaceSpecialCharacters(workDetail.title)}
            </h3>
            {
                workDetail.subtitle && 
                <h3 className="center-text animated" style={{ marginTop: "10px", width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.subtitleFont, fontWeight: "medium" }}>
                    {replaceSpecialCharacters(workDetail.subtitle)}
                </h3>
            }
            {
                workDetail.description && 
                <h4 className="center-text animated" style={{ margin: "0", width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.bodyFont, fontWeight: "medium" }}>
                    {replaceSpecialCharacters(workDetail.description)}
                </h4>
            }
        </div>
    );
}

export default DescriptionWorkDetail;