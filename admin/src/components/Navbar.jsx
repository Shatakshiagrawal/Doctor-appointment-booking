import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { adminContext } from '../context/adminContext'
import { useNavigate } from 'react-router-dom';
import { doctorContext } from '../context/doctorContext';

const Navbar = () => {
const {atoken,setatoken} = useContext(adminContext);
const {dToken,setDToken} = useContext(doctorContext);

const navigate = useNavigate()

const logout = ()=>{
    navigate('/');
    atoken && setatoken('')
    atoken && localStorage.removeItem('atoken');
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    
}

  return (
    <div className='flex justify-between items-center border-b px-4 sm:px-10 py-3 bg-white'>
        <div className='flex items-center text-xs gap-2'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} />
            <p className='border px-2.5 rounded-full border-gray-500 py-0.5 text-gray-600'>{atoken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar