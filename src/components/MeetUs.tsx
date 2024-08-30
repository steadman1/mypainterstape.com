import Employee from '../objects/Employee';
import { Skill, SkillType } from '../objects/Skill';
import React, { useState, useEffect, useCallback } from 'react';
import { useLocomotiveScroll } from '../LocomotiveScrollProvider';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Divider from './Divider';
import replaceSpecialCharacters from '../replaceSpecialCharacters';
import SkillList from './SkillList';

function MeetUs() {
    const { width, height } = useWindowDimensions();
    const [deltaY, setDeltaY] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollRef = useLocomotiveScroll();
    const employees = Employee.employees;

    const handleScroll = useCallback((args) => {
        const height = document.getElementById("meet-us-entrance")?.offsetTop;
        if (!height || height > args.scroll.y) {
            setDeltaY(0);
            setScrollPosition(0);
            return;
        }

        const newScrollPosition = args.scroll.y - height;
        
        setDeltaY(newScrollPosition - scrollPosition);
        setScrollPosition(newScrollPosition);
    }, [scrollPosition]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.on('scroll', handleScroll);
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.off('scroll', handleScroll);
            }
        };
    }, [scrollRef, handleScroll]);

    return (
        <>
            <section data-scroll-section id="meet-us-entrance">
                <div 
                    data-scroll
                    data-scroll-speed="1"
                    data-scroll-position="bottom" 
                    style={{ margin: "40px auto"}}
                >
                    <h1 className="meet-us title">Meet Us</h1>
                    <h4 
                        className="meet-us description" 
                        style={{ maxWidth: "500px", fontSize: "1.2rem" }}
                    >
                        The team behind Painter*s Tape that <span className='bold'>makes it all possible.</span>
                    </h4>
                </div>
                {
                    employees.map((employee, index) => (
                        <div key={index} style={{ marginBottom: `${index + 1 >= employees.length ? "30px" : 0}` }}>
                            {
                                index > 0 ? (
                                    <div 
                                        data-scroll
                                        data-scroll-speed="1"
                                        data-scroll-position="bottom"
                                        style={{ margin: "30px 10px"}}
                                    >
                                        <Divider color={"#000000"} />
                                    </div>
                                ) : null
                            }
                            <div
                                data-scroll
                                data-scroll-speed="1"
                                data-scroll-position="bottom"
                                className="meet-us-employee"
                                key={index}
                            >
                            {
                                width >= 600 ? (
                                    <div className="hstack space-between leading center">
                                        <div id={ `meet-us-details-${index}` } className="vstack leading">
                                            <h4 className="meet-us-title stroked">{employee.title}</h4>
                                            <h3 className="meet-us-name">{employee.name}</h3>
                                            <SkillList employee={employee} index={index} />
                                        </div>
                                        <div id={ `meet-us-description-${index}` } className="hstack top" style={{ maxWidth: "calc(50% - 20px)"}}>
                                            <img src="quote.svg" alt="quote" style={{ width: "45px", height: "45px", marginRight: "10px"}} />
                                            <h5 className="meet-us-description" style={{ marginTop: "5px"}}>{replaceSpecialCharacters(employee.description)}</h5>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="vstack leading">
                                        <h4 className="meet-us-title stroked">{employee.title}</h4>
                                        <h3 className="meet-us-name">{employee.name}</h3>
                                        <div className="hstack top" style={{ maxWidth: "calc(100% - 20px)", marginTop: "10px" }}>
                                            <img src="quote.svg" alt="quote" style={{ width: "30px", height: "30px", marginRight: "10px"}} />
                                            <h5 className="meet-us-description" style={{ marginTop: "5px"}}>{replaceSpecialCharacters(employee.description)}</h5>
                                        </div>
                                    </div>
                                )

                            }
                            </div>
                        </div>
                    ))
                }
            </section>
        </>
    );
}

export default MeetUs;
