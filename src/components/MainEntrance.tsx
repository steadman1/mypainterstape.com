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
            <div className="expanding entrance-screen">
                <div className="vstack">
                    { title }
                    <h3 className="subtitle stroked">software & design studio</h3>
                </div>
                <div style={{ position: "absolute", bottom: "10px"}}>
                <h5 style={{ "fontFamily": "times-new-roman-condensed" }} >hint: click the roll of painter's tape 👀</h5>
            </div>
            </div>
        </>
        
    );
}

export default MainEntrance;