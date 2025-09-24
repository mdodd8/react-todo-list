import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import './App.css'

createRoot(document.getElementById('root')!).render(
  // built in component with the purpose of identifying potential problems
  <StrictMode>
    <App />
  </StrictMode>,
)
