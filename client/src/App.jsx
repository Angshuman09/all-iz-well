import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Homepage from './pages/Homepage'
import CounsellorPortal from './pages/Counsellorpage'
import RegistrationPage from './pages/Registrationpage'
import {Toaster} from 'react-hot-toast'
import {Loginpage} from './pages/Loginpage'
import StudentForm from './pages/StudentForm'
import CollegeForm from './pages/AdminForm'
import StudentDashboard from './pages/StudentDashboard'

export const App = () => {
  return (
    <div className='w-full h-screen'>
      <Routes>
      <Route path="/" element={<Layout><Homepage/></Layout>} />
      <Route path="/login" element={<Layout><Loginpage/></Layout>} />
      <Route path="/register" element={<Layout><RegistrationPage/></Layout>} />
      <Route path="/admin-dashboard" element={<Layout></Layout>} />
      <Route path="/counsellor-dashboard" element={<Layout><CounsellorPortal/></Layout>} />
      <Route path="/techTeam-dashboard" element={<Layout></Layout>} />
      <Route path="/student-form" element={<StudentForm/>} />
      <Route path="/admin-form" element={<CollegeForm/>} />
      <Route path='/student-dashboard' element={<StudentDashboard/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

