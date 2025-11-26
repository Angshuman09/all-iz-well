import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Homepage from './pages/Homepage'
import CounsellorPortal from './pages/Counsellorpage'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Homepage/></Layout>} />
      <Route path="/login" element={<Layout></Layout>} />
      <Route path="/register" element={<Layout></Layout>} />
      <Route path="/admin-dashboard" element={<Layout></Layout>} />
      <Route path="/counsellor-dashboard" element={<Layout><CounsellorPortal/></Layout>} />
    </Routes>
  )
}

