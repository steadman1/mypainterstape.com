import { createContext, useEffect, useRef, ReactElement, MutableRefObject } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { isMobile } from 'react-device-detect';

// Create the context
export const LocomotiveScrollContext = createContext<MutableRefObject<LocomotiveScroll | null> | null>(null);

export const LocomotiveScrollProvider = ({ children }: { children: ReactElement[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      scrollRef.current = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        // A lower lerp lets the page glide further after a wheel tick or swipe ends (more
        // momentum); the multiplier sets how far each tick or swipe carries it.
        lerp: isMobile ? 0.04 : 0.05,
        multiplier: isMobile ? 1.1 : 1.4,
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
