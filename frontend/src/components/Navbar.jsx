import { Link, useNavigate, useLocation } from "react-router-dom"

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ink<span>.</span>
      </Link>

      
     

      <div className="nav-actions">
        {!token ? (
          <>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        ) : (
          <>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Feed</Link>
            <Link to="/drafts" className={location.pathname.startsWith('/drafts') ? 'active' : ''}>Drafts</Link>
            <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>
            <button onClick={handleLogout} className="btn secondary">Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
