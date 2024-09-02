import React, { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';

const ImageAnimation = ({ height, frames, msBetweenFrame = 15 }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const observerRef = useRef(null);
  const animationInterval = useRef(null);
  const imageRef = useRef(null);

  const scale = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const divisor = isMobile ? 350 : 300;
    const scaleFactorX = windowWidth / divisor;
    const scaleFactorY = windowHeight / divisor;

    return Math.min(Math.max(scaleFactorX, scaleFactorY, 1.2), isMobile ? 2.4 : 3);
  };

  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  const stopAnimation = () => {
    if (isAnimating) {
      clearInterval(animationInterval.current);
      setIsAnimating(false);
    }
  };

  const resetAnimation = () => {
    setCurrentFrame(0);
    stopAnimation();
  };

  const restartAnimation = () => {
    setCurrentFrame(0);
    startAnimation();
  };

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
  }, [isAnimating, frames.length, msBetweenFrame]);

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
        { threshold: isMobile ? 0 : 0.1 } // Adjust threshold as needed
      );

      observerRef.current.observe(imageRef.current);
    }

    return () => {
      stopAnimation();
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentFrame, isAnimating]);

  const offset = {
    x: 4,
    y: -30,
  }

  return (
    <img
      fetchpriority="high"
      id="tape-falling-frame"
      src={`/tape-falling-frames${ isMobile ? "-min" : "" }/${frames[currentFrame]}`}
      alt={`frame-${currentFrame}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale()})`, transformOrigin: 'bottom', ...height }}
      ref={imageRef}
    />
  );
};

export default ImageAnimation;
