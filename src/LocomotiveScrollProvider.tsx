import React, { createContext, useContext, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Create the context
const LocomotiveScrollContext = createContext<any>(null);

export const useLocomotiveScroll = () => useContext(LocomotiveScrollContext);

export const LocomotiveScrollProvider: React.FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      scrollRef.current = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        lerp: 0.2,
        smoothMobile: true,
        mobile: {
          breakpoint: 0,
          smooth: true,
        },
        tablet: {
          breakpoint: 0,
          smooth: true,
        }
      });

      const event = new Event('locomotive-scroll-initialized');
      window.dispatchEvent(event);

      console.log('Locomotive Scroll initialized');
    }

    return () => {
      if (scrollRef.current) scrollRef.current.destroy();
    };
  }, []);

  return (
    <LocomotiveScrollContext.Provider value={scrollRef}>
      <div data-scroll-container ref={containerRef}>
        {children}
      </div>
    </LocomotiveScrollContext.Provider>
  );
};
