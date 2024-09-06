import { useState, useEffect, useCallback, useRef } from 'react';
import { isMobile } from 'react-device-detect';

const VideoAnimation = ({
  height,
  videoSrc,
  stillFrameSrc,
  isStatic = false, // Add the isStatic flag with default value as false
}: {
  height: React.CSSProperties;
  videoSrc: string;
  stillFrameSrc: string;
  isStatic?: boolean; // Allow the isStatic prop to be passed
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const scale = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const divisor = isMobile ? 350 : 300;
    const scaleFactorX = windowWidth / divisor;
    const scaleFactorY = windowHeight / divisor;

    return Math.min(Math.max(scaleFactorX, scaleFactorY, 1.2), isMobile ? 2.4 : 3);
  };

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false);
    setIsVideoEnded(true);
  }, []);

  const handleVideoStart = useCallback(() => {
    if (videoRef.current && !isStatic) {
      // Reset the video to the beginning and play it
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsVideoEnded(false);
    }
  }, [isStatic]);

  useEffect(() => {
    if (videoRef.current && !isStatic) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            handleVideoStart();
          }
        },
        { threshold: isMobile ? 0 : 0.1 }
      );

      observer.observe(videoRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [handleVideoStart, isStatic]);

  const offset = {
    x: 4,
    y: -30,
  };

  return (
    <div style={{ position: 'relative', ...height }}>
        <video
            className="animation"
            ref={videoRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate(calc(-50% + ${offset.x}px), ${offset.y}px) scale(${scale()})`,
                transformOrigin: 'bottom',
                ...height,
            }}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
        >
            <source 
                src={ `${videoSrc}-hevc-safari.mov` } 
                type="video/quicktime" />
            <source 
                src={ `${videoSrc}-vp9-chrome.webm` }  
                type="video/webm" />
        </video>

      {isVideoEnded && (
        <img
            className="animation"
            src={stillFrameSrc}
            alt="still-frame"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate(calc(-50% + ${offset.x}px), ${offset.y}px) scale(${scale()})`,
                transformOrigin: 'bottom',
                ...height,
            }}
        />
      )}
    </div>
  );
};

export default VideoAnimation;
