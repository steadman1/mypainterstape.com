import './App.css'
import MainEntrance from './components/MainEntrance'
import OurWork from './components/OurWork/OurWork'
import Footer from './components/Footer'
import ThreeScene from './components/ThreeScene'
import MainTopBar from './components/MainTopBar';
import MeetUs from './components/MeetUs'
import ImageAnimation from './components/ImageAnimation'
import { isMobile } from 'react-device-detect'
import { LocomotiveScrollProvider } from './LocomotiveScrollProvider'

function App() {
  // useEffect(() => {
  //   const modelLoadedHandler = () => {
  //     ('Model Loaded Event');
  //   };

  //   window.addEventListener('modelLoaded', modelLoadedHandler);

  //   return () => {
  //     window.removeEventListener('modelLoaded', modelLoadedHandler);
  //     window.addEventListener('modelLoading', modelLoadedHandler);
  //   };
  // }, []);

  const skip = 5;

  const getFrames = () => {
    const finalFrame = 220;
    const frames = [];
    for (let i = 1; i < (finalFrame + 1); i++) {
        if (i % skip === 0) {
            frames.push(`${"0".repeat(4 - i.toString().length)}${i}.png`);
        }
    }
    return frames;
  };

  const getHeight = () => {
    const topBarHeight = 55;
    return isMobile ? { height: `calc(100dvh - ${topBarHeight}px)` } : { height: `60dvh` };
  }

  return (
    <>
      <LocomotiveScrollProvider>
        <MainTopBar />
        <div className="vstack" style={{ overflow: "hidden" }} id="main-scroll-view">
          <section data-scroll-section className="zstack">
            <MainEntrance />
            <ThreeScene />
          </section>
          
          <OurWork />
          <MeetUs />
        </div>
        <section data-scroll-section className="zstack" style={{ overflow: "hidden", ...getHeight() }}>
          <Footer height={getHeight()} />
          <ImageAnimation height={getHeight()} frames={getFrames()} msBetweenFrame={20 * skip} isStatic={false} />
        </section>
      </LocomotiveScrollProvider>
    </>
  )
}

export default App;
