import { NavLink } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { useDashboardStore } from '../store/dashboardStore'

export const NavBar = () => {
  const searchTerm = useDashboardStore((s) => s.searchTerm)
  const setSearchTerm = useDashboardStore((s) => s.setSearchTerm)

  return (
    <nav className="top-nav">
      <div className="nav-left">
       
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/dashboard-v2" className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard v2
          </NavLink>
        </div>
      </div>

      <div className="nav-center">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="nav-right" />
    </nav>
  )
}
