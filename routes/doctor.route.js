import express,{Router} from 'express'
import authMiddleware from '../middlewares/auth.middleware.js'
import { getDoctorAppointmentsController, getDoctorByIdController, getDoctorInfoController, updateProfileController, updateStatusController } from '../controllers/doctor.controller.js'


const routing = Router()

routing.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)
routing.post('/updateProfile',authMiddleware,updateProfileController)
routing.post('/getDoctorById',authMiddleware,getDoctorByIdController)
routing.get('/doctor-appointments',authMiddleware,getDoctorAppointmentsController)
routing.post('/update-status',authMiddleware,updateStatusController)

export default routing