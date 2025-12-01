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
import AdminDashboard from './pages/AdminDashboard'
import SuperAdminDashboard from './pages/SuperadminDashboard'
import MoodTracker from './pages/MoodTracker'
import Assessment from './pages/Assessment'

export const App = () => {
  return (
    <div className='w-full h-screen'>
      <Routes>
      <Route path="/" element={<Layout><Homepage/></Layout>} />
      <Route path="/login" element={<Layout><Loginpage/></Layout>} />
      <Route path="/register" element={<Layout><RegistrationPage/></Layout>} />
      <Route path="/admin-dashboard" element={<Layout><AdminDashboard/></Layout>} />
      <Route path="/counsellor-dashboard" element={<Layout><CounsellorPortal/></Layout>} />
      <Route path="/tech-team-dashboard" element={<Layout><SuperAdminDashboard/></Layout>} />
      <Route path="/student-form" element={<StudentForm/>} />
      <Route path="/admin-form" element={<CollegeForm/>} />
      <Route path='/student-dashboard' element={<StudentDashboard/>}/>

      {/* feature */}

      <Route path='/mood' element={<MoodTracker/>}/>
      <Route path='/test' element={<Assessment/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

