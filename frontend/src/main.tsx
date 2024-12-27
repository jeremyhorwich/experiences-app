import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserContextProvider } from './context/userContext';
import { UsersRatingPage } from './pages/UsersRatingPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
        <UsersRatingPage />
    </UserContextProvider>
  </StrictMode>,
)
