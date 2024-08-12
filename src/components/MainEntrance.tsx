import useWindowDimensions from '../hooks/useWindowDimensions';
import Title from './MainEntranceTitle';
import SmallTitle from './MainEntranceSmallTitle';


function MainEntrance() {
    const { width } = useWindowDimensions();

    let title;
    if (width < 450) {
        title = <Title />;
    } else {
        title = <SmallTitle />;
    }
    
    return (
        <>
            <div className="entrance-screen">
                <div className="vstack">
                    { title }
                    <h3 className="subtitle stroked">software & design studio</h3>
                </div>
            </div>
        </>
        
    );
}

export default MainEntrance;