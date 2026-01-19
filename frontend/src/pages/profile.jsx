import React from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const Profile = () => {
  const [user, setUser] = React.useState(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile")
        setUser(res.data.user)
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login")
        }
      }
    }

    fetchProfile()
  }, [navigate])

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <h1>Profile</h1>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  )
}

export default Profile
