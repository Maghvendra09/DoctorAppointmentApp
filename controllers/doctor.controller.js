import { appointmentModel } from "../models/appointment.model.js"
import { doctorModel } from "../models/doctor.model.js"
import { userModel } from "../models/user.model.js"

const getDoctorInfoController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({success:true,message:"doctor data fetch success",data:doctor})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,error,message:"Error in fetching Doctor Details"})
    }
}

const updateProfileController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
        res.status(201).send({ success: true, message: "Doctor data update success", data: doctor });
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:"Error while updating profile",error})
    }
}

const getDoctorByIdController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({_id:req.body.doctorId})
        res.status(201).send({ success: true, message: "Single Doc info fetched", data: doctor });
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:"Error while booking appointment",error})
    }
}

const getDoctorAppointmentsController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOne({ userId: req.body.userId });
      const appointments = await appointmentModel.find({
        doctorId: doctor._id,
      });
      res.status(200).send({
        success: true,
        message: "Doctor Appointments fetch Successfully",
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Doc Appointments",
      });
    }
  }

  const updateStatusController = async (req, res) => {
    try {
      const { appointmentsId, status } = req.body;
      const appointments = await appointmentModel.findByIdAndUpdate(
        appointmentsId,
        { status }
      );
      const user = await userModel.findOne({ _id: appointments.userId });
      const notification = user.notification;
      notification.push({
        type: "status-updated",
        message: `your appointment has been updated ${status}`,
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Update Status",
      });
    }
  }

export {getDoctorInfoController,updateProfileController,getDoctorByIdController,getDoctorAppointmentsController,updateStatusController}