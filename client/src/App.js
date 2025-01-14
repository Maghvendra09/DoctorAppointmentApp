import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import { useSelector } from 'react-redux'
import Spinner from './components/Spinner.js'
import ProtectedRoutes from './components/ProtectedRoutes.js'
import PublicRoutes from './components/PublicRoutes.js'
import ApplyDoctor from './pages/ApplyDoctor.js'
import NotificationPage from './pages/NotificationPage.js'
import Users from './pages/admin/Users.js'
import Doctors from './pages/admin/Doctors.js'
import Profile from './pages/doctor/Profile.js'
import BookingPage from './pages/BookingPage.js'
import Appointments from './pages/Appointments.js'
import DoctorAppointments from './pages/doctor/DoctorAppointments.js'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
    <BrowserRouter>
    {loading ? (<Spinner/>):
    (
      <Routes>
    <Route path='/' element={
      <ProtectedRoutes>
        <HomePage/>
      </ProtectedRoutes>
      }/>
      <Route path='/apply-doctor' element={
      <ProtectedRoutes>
        <ApplyDoctor/>
      </ProtectedRoutes>
      }/>
      <Route path='/admin/users' element={
      <ProtectedRoutes>
        <Users/>
      </ProtectedRoutes>
      }/>
      <Route path='/admin/doctors' element={
      <ProtectedRoutes>
        <Doctors/>
      </ProtectedRoutes>
      }/>
      <Route path='/doctor/profile/:id' element={
      <ProtectedRoutes>
        <Profile/>
      </ProtectedRoutes>
      }/>
      <Route path='/doctor/book-appointment/:doctorId' element={
      <ProtectedRoutes>
        <BookingPage/>
      </ProtectedRoutes>
      }/>
      <Route path='/notification' element={
      <ProtectedRoutes>
        <NotificationPage/>
      </ProtectedRoutes>
      }/>
    <Route path='/login' element={
      <PublicRoutes>
        <Login/>
      </PublicRoutes>
      }/>
    <Route path='/register' element={
      <PublicRoutes>
        <Register/>
      </PublicRoutes>
      } />
      <Route path='/appointments' element={
      <ProtectedRoutes>
        <Appointments/>
      </ProtectedRoutes>
      } />
      <Route path='/doctor-appointments' element={
      <ProtectedRoutes>
        <DoctorAppointments/>
      </ProtectedRoutes>
      } />
    </Routes>
    )
    }
    
    </BrowserRouter>
    <SpeedInsights />
    <Analytics />
    </>
  );
}



export default App;
