import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { warmHeroAssets } from './data/heroAssets.js'
import './index.css'

warmHeroAssets()
import './portal/portal-theme.css'
import './portal/portal-premium.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
