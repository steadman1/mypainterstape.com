import './App.css'
import MainEntrance from './components/MainEntrance'
import OurWork from './components/OurWork/OurWork'
import Footer from './components/Footer'
import ThreeScene from './components/ThreeScene'
import MainTopBar from './components/MainTopBar';
import MeetUs from './components/MeetUs'
import { LocomotiveScrollProvider } from './LocomotiveScrollProvider'

function App() {
  // useEffect(() => {
  //   const modelLoadedHandler = () => {
  //     console.log('Model Loaded Event');
  //   };

  //   window.addEventListener('modelLoaded', modelLoadedHandler);

  //   return () => {
  //     window.removeEventListener('modelLoaded', modelLoadedHandler);
  //     window.addEventListener('modelLoading', modelLoadedHandler);
  //   };
  // }, []);

  return (
    <>
      <LocomotiveScrollProvider>
        <MainTopBar />
        <div className="vstack" id="main-scroll-view">
          <section data-scroll-section className="zstack">
            <MainEntrance />
            <ThreeScene />
          </section>
          
          <OurWork />
          <MeetUs />
          <Footer />
        </div>
      </LocomotiveScrollProvider>
    </>
  )
}

export default App;
