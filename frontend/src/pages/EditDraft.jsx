import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"

const EditDraft = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  
  React.useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await api.get(`/post/${id}`)
        setTitle(res.data.post.title)
        setContent(res.data.post.content)
      } catch (err) {
        setError("Failed to load draft")
      } finally {
        setLoading(false)
      }
    }

    fetchDraft()
  }, [id])

  const handleSave = async (e) => {
    e.preventDefault()

    try {
      await api.patch(`/post/${id}`, {
        title,
        content,
      })
      navigate("/drafts")
    } catch (err) {
      setError("Failed to update draft")
    }
  }

  if (loading) return <p className="loading">Loading draft...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div className="container">
      <h1>Edit Draft</h1>

      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            rows="10"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Draft
        </button>
      </form>
    </div>
  )
}

export default EditDraft
