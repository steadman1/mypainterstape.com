import { createContext, useEffect, useRef, ReactElement } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { isMobile } from 'react-device-detect';

// Create the context
export const LocomotiveScrollContext = createContext<LocomotiveScroll | null>(null);

export const LocomotiveScrollProvider = ({ children }: { children: ReactElement[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      scrollRef.current = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        lerp: isMobile ? 0.06 : 0.1,
        multiplier: isMobile ? 0.8 : 1,
        smoothMobile: true,
        tablet: {
          breakpoint: 0,
          smooth: true,
        }
      });

      const event = new Event('locomotive-scroll-initialized');
      window.dispatchEvent(event);
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
