import { Work, WorkDetailType } from '../../objects/Work';
import DescriptionWorkDetail from './Entrances/DescriptionWorkDetail';
import DescriptionWithLogoWorkDetail from './Entrances/DescriptionWithLogoWorkDetail';
import DescriptionWithVideoWorkDetail from './Entrances/DescriptionWithVideoWorkDetail';
import DescriptionWithManyImagesWorkDetail from './Entrances/DescriptionWithManyImagesWorkDetail';
import CallToActionWorkDetail from './Entrances/CallToActionWorkDetail';

function OurWorkEntrance({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const detail = work.details[detailIndex];

    let workDetail;
    switch (detail.type) {
        case WorkDetailType.DESCRIPTION: {
            workDetail = <DescriptionWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        }
        case WorkDetailType.DESCRIPTION_WITH_LOGO: {
            workDetail = <DescriptionWithLogoWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        }
        case WorkDetailType.DESCRIPTION_WITH_VIDEO: {
            workDetail = <DescriptionWithVideoWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        }
        case WorkDetailType.DESCRIPTION_WITH_MANY_IMAGES: {
            workDetail = <DescriptionWithManyImagesWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        }
        case WorkDetailType.CALL_TO_ACTION: {
            workDetail = <CallToActionWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        }
        default: {
            workDetail = <DescriptionWorkDetail work={work} detailIndex={detailIndex} />;
            break;
        }
    }

    return (
        <div id="our-work-entrance">
            { workDetail }
        </div>
    );
}

export default OurWorkEntrance;