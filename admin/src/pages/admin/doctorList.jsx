import React, { useContext, useEffect } from 'react'
import { adminContext } from '../../context/adminContext'

const DoctorList = () => {
  const {doc,getAllDoctors,atoken,changeAvailability} = useContext(adminContext);

  useEffect(()=>{
    if(atoken) {
      getAllDoctors();
    }
  },[atoken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
    <h1 className='text-lg font-medium'>All Doctors</h1>
    <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
      {doc.map((item,index) => (
        <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
          <img className='bg-indigo-50 group-hover:bg-[#5F6FFF] transition-all duration-500' src={item.image} alt={item.name} />
          <div className='p-4'>
            <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
            <p className='text-zinc-600 text-sm '>{item.speciality}</p>
            <div className='mt-2 flex items-center gap-1 text-sm'>
              <input onChange={()=>changeAvailability(item._id)} type='checkbox' checked={item.available}></input>
              <p>Available</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default DoctorList