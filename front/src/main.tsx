import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import User from './Pages/User';
import Task from './Pages/Task';





createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <User/>
  <Task/>
  </StrictMode>,
)
