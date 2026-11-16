import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { initCursor } from './cursor'

initCursor()

createRoot(document.getElementById('root')!).render(<App />)
