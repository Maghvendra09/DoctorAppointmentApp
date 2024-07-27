import express from "express";
import { authController, loginController, registerController,applyDoctorController,
    getAllNotificationController,deleteAllNotificationController, 
    getAllDoctorsController, 
    bookAppointmentController,
    bookingAvaibilityController,
    userAppointmentsController,
   } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()


router.post('/login',loginController)
router.post('/register',registerController)
router.post('/getuserdata',authMiddleware,authController)
router.post('/apply-doctor',authMiddleware,applyDoctorController)
router.post('/get-all-notification',authMiddleware,getAllNotificationController)
router.post('/delete-all-notification',authMiddleware,deleteAllNotificationController)
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)
router.post('/book-appointment',authMiddleware,bookAppointmentController)
router.post(
    "/booking-availbility",
    authMiddleware,
    bookingAvaibilityController
  )
  router.get('/user-appointments',authMiddleware,userAppointmentsController)
export default router