import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Myappointments = () => {
  const {backendUrl,token,getDoctorsData} = useContext(AppContext);

  const [appointments,setAppointments] = useState([])
  const months = ['','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_');
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
  }

  const getUserAppointments = async()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
        
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async(appointmentId) =>{
    try{
      const {data} = await axios.post(backendUrl+'/api/user/cancel-appointment', {appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }
      else{
        toast.error(data.message)
      }
      console.log(appointmentId)

    }
    catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12:true });
  useEffect(()=>{
    if(token) getUserAppointments()
  },[token])
  return (
    <div>
      <p className='text-3xl font-medium border-b pb-3 t-12 text-zinc-700'>My appointments</p>
           <div>
            {appointments.map((item,index)=>(
              <div className='grid grid-cols-[1fr_3fr] gap-4 sm:gap-6 sm:flex py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src = {item.docData.image} alt=""/>
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col justify-end gap-2'>
                {!item.cancelled && !item.isCompleted &&<button className='hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded'>Pay Online</button>}
               {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='hover:bg-red-600 hover:text-white transition-all duration-300 text-sm text-center text-stone-500 sm:min-w-48 py-2 border rounded'>Cancel Appointment</button>} 
               {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled ❌</button>}
               {
                item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
               }
              </div>
              </div>
            ))}
           </div>
    </div>
  )
}

export default Myappointments