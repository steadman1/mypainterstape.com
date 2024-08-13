import { Work, WorkDetail, WorkType, WorkDetailType, IOSAPP, WEBAPP, DESIGN } from '../objects/Work';

function OurWorkEntrance({ work, detailIndex }: { work: Work, detailIndex: number }) {
    const handleNextWork = () => {
        setIndex(prevIndex => prevIndex + 1);
    };
    
    return (
        <div id="our-work-entrance">

        </div>
    );
}

export default OurWorkEntrance;