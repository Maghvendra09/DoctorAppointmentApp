import {userModel} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { doctorModel } from "../models/doctor.model.js"
import { appointmentModel } from "../models/appointment.model.js"
import moment from 'moment'

const registerController = async(req,res)=>{
    const {email,password} = req.body
    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({message:'User already exist',success:false});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password=hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:"Register Successfully",success:true})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message: `Register Controller ${error.message}`})
    }
}
const loginController = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({message:'User not exist',success:false});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(200).send({message:'Invalid Email or Password',success:false});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1d'})
        res.status(200).send({message:"Login Success",success:true,token})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:`Login Controller ${error.message}`})
    }
}

const authController=async(req,res) => {
    try {
        const user = await userModel.findById({_id:req.body.userId})
        user.password = undefined
        if(!user){
            return res.status(200).send({message:'user not found',success:false})
        }
        res.status(200).send({
            success:true,
            data:user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'authorization error',success:false,error})
    }
}

const applyDoctorController = async(req,res) => {
    try {
        const newDoctor =  await doctorModel({...req.body,status:"pending"})
        await newDoctor.save()
        const adminUser = await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:"apply-doctor request",
            message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
            data:{
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: "/admin/doctors"
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({success:true,message:"Doctor Account applied successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,error,message:"Error while applying for Doctor"})
    }
}

const getAllNotificationController = async(req,res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const seenotification = user.seenotification
        const notification=user.notification
        seenotification.push(...notification)
        user.notification= []
        user.seenotification = notification
        const updateUser = await user.save()
        res.status(200).send({
            success: true,
            message: 'all notification marked as read',
            data: updateUser,
          });
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,error,message:"Error in Notification"})
    }
}

const deleteAllNotificationController = async(req,res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        user.notification=[]
        user.seenotification= []
        const updateUser = await user.save()
        updateUser.password = undefined
        res.status(200).send({success: true, message:'notification deleted successfully',data:updateUser})

    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,error,message:'Error in deleting notification'})
    }
}

const getAllDoctorsController = async(req,res) => {
    try {
        const doctors = await doctorModel.find({status:'approved'})
        res.status(200).send({success: true, message:'Doctors List fetched successfully',data:doctors})

    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,error,message:'Error while fetching doctor details'})
    }
}

const bookAppointmentController = async(req,res) => {
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        req.body.time = moment(req.body.time, 'HH:mm').toISOString()
        req.body.status = 'pending'
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()
        const user = await userModel.findOne({_id:req.body.doctorInfo.userId})
        user.notification.push({
            type:'New-appointment-request',
            message:`A new appointment request from ${req.body.userInfo.name}`,
            onClickPath : '/doctor-appointments'
        })
        await user.save()
        res.status(200).send({success: true, message:'Appointment requested successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,error,message:'Error while booking appointment'})
    }
}

const bookingAvaibilityController = async(req,res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString()
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString()
        const doctorId =req.body.doctorId
        const appointments = await appointmentModel.find({doctorId,date,
            time:{
                $gte:fromTime, $lte:toTime
            }
        })
        if(appointments.length>0){
            return res.status(200).send({
                message:'Appointments not available at this time',
                success: true
            })
        }else{
            return res.status(200).send({
                message:'Appointments Available',
                success:true
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,error,message:'Error while checking avaibility'})
    }
}

const userAppointmentsController = async(req, res) => {
    try {
        const userId = req.body.userId; 
      const appointments = await appointmentModel.find({
        userId
      });
      res.status(200).send({
        success: true,
        message: "Users Appointments Fetch SUccessfully",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In User Appointments",
      });
    }
  };


  

export {loginController,registerController,authController,applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController
,getAllDoctorsController,bookAppointmentController,bookingAvaibilityController,
userAppointmentsController}