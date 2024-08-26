import { Employee } from '../objects/Employee';
import React, { useState, useEffect } from 'react';

function MeetUs() {
    const employees = Employee.employees;

    return (
        <>
            <section data-scroll-section id="meet-us-entrance">
            {
                employees.map((employee, index) => (
                        <div className="meet-us-employee" key={index}>
                            <h1>{employee.name}</h1>
                            <h2>{employee.title}</h2>
                            <p>{employee.description}</p>
                        </div>
                ))
            }
            </section>
        </>
    );
}

export default MeetUs;

