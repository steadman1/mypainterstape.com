import React, { useState, useEffect, useRef } from 'react';
import { SkillModal } from './SkillList';
import "../css/InfiniteScrollList.css";

const InfiniteScroller = ({ skills }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollerRef = useRef(null);

    const SCROLL_SPEED = 1; // Adjust the scroll speed here

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            setScrollPosition((prevPosition) => prevPosition + SCROLL_SPEED);
        }, 16); // Approximately 60fps

        return () => clearInterval(scrollInterval);
    }, []);

    useEffect(() => {
        const scrollerWidth = scrollerRef.current.scrollWidth;
        const containerWidth = scrollerRef.current.offsetWidth;

        // Reset scroll position when it reaches the end
        if (scrollPosition >= scrollerWidth) {
            setScrollPosition(-containerWidth);
        }
    }, [scrollPosition]);

    return (
        <div className="scroller-container">
            <div
                className="scroller-content"
                ref={scrollerRef}
                style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
                {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                        <img src={`skills/${skill.image}`} alt={skill.name} />
                        <p>{skill.name}</p>
                    </div>
                ))}
                {/* Duplicate the list to create an infinite scroll illusion */}
                {skills.map((skill, index) => (
                    <div key={`duplicate-${index}`} className="skill-item">
                        <img src={`skills/${skill.image}`} alt={skill.name} />
                        <p>{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteScroller;