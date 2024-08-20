import './App.css'
import MainEntrance from './components/MainEntrance'
import OurWork from './components/OurWork/OurWork'
import Footer from './components/Footer'
import ThreeScene from './components/ThreeScene'
import AsteriskLoadingScreen from './components/AsteriskLoadingScreen'

import { useEffect, useState } from 'react'

function App() {
  const [userEntered, setUserEntered] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        if (loadingProgress < 100) {
          setLoadingProgress(_ => (i + 1));
        }
      }, i * 6);
    }

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
        userEntered ? (
          <div className="vstack" id="main-scroll-view">
          <div className="zstack">
            <MainEntrance />
            <ThreeScene />
          </div>
          
          <OurWork />
          <Footer />
        </div>
        ) : (<AsteriskLoadingScreen loadingProgress={loadingProgress} setUserEntered={setUserEntered}/>)
      }
    </>
  )
}

export default App
