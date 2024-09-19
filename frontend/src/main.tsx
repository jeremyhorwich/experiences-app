import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UsersRatingPage } from './pages/UsersRatingPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsersRatingPage />
  </StrictMode>,
)
