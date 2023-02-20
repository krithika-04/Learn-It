import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import {configureStore } from '@reduxjs/toolkit'
import reducer from './store/actionReducer'
import './index.css'
export const store = configureStore({reducer:{reducer},middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  immutableCheck: false,
})})
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
