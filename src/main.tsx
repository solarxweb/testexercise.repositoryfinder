import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from './slices/store.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import { I18nextProvider } from 'react-i18next'
import i18nInstance from './locale/index.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={ i18nInstance } defaultNS={'translation'}>
    <ReduxProvider store={ store }>
      <App />
    </ReduxProvider>
    </I18nextProvider>
  </StrictMode>,
)
