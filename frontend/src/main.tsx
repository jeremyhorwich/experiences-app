import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserContextProvider } from './context/userContext';
import { ExperienceCreationPage } from './pages/ExperienceCreationPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
        < ExperienceCreationPage/>
    </UserContextProvider>
  </StrictMode>,
)
