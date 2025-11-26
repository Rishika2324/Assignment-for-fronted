import './App.css'
import { NavBar } from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DashboardV2 from './pages/DashboardV2'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard-v2" element={<DashboardV2 />} />
      </Routes>
    </div>
  )
}

export default App
