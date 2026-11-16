import { Work } from "../../../objects/Work";
import SlideLayout from "./SlideLayout";

function DescriptionWorkDetail({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const detail = work.details[detailIndex];
    return <SlideLayout centered title={detail.title} subtitle={detail.subtitle} description={detail.description} />;
}

export default DescriptionWorkDetail;
