import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const adminContext = createContext();

const AdminContextProvider = (props)=>{

    const [atoken,setatoken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doc,setdoc] = useState([]);
    const [appointments,setAppointments] = useState([]);
    const [dashData,setDashData] = useState(false)
    const getAllDoctors = async()=>{
        try{
            const {data} = await axios.post(backendUrl+'/api/admin/all-doctors', {}, {headers:{atoken}})
            if(data.success){
                setdoc(data.doctors);
                console.log(doc);
            } else{
                toast.error(data.message);
            }
        } catch(error){
            toast.error(error.message);
        }
    }
    const changeAvailability = async (docid)=>{
        try{
            const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docid},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors();
            } else{
                toast.error(data.message);
            }

        }
        catch(error){
            toast.error(data.message);
        }

    }
    const getAllAppointments = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{atoken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            } else{
                toast.error(data.message)
            }

            
        } catch (error) {
            toast.error(data.message);
        }
    }

    const cancelAppointment = async(appointmentId) =>{
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment' , {appointmentId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(data.message);
        }
    }

    const getDashData = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{atoken}})
            if(data.success){
                setDashData(data.dashData)
                  console.log(data.dashData);
            } else{
                toast.error(data.message)
            }
            
        } catch (error) {
             toast.error(data.message)
        }
    }
    const value = {
        atoken,setatoken,backendUrl,doc,getAllDoctors,changeAvailability,appointments,setAppointments,getAllAppointments,cancelAppointment,
        dashData,getDashData
    }

    return(
        <adminContext.Provider value = {value}>
            {props.children}
        </adminContext.Provider>
    )
}
export default AdminContextProvider