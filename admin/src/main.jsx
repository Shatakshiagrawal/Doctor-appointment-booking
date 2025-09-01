import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import DoctorContextProvider from './context/doctorContext.jsx'
import AdminContextProvider from './context/adminContext.jsx'
import AppContextProvider from './context/appContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
        <App></App>
      </AppContextProvider>
    </DoctorContextProvider>
  </AdminContextProvider>
  </BrowserRouter>
)
