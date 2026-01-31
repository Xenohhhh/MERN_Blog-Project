import React from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"


const PostsFeed = () => {
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)
  const [search, setSearch] = React.useState("")
  const [totalPages, setTotalPages] = React.useState(1)

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get(`/post?search=${search}&page=${page}&limit=6`)
        setPosts(prev => page === 1 ? res.data.posts : [...prev, ...res.data.posts])
        setTotalPages(res.data.totalPosts)
      } catch (err) {
        console.error(err)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page, search])
  const navigate = useNavigate()


  if (loading) return <p>Loading posts...</p>

  return (
    <div className="container">
      <h1>Posts</h1>

      <input
        type="text"
        placeholder="Search any blog"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }
        }
      />

      {posts.length === 0 && <p>No posts yet</p>}

      {posts.map((post) => (
        <div key={post._id} className="post-card" onClick={() => {navigate(`/post/${post._id}`)}}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}

      {page < totalPages && (
        <div className="load-more-wrapper">
          <button onClick={() => setPage((p) => p + 1)}>
            Load more
          </button>
        </div>
      )}
    </div>
  )
}


export default PostsFeed
