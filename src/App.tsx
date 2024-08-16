import './App.css'
import MainEntrance from './components/MainEntrance'
import OurWork from './components/OurWork/OurWork'

function App() {

  return (
    <>
      <div className="vstack" id="main-scroll-view">
        <MainEntrance />
        <OurWork />
        <div style={{ height: "30vh" }}>
          <h1>Footer</h1>
        </div>
      </div>
    </>
  )
}

export default App
