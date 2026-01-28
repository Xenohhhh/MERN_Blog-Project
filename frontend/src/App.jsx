import { Routes, Route } from "react-router-dom"
import PostsFeed from "./pages/PostsFeed"
import SinglePost from "./pages/SinglePost"
import Login from "./pages/login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Drafts from "./pages/drafts"
import EditDraft from "./pages/EditDraft"
import ProtectedRoute from "./components/ProtectedRoutes"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostsFeed />} />
      <Route path="/post/:id" element={<SinglePost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />


      <Route path="/profile" element={<Profile />} />
      <Route path="/drafts" element={<Drafts />} />
      <Route path="/drafts/:id/edit" element={<EditDraft />} />
    </Routes>
  )
}

export default App
