import React, { useContext } from 'react'
import Login from './pages/Login'
  import { ToastContainer, toast } from 'react-toastify';
import { adminContext } from './context/adminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/dashboard';
import AllAppointments from './pages/admin/allAppointments';
import AddDoctor from './pages/admin/addDoctor';
import DoctorList from './pages/admin/doctorList';
import { doctorContext } from './context/doctorContext';
import DoctorDashboard from './pages/doctor/doctorDashboard';
import DoctorAppointments from './pages/doctor/doctorAppointments';
import DoctorProfile from './pages/doctor/doctorProfile';

const App = () => {
const {atoken} = useContext(adminContext);
const {dToken} = useContext(doctorContext)

  return atoken || dToken? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <SideBar />
        <Routes>
        {/* Admin routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorList />} />

          {/*Doctor routes */}
          
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          
        </Routes>
        
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App