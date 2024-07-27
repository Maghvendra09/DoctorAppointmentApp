import React from 'react'
import Layout from '../components/Layout.js'
import { message, Tabs } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)
    const handleMarkAllRead = async() => {
        try {
            dispatch(showLoading())
             const res = await axios.post('http://localhost:3000/api/v1/user/get-all-notification',{userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
             dispatch(hideLoading())
             if(res.data.success){
                message.success(res.data.success)
                window.location.reload()
            }else{
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("Something went wrong")
        }
    }
    const handleNavigate = async() => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:3000/api/v1/user/get-all-notification',{userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
             dispatch(hideLoading())
             if (user.isAdmin) {
                navigate('/notification');
            } else if (user.isDoctor) {
                navigate('/doctor-appointments');
            } else {
                navigate('/appointments');
            }
            
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("Something went wrong")
        }
    }
    const handleDeleteAllRead= async() => {
        try {
            dispatch(showLoading())
             const res = await axios.post('http://localhost:3000/api/v1/user/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
             dispatch(hideLoading())
             if(res.data.success){
                message.success(res.data.success || 'notification deleted successfully')
                window.location.reload()
            }else{
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('something went wrong')
        }
    }
  return (
    <Layout>
        <h4 className="p-3 text-center">Notification Page</h4>
        <Tabs>
            <Tabs.TabPane tab="unRead" key={0}>
                <div className="d-flex justify-content-end">
                    <h4 className="p-2 text-primary" style={{cursor:"pointer"}} onClick={handleMarkAllRead}>Mark All Read</h4>
                </div>
                {
                    user?.notification.map(notificationMsg => (
                        <div className=".card"  style={{cursor:"pointer"}}>
                            <div className="card-text" onClick={handleNavigate}>
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab="Read" key={1}>
                <div className="d-flex justify-content-end">
                    <h4 className="p-2 text-primary" style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>Delete All Read</h4>
                </div>
                {
                    user?.seenotification.map(notificationMsg => (
                        <div className=".card"  style={{cursor:"pointer"}}>
                            <div className="card-text" onClick={handleNavigate}>
                                {notificationMsg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
    </Layout>

  )
}

export default NotificationPage