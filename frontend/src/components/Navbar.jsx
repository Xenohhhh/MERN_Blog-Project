import { Link, useNavigate } from "react-router-dom"

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

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
        Blogify
      </Link>

      
     

      <div className="nav-actions">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/drafts">Drafts</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="btn danger">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
