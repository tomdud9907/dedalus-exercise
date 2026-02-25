import { NavLink, Route, Routes } from 'react-router-dom'
import MovieDetailsPage from './pages/MovieDetailsPage'
import NewsletterPage from './pages/NewsletterPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <h1>Mini IMDb</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/newsletter">Newsletter</NavLink>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App