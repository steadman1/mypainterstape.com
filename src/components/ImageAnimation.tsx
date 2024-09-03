import { useState, useEffect, useCallback, useRef } from 'react';
import { isMobile } from 'react-device-detect';

const ImageAnimation = ({ height, frames, msBetweenFrame = 15 }: { height: React.CSSProperties, frames: string[], msBetweenFrame?: number }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationInterval = useRef<number | undefined>(undefined);
  const imageRef = useRef(null);

  const scale = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const divisor = isMobile ? 350 : 300;
    const scaleFactorX = windowWidth / divisor;
    const scaleFactorY = windowHeight / divisor;

    return Math.min(Math.max(scaleFactorX, scaleFactorY, 1.2), isMobile ? 2.4 : 3);
  };

  const startAnimation = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  }, [isAnimating]);

  const stopAnimation = useCallback(() => {
    if (isAnimating) {
      clearInterval(animationInterval.current);
      setIsAnimating(false);
    }
  }, [isAnimating]);

  const resetAnimation = useCallback(() => {
    setCurrentFrame(0);
    stopAnimation();
  }, [stopAnimation]);

  useEffect(() => {
    if (isAnimating) {
      animationInterval.current = setInterval(() => {
        setCurrentFrame((prevFrame) => {
          if (prevFrame + 1 === frames.length) {
            stopAnimation();
            return prevFrame;
          }
          return prevFrame + 1;
        });
      }, msBetweenFrame);
    }

    return () => clearInterval(animationInterval.current);
  }, [isAnimating, frames.length, msBetweenFrame, stopAnimation]);

  useEffect(() => {
    if (imageRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
          }  else {
            resetAnimation();
          }
        },
        { threshold: isMobile ? 0 : 0.1 }
      );

      observerRef.current.observe(imageRef.current);
    }

    return () => {
      stopAnimation();
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentFrame, isAnimating, resetAnimation, startAnimation, stopAnimation]);

  const offset = {
    x: 4,
    y: -30,
  }

  return (
    <img
      id="tape-falling-frame"
      src={`/tape-falling-frames${ isMobile ? "-min" : "" }/${frames[currentFrame]}`}
      alt={`frame-${currentFrame}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale()})`, transformOrigin: 'bottom', ...height }}
      ref={imageRef}
    />
  );
};

export default ImageAnimation;
