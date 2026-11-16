import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { initMagnetic } from './magnetic'

initMagnetic()

createRoot(document.getElementById('root')!).render(<App />)
