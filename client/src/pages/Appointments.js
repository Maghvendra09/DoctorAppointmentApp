import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout.js'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'

const Appointments = () => {
    const [appointments,setAppointments] = useState([])
    const getAppointments = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/user/user-appointments',{
                headers:{
                    Authorization : "Bearer " + localStorage.getItem("token"),
                },
            })
            console.log(res.data);
            if(res.data.success){
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAppointments()
    },[])

    const columns = [
        {
          title: "ID",
          dataIndex: "_id",
        },
        {
          title: "Date & Time",
          dataIndex: "date",
          render: (text, record) => (
            <span>
              {moment(record.date).format("DD-MM-YYYY")} &nbsp;
              {moment(record.time).format("HH:mm")} 
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        },
      ]
    
      return (
        <Layout>
          <h1>Appoinmtnets Lists</h1>
          <Table columns={columns} dataSource={appointments} />
        </Layout>
      )
    }

export default Appointments