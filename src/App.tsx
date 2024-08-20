import './App.css'
import MainEntrance from './components/MainEntrance'
import OurWork from './components/OurWork/OurWork'
import Footer from './components/Footer'
import ThreeScene from './components/ThreeScene'

function App() {

  return (
    <>
      <div className="vstack" id="main-scroll-view">
        <div className="zstack">
          <MainEntrance />
          <ThreeScene />
        </div>
        
        <OurWork />
        <Footer />
      </div>
    </>
  )
}

export default App
