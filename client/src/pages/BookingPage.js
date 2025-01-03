import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, message, TimePicker } from 'antd';
import moment from 'moment';
import { hideLoading, showLoading } from '../redux/features/alertSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const BookingPage = () => {
    const {user} = useSelector(state =>state.user)
  const params = useParams();
  const dispatch = useDispatch()

  const [doctors, setDoctors] = useState([]); 
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvaibile, setIsAvaibile] = useState();

  const getUserData = async () => {
    try {
      const res = await axios.post('https://backend-doc-app.vercel.app/api/v1/doctor/getDoctorById', { doctorId: params.doctorId }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async() => {
    try {
        setIsAvaibile(true)
        if(!date && !time){
            return alert("Date & Time Required")
        }
        dispatch(showLoading())
        const res = await axios.post('https://backend-doc-app.vercel.app/api/v1/user/book-appointment',
            {doctorId:params.doctorId,userId:user._id,doctorInfo:doctors,date:date,userInfo:user,time:time},{
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              dispatch(hideLoading())
              if(res.data.success){
                message.success(res.data.message)
              }
    } catch (error) {
        dispatch(hideLoading())
        console.log(error)
    }
  }


  const handleAvaibility = async() => {
    try {
        if(!date && !time){
            return alert("Date & Time Required")
        }
        dispatch(showLoading())
        const res = await axios.post('https://backend-doc-app.vercel.app/api/v1/user/booking-availbility',{
            doctorId:params.doctorId,date,time
        },{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
        })
        dispatch(hideLoading())
        if(res.data.success){
            setIsAvaibile(true)
            message.success(res.data.message)
        }else{
            message.error(res.data.message)
        }
    } catch (error) {
        dispatch(hideLoading())
        console.log(error)
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>Dr. {doctors.firstName} {doctors.lastName}</h4>
            <h4>Fees: {doctors.feesPerCunsultation}</h4>
            <h4>Timings : {doctors.timings && doctors.timings[0]} -{" "}
            {doctors.timings && doctors.timings[1]}{" "}</h4>
            <div className="d-flex flex-column w-50">
              <DatePicker className='m-2' format="DD-MM-YYYY" onChange={(value) => {
                setIsAvaibile(false)
                setDate(moment(value).format("DD-MM-YYYY"))}} />
              <TimePicker className='m-2' format="HH:mm" onChange={(value) => {
                setIsAvaibile(false)
                setTime(moment(value).format("HH:mm"))}} />
              <button className='btn btn-primary mt-2' onClick={handleAvaibility}>Check Availability</button>
              {!isAvaibile && (
                <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
