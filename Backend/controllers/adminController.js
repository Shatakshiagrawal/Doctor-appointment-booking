import validator from 'validator';
import bcrypt from 'bcrypt';
import {
    v2 as cloudinary
} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

//api for adding doctor
const addDoctor = async (req, res) => {

    try {
        const date = Date.now().toLocaleString();

        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address
        } = req.body;
        const imageFile = req.file;


        //check if all required fields are provided
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees) {
            return res.status(400).json({
                message: 'Please fill all the fields'
            });
        }
        //validating email format

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            });
        }

        //validating strong password
        if (password.length < 5) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long'
            });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashsedpassword = await bcrypt.hash(password, salt);

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image'
        })
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashsedpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: date
        }
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        res.json({
            success: true,
            message: 'doctor added'
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

//api for the admin login
const loginAdmin = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({
                success: true,
                token
            });
        } else {
            res.json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}
//api to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({
            success: true,
            doctors
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

//api to get all apointments list
const apppointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({
            success: true,
            appointments
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}
//api for appointment cancellation 
const appointmentCancel = async (req, res) => {
    try {
        const {
            appointmentId
        } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId)
        //verify apppointment user


        await appointmentModel.findByIdAndUpdate(appointmentId, {
            cancelled: true
        });

        //releasing doctor slot

        const {
            docId,
            slotDate,
            slotTime
        } = appointmentData
        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {
            slots_booked
        })
        res.json({
            success: true,
            message: 'Appointment cancelled'
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//api to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({
            success: true,
            dashData
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export {
    addDoctor,
    loginAdmin,
    allDoctors,
    apppointmentsAdmin,
    appointmentCancel,
    adminDashboard
};