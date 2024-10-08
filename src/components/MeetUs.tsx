import Employee from '../objects/Employee';
import useWindowDimensions from '../hooks/useWindowDimensions';
import replaceSpecialCharacters from '../replaceSpecialCharacters';
import { SkillList } from './SkillList';

function MeetUs() {
    const { width } = useWindowDimensions();
    const employees = Employee.employees;

    return (
        <>
            <section data-scroll-section id="meet-us-entrance">
                <div 
                    data-scroll
                    data-scroll-speed="3"
                    data-scroll-position="center"
                    className="meet-us-image-wrapper"
                    style={{ margin: "30px 0" }}
                >
                    <img className="meet-us-image" src="/meet_us.png" alt="Meet Us: the team behind Painter*s Tape that makes it all possible." />
                </div>
                {
                    employees.map((employee, index) => (
                        <div key={index} style={{ backgroundColor: "#fff" }}>
                            {
                                index > 0 ? (
                                    <div 
                                        data-scroll
                                        data-scroll-speed="1"
                                        data-scroll-position="center"
                                        style={{ backgroundColor: "#fff", margin: "30px 10px"}}
                                    >
                                        {/* <Divider color={"#000000"} /> */}
                                    </div>
                                ) : null
                            }
                            <div
                                data-scroll
                                data-scroll-speed="1"
                                data-scroll-position="center"
                                className="meet-us-employee"
                                key={index}
                            >
                            {
                                width >= 600 ? (
                                    <div className="hstack space-between leading top">
                                        <div id={ `meet-us-details-${index}` } className="vstack leading" style={{ overflow: "hidden" }}>
                                            <h4 className="meet-us-title stroked">{employee.title}</h4>
                                            <h3 className="meet-us-name">{employee.name}</h3>
                                            <SkillList employee={employee} index={index} sideScrolling={false} />
                                        </div>
                                        <div id={ `meet-us-description-${index}` } className="hstack top" style={{ maxWidth: "calc(50% - 20px)"}}>
                                            <img src="quote.svg" alt="quote" style={{ width: "45px", height: "45px", marginRight: "10px"}} />
                                            <h5 className="meet-us-description" style={{ marginTop: "5px"}}>{replaceSpecialCharacters(employee.description)}</h5>
                                        </div>
                                    </div>
                                ) : (
                                    <div id={ `meet-employee-${index}` } className="vstack leading">
                                        <h4 className="meet-us-title stroked">{employee.title}</h4>
                                        <h3 className="meet-us-name" style={{ maxWidth: "calc(100vw - 20px)" }}>{employee.name}</h3>
                                        <div className="hstack top" style={{ maxWidth: "calc(100vw - 20px)", marginTop: "10px" }}>
                                            <img src="quote.svg" alt="quote" style={{ width: "30px", height: "30px", marginRight: "10px"}} />
                                            <h5 className="meet-us-description" style={{ marginTop: "5px"}}>{replaceSpecialCharacters(employee.description)}</h5>
                                        </div>
                                        <SkillList employee={employee} index={index} sideScrolling={true} />
                                    </div>
                                )

                            }
                            </div>
                        </div>
                    ))
                }
                <div style={{ height: "130px", width: "100%", backgroundColor: "#fff" }}/>
            </section>
        </>
    );
}

export default MeetUs;
