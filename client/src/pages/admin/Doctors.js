import React,{useEffect,useState} from 'react'
import Layout from "./../../components/Layout.js"
import axios from 'axios'
import { Button, message, Table } from 'antd'

const Doctors = () => {
  const [doctors,setDoctors] = useState([])
  const getDoctors = async() => {
    try {
      const  res = await axios.get('https://backend-doc-app.vercel.app/api/v1/admin/getAllDoctor',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        const filteredDoctors = res.data.data.filter(doctor => 
          doctor.status === 'pending' || doctor.status === 'approved'
        );
        setDoctors(filteredDoctors);
    }
    } catch (error) {
      console.log(error)

    }
  }

  const handleAccountStatus = async(record,status) => {
    try {
      const res = await axios.post('https://backend-doc-app.vercel.app/api/v1/admin/changeAccountStatus',
        {doctorId:record._id,userId:record.userId, status: status},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        message.success(res.data.message)
        window.location.reload()
      }
    } catch (error) {
      message.error('something went worng')
    }
  }

  const handleAccountStatusReject = async(record,status) => {
    try {
      const res = await axios.post('https://backend-doc-app.vercel.app/api/v1/admin/changeAccountStatus',
        {doctorId:record._id,userId:record.userId, status: status},{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.data.success){
        message.success(res.data.message)
        window.location.reload()
      }
    } catch (error) {
      message.error('something went worng')
    }
  }

  useEffect(()=>{
    getDoctors()
  },[])

  const columns = [
    {
      title:'Name',
      dataIndex: 'name',
      render: (text,record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title:'Status',
      dataIndex: 'status',
    },
    {
      title:'Phone',
      dataIndex: 'phone',
    },
    {
      title:'Actions',
      dataIndex: 'actions',
      render:(text,record) => (
        <div className="d-flex">
          {record.status==='pending' ? <Button className='btn btn-success' onClick={() => handleAccountStatus(record,"approved")}>Approve</Button> : 
          <Button className='btn btn-danger' onClick={() => handleAccountStatusReject(record,"reject")}>Reject</Button>}
        </div>
      )
    }
  ]
  return (
    <Layout>
        <h1 className="text-center m-2">All Doctors</h1>
        <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  )
}

export default Doctors
