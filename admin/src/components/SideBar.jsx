import React, { useContext } from 'react'
import { adminContext } from '../context/adminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { doctorContext } from '../context/doctorContext'

const SideBar = () => {
  const {atoken} = useContext(adminContext)
  const {dToken} = useContext(doctorContext)
  return (
    <div className='min-h-screen bg-white border-r'>
    {
      atoken && 
    <ul className='text-[#515151] mt-5'>
    <NavLink className={({isActive})=>`flex tems-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]':''}`} to={'/admin-dashboard'}>
      <img src={assets.home_icon} />
      <p className='hidden md:block'>Dashboard</p>
    </NavLink>
    <NavLink className={({isActive})=>`flex tems-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]':''}`}  to={'/all-appointments'}>
      <img src={assets.appointment_icon} />
      <p className='hidden md:block'>Appointments</p>
    </NavLink>
    <NavLink className={({isActive})=>`flex tems-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]':''}`}  to={'/add-doctor'}>
      <img src={assets.add_icon} />
      <p className='hidden md:block'>Add Doctor</p>
    </NavLink>
    <NavLink className={({isActive})=>`flex tems-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]':''}`} to={'doctor-list'}>
      <img src={assets.people_icon} />
      <p className='hidden md:block'>Doctors List</p>
    </NavLink>
    </ul>}
    {
      dToken && 
    <ul className='text-[#515151] mt-5'>
    <NavLink className={({isActive})=>`flex tems-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]':''}`} to={'/doctor-dashboard'}>
      <img src={assets.home_icon} />
      <p className='hidden md:block'>Dashboard</p>
    </NavLink>
    <NavLink className={({isActive})=>`flex tems-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]':''}`}  to={'/doctor-appointments'}>
      <img src={assets.appointment_icon} />
      <p className='hidden md:block'>Appointments</p>
    </NavLink>
   
    <NavLink className={({isActive})=>`flex tems-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'border-r-4 bg-[#F2F3FF] border-[#5F6FFF]':''}`} to={'doctor-profile'}>
      <img src={assets.people_icon} />
      <p className='hidden md:block'>Profile</p>
    </NavLink>
    </ul>}</div>
  )
}

export default SideBar