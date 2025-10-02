import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'   // ⬅️ Importar Provider
import { store } from './app/store.js'   // ⬅️ Importar el store
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>   {/* Envolver la app */}
      <App />
    </Provider>
  </StrictMode>,
)
