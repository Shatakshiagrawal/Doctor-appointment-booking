import React from 'react'
import { assets } from '../assets/assets.js'
import { useState } from 'react'
import { useContext } from 'react';
import { adminContext } from '../context/adminContext.jsx';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import { doctorContext } from '../context/doctorContext.jsx';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const { setatoken, backendUrl } = useContext(adminContext);
    const { setDToken } = useContext(doctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('atoken', data.token)
                    setatoken(data.token);
                } else {
                    toast.error(data.message);
                }
            }
            else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token);
                    console.log(data.token);

                } else {
                    toast.error(data.message);
                }
            }
        }
        catch (error) {
            console.log('Login error:', error);
            if (error.response) {
                console.log('Error response data:', error.response.data);
            }
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-[#5F6FFF]'>
                        {state}</span> Login </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setemail(e.target.value)} value={email} className='border rounded border-[#DADADA] w-full p-2 mt-1' type='text' required />
                </div>
                <div className='w-full'>
                    <p>password</p>
                    <input onChange={(e) => setpassword(e.target.value)} value={password} className='border rounded border-[#DADADA] w-full p-2 mt-1' type='password' required />
                </div>
                <button className='bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base'>Login</button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span className='text-[#5F6FFF] underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                        : <p>Admin Login? <span className='text-[#5F6FFF] underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login