import React from 'react'
import "../styles/LayoutStyles.css"
import { adminMenu,  UserMenu } from '../Data/data.js'
import {Link,useLocation,useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import {message,Badge} from "antd"

const Layout = ({children}) => {
  const {user} = useSelector(state => state.user)
  const location = useLocation()
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    message.success('Logout Successfully')
    navigate('/login')
  }

  const doctorMenu = [
    {
        name:'Home',
        path:'/',
        icon: "fa-solid fa-house"
    },
    {
        name:'Appointments',
        path:"/doctor-appointments",
        icon:"fa-solid fa-list"
    },
    {
        name:'Profile',
        path:`/doctor/profile/${user?._id}`,
        icon:"fa-regular fa-user"
    }
]


  const SidebarMenu = user?.isAdmin ? adminMenu:user?.isDoctor ? doctorMenu:UserMenu
  return (
    <>
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>Doc APP</h6>
            <hr/>
          </div>
          <div className="menu">{SidebarMenu.map(menu => {
            const isActive = location.pathname===menu.path
            return (
              <>
                <div className={`menu-item ${isActive && "active"}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              </>
            )
          })}
          <div className={`menu-item `} onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content" >
            <Badge count={user && user.notification.length} onClick={()=>{navigate('/notification')}} style={{cursor:"pointer"}} >
            <i class="fa-solid fa-bell" style={{cursor:"pointer"}}></i>
          </Badge>
            <Link to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Layout