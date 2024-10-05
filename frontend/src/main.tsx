import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ExperienceInfo } from './pages/ExperienceInfo';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExperienceInfo />
  </StrictMode>,
)
