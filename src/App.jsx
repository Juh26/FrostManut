import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import MyBookings from './pages/MyBookings'
import AdminBookings from './pages/admin/AdminBookings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking/:serviceId" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin" element={<AdminBookings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
