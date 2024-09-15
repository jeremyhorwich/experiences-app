import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExperienceBrowsing } from './pages/ExperienceBrowsing'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExperienceBrowsing />
  </StrictMode>,
)
