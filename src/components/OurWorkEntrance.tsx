import { Work, WorkDetail, WorkType, WorkDetailType, IOSAPP, WEBAPP, DESIGN } from '../objects/Work';

function OurWorkEntrance({ work, index, setIndex }: { work: Work, index: number, setIndex: React.Dispatch<React.SetStateAction<number>> }) {
    const handleNextWork = () => {
        setIndex(prevIndex => prevIndex + 1);
    };
    
    return (
        <div id="our-work-entrance">

        </div>
    );
}

export default OurWorkEntrance;