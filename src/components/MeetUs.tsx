import { Employee } from '../objects/Employee';
import React, { useState, useEffect } from 'react';

function MeetUs() {
    const [lockScroll, setLockScroll] = useState(false);
    const employees = Employee.employees;

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const entrance = document.getElementById("meet-us-entrance");
            if (!entrance) return;
            
            if (entrance.getBoundingClientRect().top <= 0) {
                console.log(e);
                e.preventDefault();
                e.stopPropagation();

                if (!lockScroll) {
                    window.scrollTo({ top: entrance.offsetTop, behavior: "smooth" });

                    setLockScroll(_ => true);
                }
            }
        }

        window.addEventListener("wheel", handleScroll, { passive: false });
        window.addEventListener("touchmove", handleScroll, { passive: false });

        return () => {
            window.addEventListener("wheel", handleScroll, { passive: false });
            window.addEventListener("touchmove", handleScroll, { passive: false });
        }
    }, []);

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

