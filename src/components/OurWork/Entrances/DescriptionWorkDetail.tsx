import { Work } from "../../../objects/Work";
import replaceSpecialCharacters from "../../../replaceSpecialCharacters";

function DescriptionWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const workDetail = work.details[detailIndex];

    return (
        <div className="vstack work-detail no-scroll">
            <h3 className="animated" style={{ width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.titleFont, fontWeight: "medium" }}>
                {replaceSpecialCharacters(workDetail.title)}
            </h3>
            {
                workDetail.subtitle && 
                <h3 className="animated" style={{ marginTop: "10px", width: "auto", color: work.primaryTextColor.toRgbString(), fontFamily: work.subtitleFont, fontWeight: "medium" }}>
                    {replaceSpecialCharacters(workDetail.subtitle)}
                </h3>
            }
        </div>
    );
}

export default DescriptionWorkDetail;