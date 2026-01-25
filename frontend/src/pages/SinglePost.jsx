import React from "react"
import { useParams } from "react-router-dom"
import api from "../api/axios"

const SinglePost = () => {
  const { id } = useParams()
  const [post, setPost] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/post/${id}`)
        setPost(res.data.post)
      } catch (err) {
        setError("Post not found")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) return <p className="loading">Loading post...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export default SinglePost