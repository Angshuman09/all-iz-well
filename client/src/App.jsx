import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>} />
      <Route path="/login" element={<Layout></Layout>} />
      <Route path="/register" element={<Layout></Layout>} />
      <Route path="/admin-dashboard" element={<Layout></Layout>} />
    </Routes>
  )
}
