import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ConvexWClerk from './components/providers/ConvexWClerk.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexWClerk>
      <App />
    </ConvexWClerk>
  </StrictMode>
);
