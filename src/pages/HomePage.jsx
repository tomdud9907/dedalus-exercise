import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import { fetchMovieById, fetchMoviesBySearch } from '../services/api'

const featuredMoviePool = [
  'tt0111161',
  'tt0068646',
  'tt0468569',
  'tt0133093',
  'tt0109830',
  'tt0167260',
  'tt1375666',
  'tt6751668',
  'tt0120737',
  'tt0110912',
]

function getRandomIds(pool, count) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count)
}

function HomePage() {
  const [queryInput, setQueryInput] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSearchMode, setIsSearchMode] = useState(false)
  const location = useLocation()

  const featuredIds = useMemo(() => getRandomIds(featuredMoviePool, 8), [])

  useEffect(() => {
    async function loadFeaturedMovies() {
      try {
        setLoading(true)
        setError('')
        setIsSearchMode(false)

        const results = await Promise.all(featuredIds.map((id) => fetchMovieById(id)))
        setMovies(results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedMovies()
  }, [featuredIds, location.state?.resetHomeAt])

  async function handleSearch(event) {
    event.preventDefault()

    const normalized = queryInput.trim()
    if (!normalized) {
      return
    }

    try {
      setLoading(true)
      setError('')
      setIsSearchMode(true)
      const result = await fetchMoviesBySearch(normalized)
      setMovies(result)
    } catch (err) {
      setError(err.message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h2>Discover movies</h2>

      <SearchBar value={queryInput} onChange={setQueryInput} onSubmit={handleSearch} disabled={loading} />

      <p className="search-helper">
        {isSearchMode
          ? 'Showing your search results from OMDb.'
          : 'Showing featured movies from OMDb (open Home again to reset).'}
      </p>

      {loading && <p>Loading movies...</p>}
      {error && <p role="alert">Error: {error}</p>}
      {!loading && !error && movies.length === 0 && <p>No movies found.</p>}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}

export default HomePage