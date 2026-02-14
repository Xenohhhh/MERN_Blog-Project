import React from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const Profile = () => {
    const [user, setUser] = React.useState(null)
    const [draftCount, setDraftCount] = React.useState(0)
    const [publishedCount, setPublishedCount] = React.useState(0)

    const navigate = useNavigate()

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/user/profile")
                setUser(res.data.user)

                const draftsRes = await api.get("/post/mydrafts")
                setDraftCount(draftsRes.data.drafts.length)

                const publishedRes = await api.get("/post")
                const myPublished = publishedRes.data.posts.filter(
                    (post) => post.author === res.data.user._id
                )
                setPublishedCount(myPublished.length)
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
        <div className="container">
            <h1>Profile</h1>
            <div className="profile-image">
                <img
                    src={user.avatar}
                    alt="avatar"
                    className="avatar"
                />
            </div>

            <div className="profile-box">
                <div className="profile-item">
                    <span>Username:</span> {user.username}
                </div>
                <div className="profile-item">
                    <span>Email:</span> {user.email}
                </div>
                <div className="profile-item">
                    <span>Draft Posts:</span> {draftCount}
                </div>
                <div className="profile-item">
                    <span>Published Posts:</span> {publishedCount}
                </div>
            </div>
        </div>

    )
}

export default Profile
