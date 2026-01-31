import React from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const CreateDraft = () => {
  const navigate = useNavigate()

  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post("/post/draft", { title, content })
      navigate("/drafts")
    } catch (err) {
      alert("Failed to create draft")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>New Draft</h1>

      <p>Title should be at least 3 character long.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button disabled={loading}>
          {loading ? "Saving..." : "Save Draft"}
        </button>
      </form>
    </div>
  )
}

export default CreateDraft
