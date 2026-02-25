import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import NewsletterPage from './pages/NewsletterPage'

function App() {
  return (
    <div className="app-shell">
      <Navbar />

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