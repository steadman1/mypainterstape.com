import { Employee } from '../objects/Employee';
import React, { useState, useEffect } from 'react';

function MeetUs() {
    const [lockScroll, setLockScroll] = useState(false);
    const employees = Employee.employees;

    useEffect(() => {
        const handleScroll = () => {

            const entrance = document.getElementById("meet-us-entrance");
            if (!entrance) return;

            if (entrance.getBoundingClientRect().top <= 0) {
                window.scrollTo({ top: entrance.offsetTop, behavior: "smooth" });
                setLockScroll(_ => true);
            } else {
                setLockScroll(_ => false);
            }
        }
        
        const handleWheelTouchMove = (e: Event) => {
            const entrance = document.getElementById("meet-us-entrance");
            if (!entrance) return;
            
            if (entrance.getBoundingClientRect().top <= 0 || lockScroll) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            
                if (!lockScroll) {
                    window.scrollTo({ top: entrance.offsetTop, behavior: "smooth" });
                    setLockScroll(_ => true);
                }
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: false });
        window.addEventListener("wheel", handleWheelTouchMove, { passive: false });
        window.addEventListener("touchmove", handleWheelTouchMove, { passive: false });

        return () => {
            window.removeEventListener("scroll", handleScroll, { passive: false });
            window.removeEventListener("wheel", handleWheelTouchMove, { passive: false });
            window.removeEventListener("touchmove", handleWheelTouchMove, { passive: false });
        }
    }, [lockScroll]);

    return (
        <>
            <div id="meet-us-entrance">
            {
                employees.map((employee, index) => (
                        <div className="meet-us-employee" key={index}>
                            <h1>{employee.name}</h1>
                            <h2>{employee.title}</h2>
                            <p>{employee.description}</p>
                        </div>
                ))
            }
            </div>
        </>
    );
}

export default MeetUs;

