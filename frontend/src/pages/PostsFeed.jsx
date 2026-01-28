import React from "react"
import api from "../api/axios"

const PostsFeed = () => {
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/post")
        setPosts(Array.isArray(res.data.posts) ? res.data.posts : [])
      } catch (err) {
        console.error(err)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <p>Loading posts...</p>

  return (
    <div className="container">
      <h1>Posts</h1>

      {posts.length === 0 && <p>No posts yet</p>}

      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}


export default PostsFeed
