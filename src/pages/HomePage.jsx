import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import useAsyncState from '../hooks/useAsyncState'
import { fetchMoviesBySearch } from '../services/api'
import './HomePage.css'

const categoryPresets = [
  { label: 'Action', query: 'action' },
  { label: 'Comedy', query: 'comedy' },
  { label: 'Drama', query: 'drama' },
  { label: 'Sci-Fi', query: 'sci-fi' },
  { label: 'Fantasy', query: 'fantasy' },
  { label: 'Horror', query: 'horror' },
  { label: 'Animation', query: 'animation' },
  { label: 'Crime', query: 'crime' },
  { label: 'War', query: 'war' },
  { label: 'Romance', query: 'romance' },
]

function pickRandom(items, count) {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count)
}

function HomePage() {
  const [queryInput, setQueryInput] = useState('')
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')
  const location = useLocation()

  const {
    data: movies,
    setData: setMovies,
    loading,
    error,
    run,
  } = useAsyncState([])

  async function loadMovies({ query, nextSearchMode, nextActiveCategory = '', randomCount }) {
    setIsSearchMode(nextSearchMode)
    setActiveCategory(nextActiveCategory)

    try {
      const result = await run(() => fetchMoviesBySearch(query))
      if (randomCount) {
        setMovies(pickRandom(result, randomCount))
      }
    } catch {
      setMovies([])
    }
  }

  useEffect(() => {
    const featuredCategory = pickRandom(categoryPresets, 1)[0]
    loadMovies({ query: featuredCategory.query, nextSearchMode: false, randomCount: 8 })
  }, [location.state?.resetHomeAt])

  function handleSearch(event) {
    event.preventDefault()

    const normalized = queryInput.trim()
    if (!normalized) {
      return
    }

    loadMovies({ query: normalized, nextSearchMode: true })
  }

  function handleCategoryClick(category) {
    loadMovies({
      query: category.query,
      nextSearchMode: true,
      nextActiveCategory: category.label,
      randomCount: 8,
    })
  }

  return (
    <section>
      <h2>Discover movies</h2>

      <SearchBar value={queryInput} onChange={setQueryInput} onSubmit={handleSearch} disabled={loading} />

      <div className="category-bar" aria-label="Movie categories">
        {categoryPresets.map((category) => (
          <button
            key={category.label}
            type="button"
            className={`category-chip ${activeCategory === category.label ? 'category-chip--active' : ''}`}
            onClick={() => handleCategoryClick(category)}
            disabled={loading}
          >
            {category.label}
          </button>
        ))}
      </div>

      <p className="search-helper">
        {activeCategory
          ? `Showing random picks for ${activeCategory}.`
          : isSearchMode
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
