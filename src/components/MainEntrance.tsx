import useWindowDimensions from '../hooks/useWindowDimensions';
import Title from './MainEntranceTitle';
import { useState, useEffect } from 'react';


function MainEntrance() {
    const [smallTitleWidth, setSmallTitleWidth] = useState(270.74);
    const [bigTitleWidth, setBigTitleWidth] = useState(0);
    const { width } = useWindowDimensions();
    
    useEffect(() => {
        const title = document.querySelector("#painters-tape-big-title");
        if (title) {
            setBigTitleWidth(title.clientWidth);
        }

        const smallTitle = document.querySelector("#painters-tape-small-title");
        if (smallTitle) {
            setSmallTitleWidth(smallTitle.clientWidth);
        }
    }, [width]);

    const style = { justifyContent: "flex-start", alignItems: "flex-end" }

    return (
        <>
            <div className="expanding entrance-screen" id="main-entrance" style={ width < bigTitleWidth ? {} : style }>
                {
                    width < bigTitleWidth ? (
                        <>
                            <div className="vstack">
                                <Title />
                                <h3 className="subtitle stroked">software & design studio</h3>
                                <h4 className="description" style={{maxWidth: `${smallTitleWidth}px`}}>
                                    We’re a studio with a strong focus on 
                                    <span className="bold">careful attention to detail.</span> 
                                    With an aim to define the edges, we ensure  
                                    <span className="bold">each project is as polished and purposeful as it is beautiful.</span>
                                </h4>
                            </div>
                        </>
                    ) : (
                        <div className="vstack" style={{ padding: "20px", zIndex: 3 }}>
                            <div className="zstack" style={{ position: "relative", maxWidth: "fit-content", maxHeight: "fit-content" }}>
                                <h1 className="title" id="painters-tape-big-title">painter<span className="asterisk">*</span>s<br />tape</h1>
                                <h3 className="subtitle stroked" style={{ position: "absolute", bottom: 0, right: 0, margin: 0 }}>a software &<br />design studio</h3>
                            </div>
                            {
                                width ? (
                                    <h4 className="description" style={{maxWidth: `${bigTitleWidth}px`}}>
                                        We’re a studio that believes every great design starts with a 
                                        <span className="bold">careful attention to detail.</span> With our work, we aim to define 
                                        the edges that bring clarity and focus to our work, ensuring that 
                                        <span className="bold">every project is as polished and purposeful as it is beautiful.</span>
                                    </h4>
                                ) : null
                            }
                        </div>
                    )
                }
            </div>
        </>
        
    );
}

export default MainEntrance;