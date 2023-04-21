import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'leaflet/dist/leaflet.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { StoreProvider } from './contexts/storeContext'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>404 Not Found!</h1>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>

)
