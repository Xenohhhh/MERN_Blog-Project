import { Routes, Route } from "react-router-dom"
import PostsFeed from "./pages/PostsFeed"
import SinglePost from "./pages/SinglePost"
import Login from "./pages/login"
import Register from "./pages/register"
import Profile from "./pages/profile"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostsFeed />} />
      <Route path="/post/:id" element={<SinglePost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
