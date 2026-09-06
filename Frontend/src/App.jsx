import { useEffect } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import AllPosts from './pages/AllPosts'

const App = () => {
  const location = useLocation()

  useEffect(() => {
    document.title = location.pathname === '/create-post'
      ? 'Create Your Post | Postly'
      : 'Your All Posts | Postly'
  }, [location.pathname])

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/all-posts">
          <span className="brand-mark">p</span>
          <span>Postly</span>
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
            to="/all-posts"
          >
            All Posts
          </NavLink>
          <NavLink 
            className={({ isActive }) => isActive ? 'nav-link active create-link' : 'nav-link create-link'} 
            to="/create-post"
          >
            <span>+</span> Create Post
          </NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/all-posts" replace />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>

      <footer className="footer">Created by Hasnain Tahir</footer>
    </div>
  )
}

export default App