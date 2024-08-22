import './App.css'
import MainEntrance from './components/MainEntrance'
import OurWork from './components/OurWork/OurWork'
import Footer from './components/Footer'
import ThreeScene from './components/ThreeScene'
import MainTopBar from './components/MainTopBar';
import MeetUs from './components/MeetUs'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const modelLoadedHandler = () => {
      console.log('Model Loaded Event');
    };

    window.addEventListener('modelLoaded', modelLoadedHandler);

    return () => {
      window.removeEventListener('modelLoaded', modelLoadedHandler);
      window.addEventListener('modelLoading', modelLoadedHandler);
    };
  }, []);

  return (
    <>
      {
        <div className="vstack" id="main-scroll-view">
          <div className="zstack">
            <MainTopBar />
            <MainEntrance />
            <ThreeScene />
          </div>
          
          <OurWork />
          <MeetUs />
          <Footer />
        </div>
      }
    </>
  )
}

export default App
