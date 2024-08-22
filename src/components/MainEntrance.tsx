import useWindowDimensions from '../hooks/useWindowDimensions';
import Title from './MainEntranceTitle';
import { useState, useEffect } from 'react';


function MainEntrance() {
    const [smallTitleWidth, setSmallTitleWidth] = useState(270.74);
    const [bigTitleWidth, setBigTitleWidth] = useState(546);
    const { width } = useWindowDimensions();

    const handleSize = () => {
        const title = document.querySelector("#painters-tape-big-title");
        if (title) {
            setBigTitleWidth(title.clientWidth);
        }

        const smallTitle = document.querySelector("#painters-tape-small-title");
        if (smallTitle) {
            setSmallTitleWidth(smallTitle.clientWidth);
        }
    }

    useEffect(() => {
        
        window.addEventListener("resize", handleSize);

        return () => window.removeEventListener("resize", handleSize);
 
    }, []);

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
                                <h5 className="description" style={{
                                    width: "fit-content",
                                    textAlign: "center",
                                    position: "absolute",
                                    bottom: 0,
                                    marginBottom: "20px",
                                }}>
                                    <span className='bold'>© Painter*s Tape Studios && Spencer Steadman.
                                    <br />Made with Love. (2024)</span>
                                </h5>
                            </div>
                        </>
                    ) : (
                        <div className="vstack" style={{ padding: "20px", zIndex: 3, alignItems: "flex-start" }}>
                            <div className="zstack" style={{ position: "relative", maxWidth: "fit-content", maxHeight: "fit-content" }}>
                                <h1 className="title" id="painters-tape-big-title">painter<span className="asterisk">*</span>s<br />tape</h1>
                                <h3 className="subtitle stroked" style={{ position: "absolute", bottom: 0, right: 0, margin: 0, fontSize: "2rem" }}>a software &<br />design studio</h3>
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
                            {
                                width > (bigTitleWidth + 40 + 46) ? null : (
                                    <h5 className="description" style={{
                                        width: "fit-content",
                                    }}>
                                        <span className='bold'>Made with Love. (2024)<br />© Painter*s Tape Studios && Spencer Steadman.</span>
                                    </h5>
                                )
                            }
                        </div>
                    )
                }
                
                {
                    width > (bigTitleWidth + 40 + 46) ? (
                        <h5 className="description" style={{ 
                            width: "fit-content", 
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            marginBottom: "20px",
                        }}>
                            <span className="bold">Made with Love. (2024)<br />© Painter*s Tape Studios && Spencer Steadman.</span>
                        </h5>
                    ) : null
                }
            </div>
        </>
        
    );
}

export default MainEntrance;