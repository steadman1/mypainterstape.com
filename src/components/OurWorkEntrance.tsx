import { Work } from '../objects/Work';

function OurWorkEntrance({ work, index, setIndex }: { work: Work, index: number, setIndex: React.Dispatch<React.SetStateAction<number>> }) {
    const handleNextWork = () => {
        setIndex(prevIndex => prevIndex + 1);
    };
    
    return (
        <div id="our-work-entrance">
            <h1>Our Work</h1>
            <p>Check out some of our recent projects</p>
        </div>
    );
}

export default OurWorkEntrance;