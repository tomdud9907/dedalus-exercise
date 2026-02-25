import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMovieById, fetchMoviesBySearch } from '../services/api'

const featuredMoviePool = [
  'tt0111161', // Shawshank
  'tt0068646', // Godfather
  'tt0468569', // Dark Knight
  'tt0133093', // Matrix
  'tt0109830', // Forrest Gump
  'tt0167260', // LOTR: Return of the King
  'tt1375666', // Inception
  'tt6751668', // Parasite
  'tt0120737', // LOTR: Fellowship
  'tt0110912', // Pulp Fiction
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

  const featuredIds = useMemo(() => getRandomIds(featuredMoviePool, 6), [])

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
  }, [featuredIds])

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

      <form className="search-form" onSubmit={handleSearch}>
        <label htmlFor="movie-search" className="sr-only">
          Search movies
        </label>
        <input
          id="movie-search"
          type="text"
          placeholder="Search by title..."
          value={queryInput}
          onChange={(event) => setQueryInput(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <p>
        {isSearchMode
          ? 'Search results from OMDb API.'
          : 'Random featured movies from OMDb API (refresh page for a new set).'}
      </p>

      {loading && <p>Loading movies...</p>}
      {error && <p role="alert">Error: {error}</p>}
      {!loading && !error && movies.length === 0 && <p>No movies found.</p>}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <article key={movie.imdbID} className="movie-card">
              {movie.Poster && movie.Poster !== 'N/A' ? (
                <img src={movie.Poster} alt={`Poster: ${movie.Title}`} className="movie-poster" />
              ) : (
                <div className="movie-poster movie-poster-fallback">No poster</div>
              )}
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <Link to={`/movie/${movie.imdbID}`}>See details</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default HomePage