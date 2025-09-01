import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const{backendUrl,token,setToken} = useContext(AppContext)

  const navigate = useNavigate();
  const [state , Setstate] = useState('Login');

  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [name,setname] = useState('');

  const onSubmitHandeler = async(e)=>{
e.preventDefault();

try {
  if(state=='Sign Up'){
    const {data} = await axios.post(backendUrl+'/api/user/register',{name,password,email})
    if(data.success){
      localStorage.setItem('token',data.token);
      setToken(data.token);
    } else{
      toast.error(data.message)
    }
  } else{
     const {data} = await axios.post(backendUrl+'/api/user/login',{password,email})
    if(data.success){
      localStorage.setItem('token',data.token);
      setToken(data.token);
    } else{
      toast.error(data.message)
    }
  }
} catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error(error.message || "Request failed");
  }
}
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
   <form onSubmit={onSubmitHandeler} className='min-h-[80vh] flex items-center '>
   <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-xl text-zinc-600 text-sm shadow-lg'>
    <p className='text-2xl font-semibold'>{state==='Sign Up' ? "Create Account" : "Login"}</p>
    <p>Please {state==='Sign Up' ? "Sign Up" : "Log In"} to book appointment</p>
    {
      state === "Sign Up" && 
      <div className='w-full'>
      <p>
        Full Name 
      </p>
      <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e)=>setname(e.target.value)} value={name} required/>
    </div>
    }
    <div className='w-full'>
      <p>
        Email
      </p>
      <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e)=>setemail(e.target.value)} value={email} required/>
    </div>
    <div className='w-full'>
      <p >
        Password
      </p>
      <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e)=>setpassword(e.target.value)} value={password} required/>
    </div>
    <button type='submit' className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base'>{state==='Sign Up' ? "Create Account" : "Login"}</button>
  {
    state === 'Sign Up' ? 
      <p className='text-gray-500 text-sm mt-2'>Already have an account? <span onClick={()=>Setstate('Login')} className='text-blue-500 cursor-pointer'>Login</span></p> 
      : 
      <p className='text-gray-500 text-sm mt-2'>Don't have an account? <span onClick={()=>Setstate('Sign Up')} className='text-blue-500 cursor-pointer'>Sign Up</span></p>
  }
   </div>

   </form>
  )
}

export default Login