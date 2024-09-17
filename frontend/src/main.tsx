import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CreateExperience } from './pages/CreateExperience'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CreateExperience />
  </StrictMode>,
)
