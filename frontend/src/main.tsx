import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserContextProvider } from './context/userContext';
import { ExperienceBrowsing } from './pages/ExperienceBrowsing';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
        <ExperienceBrowsing/>
    </UserContextProvider>
  </StrictMode>,
)
