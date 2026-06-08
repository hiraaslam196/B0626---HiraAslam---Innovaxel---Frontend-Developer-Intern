import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#22222c',
          color: '#f0eee8',
          border: '1px solid #2e2e3a',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          borderRadius: '10px',
        },
        success: { iconTheme: { primary: '#4ecb8d', secondary: '#22222c' } },
        error:   { iconTheme: { primary: '#e05c5c', secondary: '#22222c' } },
      }}
    />
  </StrictMode>,
)
