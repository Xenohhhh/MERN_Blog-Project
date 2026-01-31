import React from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

const PostsFeed = () => {
  const navigate = useNavigate()

  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  // 👇 separate states
  const [input, setInput] = React.useState("")   // what user types
  const [search, setSearch] = React.useState("") // what backend uses

  const [page, setPage] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(true)

  const LIMIT = 6

  const fetchPosts = async (pageNumber = 1, reset = false) => {
    try {
      const res = await api.get(
        `/post?search=${search}&page=${pageNumber}&limit=${LIMIT}`
      )

      const newPosts = res.data.posts || []

      setPosts((prev) =>
        reset ? newPosts : [...prev, ...newPosts]
      )

      setHasMore(newPosts.length === LIMIT)
    } catch (err) {
      console.error("Failed to fetch posts", err)
    } finally {
      setLoading(false)
    }
  }

  // 🔁 runs only when SEARCH changes (not while typing)
  React.useEffect(() => {
    setLoading(true)
    setPage(1)
    fetchPosts(1, true)
  }, [search])

  const handleSearch = () => {
    setSearch(input) // 🔥 trigger search intentionally
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchPosts(nextPage)
  }

  if (loading) return <p className="loading">Loading posts...</p>

  return (
    <div className="feed-page">
      <h1 className="feed-title">Latest Articles</h1>

      {/* 🔍 SEARCH */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {posts.length === 0 && <p>No posts found</p>}

      {/* 📄 POSTS */}
      <div className="posts-grid">
        {posts.map((post) => (
          <div
            key={post._id}
            className="post-card"
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <div className="post-content">
              <h2>{post.title}</h2>
              <p>{post.content.slice(0, 120)}...</p>
            </div>
            <div className="post-footer">Read more →</div>
          </div>
        ))}
      </div>

      {/* ➕ LOAD MORE */}
      {hasMore && (
        <div className="load-more-wrapper">
          <button onClick={handleLoadMore}>Load more</button>
        </div>
      )}
    </div>
  )
}

export default PostsFeed
