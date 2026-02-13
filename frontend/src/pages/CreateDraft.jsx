import React from "react"
import { useNavigate, Link } from "react-router-dom"
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

  // Auto-resize textarea logic (optional but recommended for this UI)
  const handleContentChange = (e) => {
    setContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  return (
    <div className="editor-page">
      <div className="editor-container">
        <div className="action-bar">
            <Link to="/drafts" className="back-link">
                <span>&larr;</span> Back to drafts
            </Link>
            <button 
                className="btn-publish" 
                onClick={handleSubmit} 
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Draft"}
            </button>
        </div>

        {/* The Editor Form */}
        <form onSubmit={handleSubmit} className="editor-form">
            <input
              type="text"
              className="editor-title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />

            <textarea
              className="editor-content"
              placeholder="Tell your story..."
              value={content}
              onChange={handleContentChange}
              required
            />
        </form>
      </div>
    </div>
  )
}

export default CreateDraft
