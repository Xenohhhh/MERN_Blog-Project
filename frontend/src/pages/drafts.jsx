import React from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const Drafts = () => {
  const [drafts, setDrafts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await api.get("/post/mydrafts")
        setDrafts(res.data.drafts)
      } catch (err) {
        setError("Failed to fetch drafts")
      } finally {
        setLoading(false)
      }
    }

    fetchDrafts()
  }, [])

  const handlePublish = async (id) => {
    try {
      await api.patch(`/post/posts/publish/${id}`)
      setDrafts((prev) => prev.filter((draft) => draft._id !== id))
    } catch (err) {
      alert("Failed to publish draft")
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this draft?")) return

    try {
      await api.delete(`/post/${id}`)
      setDrafts((prev) => prev.filter((draft) => draft._id !== id))
    } catch (err) {
      alert("Failed to delete draft")
    }
  }

  if (loading) return <p className="loading">Loading drafts...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div className="container">
      <h1>My Drafts</h1>

      {drafts.length === 0 && <p>No drafts yet</p>}

      {drafts.map((draft) => (
        <div key={draft._id} className="post-card">
          <h2>{draft.title}</h2>
          <p>{draft.content.slice(0, 120)}...</p>

          <div className="actions">
            <button onClick={() => navigate(`/drafts/${draft._id}/edit`)}>
              Edit
            </button>

            <button onClick={() => handlePublish(draft._id)}>
              Publish
            </button>

            <button className="danger" onClick={() => handleDelete(draft._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Drafts
