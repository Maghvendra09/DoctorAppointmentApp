import React from 'react'
import Layout from '../components/Layout.js'
import {Col, Form, Input, message, Row,TimePicker} from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice.js'
import axios from 'axios'
import moment from 'moment'

const ApplyDoctor = () => {
    const {user} = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFinish = async(values)=>{
        try {
            if (!values.timings || values.timings.length !== 2) {
                message.error('Please select valid timings');
                return;
              }
          
              const [startTime, endTime] = values.timings;
          

              const formattedTimings = [
                moment(startTime).format('HH:mm'),
                moment(endTime).format('HH:mm'),
              ];
          
            dispatch(showLoading())
            const res = await axios.post('https://backend-doc-app.vercel.app/api/v1/user/apply-doctor', {...values, userId:user._id,timings:formattedTimings},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate("/")
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went wrong')
        }
    }
  return (
    <Layout>
        <h1 className="text-center">Apply Doctor</h1>
        <Form layout='vertical' onFinish={handleFinish} className="m-3">
            <h4 className='text-light'>Personal Details : </h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your Name'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your last Name'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Phone No" name="phone" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Phone No'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                        <Input type='email' placeholder='Your email address'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Website" name="website" >
                        <Input type='text' placeholder='Your Website'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Address" name="address" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your Address'/>
                    </Form.Item>
                </Col>
            </Row>

            <h4 className='text-light'>Professional Details : </h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your specialization'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your experience'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Fees Per Consultation" name="feesPerCunsultation" required rules={[{required:true}]}>
                        <Input type='text' placeholder='Your Contact No'/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label="Timing" name="timings" required rules={[{required:true}]}>
                        <TimePicker.RangePicker format={"HH:mm"}/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                <button className='btn btn-primary form-btn' type="submit">Submit</button>
                </Col>
            </Row>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor
