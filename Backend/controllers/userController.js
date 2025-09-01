// IMPORTANT: Ensure your main server file (e.g., server.js) includes:
// import express from 'express';
// const app = express();
// app.use(express.json());
// This is required for req.body to be defined for JSON requests.

import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {
    v2 as cloudinary
} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'



//api to register user 
const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: 'missing details'
            })
        }
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Enter a valid Email'
            })
        }
        if (password.length < 6)
            return res.json({
                success: false,
                message: 'Use a strong password'
            })

        //hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        try {
            const user = await newUser.save();
            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET)
            return res.json({
                success: true,
                token
            })
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            }
            throw err;
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        if (!email || !password) {
            return res.json({
                success: false,
                message: 'missing details'
            })
        }
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: 'Enter a valid Email'
            })
        }
        const user = await userModel.findOne({
            email
        });

        if (!user) {
            return res.json({
                success: false,
                message: 'User does not exist'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET);
            res.json({
                success: true,
                token
            })
        } else {
            return res.json({
                success: false,
                message: 'Enter correct password'
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//api to get user profile data

const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password')

        res.json({
            success: true,
            userData
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//api to update user profile

const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            name,
            phone,
            address,
            dob,
            gender
        } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({
                success: false,
                message: 'Data is missing'
            })
        }
        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        })
        if (imageFile) {
            //upload image to cloudinary if image exists
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: 'image'
            })
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, {
                image: imageUrl
            })
        }
        res.json({
            success: true,
            message: 'Profile Updated'
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}
//api to book appointment 
const bookAppointment = async (req, res) => {
    try {
        const {
            docid,
            slotDate,
            slotime
        } = req.body;
        const userId = req.userId;
        const docData = await doctorModel.findById(docid).select('-password')
        if (!docData.available) {
            return res.json({
                success: false,
                message: 'Doctor not available'
            })
        }

        let slots_booked = docData.slots_booked

        //checking for slots avaialability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotime)) {
                return res.json({
                    success: false,
                    message: 'Slot not available'
                })
            } else {
                slots_booked[slotDate].push(slotime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotime);
        }

        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId: docid,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime: slotime,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save();

        //save new slots data in doctors data
        await doctorModel.findByIdAndUpdate(docid, {
            slots_booked
        })
        res.json({
            success: true,
            message: 'Appointment booked'
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//api to get user appointments for frontend myappointment page

const listAppointments = async (req, res) => {

    try {
        const userId = req.userId;
        const appointments = await appointmentModel.find({
            userId
        })
        res.json({
            success: true,
            appointments
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }

}

//api to cancel appointment

const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        //verify apppointment user
        if (appointmentData.userId != userId) {
            return res.json({
                success: false,
                message: 'Unauthorized action'
            })
        }

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

//api to make payment of appointment using razorpay


export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointments,
    cancelAppointment
}