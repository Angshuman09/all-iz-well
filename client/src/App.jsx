import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Homepage from './pages/Homepage'
import CounsellorPortal from './pages/Counsellorpage'
import RegistrationPage from './pages/Registrationpage'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Homepage/></Layout>} />
      <Route path="/login" element={<Layout></Layout>} />
      <Route path="/register" element={<Layout><RegistrationPage/></Layout>} />
      <Route path="/admin-dashboard" element={<Layout></Layout>} />
      <Route path="/counsellor-dashboard" element={<Layout><CounsellorPortal/></Layout>} />
      <Route path="/superadmin-dashboard" element={<Layout></Layout>} />
      <Route path="/continue" element={<div className='bg-green-300 w-full h-screen flex justify-center items-center'>will be continue</div>} />
    </Routes>
  )
}

