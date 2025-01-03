import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import {useSelector,useDispatch} from "react-redux"
import { hideLoading, showLoading } from '../redux/features/alertSlice.js'
import { setUser } from '../redux/features/userSlice.js'

export default function ProtectedRoutes({children}) {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)

  const getUser = async() => {
    try {
      dispatch(showLoading())
      const res = await axios.post('https://backend-doc-app.vercel.app//api/v1/user/getUserData',{
        token:localStorage.getItem('token')
      },
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(hideLoading())
    if(res.data.success){
      dispatch(setUser(res.data.data))
    }else{
      <Navigate to="/login"/>
      localStorage.clear()
    }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear()
      console.log(error)
    }
  }

  useEffect(() => {
    if(!user){
      getUser()
    }
  }, [user,getUser])

  if(localStorage.getItem("token")){
    return children
  }
  return <Navigate to="/login"/>
}