import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserContextProvider } from './context/userContext';
import { ExperienceInfo } from './pages/ExperienceInfo';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
        <ExperienceInfo />
    </UserContextProvider>
  </StrictMode>,
)
