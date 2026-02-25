import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchMovieById } from '../services/api'

function MovieDetailsPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true)
        const data = await fetchMovieById(id)
        setMovie(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  return (
    <section>
      <h2>Movie details</h2>

      {loading && <p>Loading details...</p>}
      {error && <p role="alert">Error: {error}</p>}

      {!loading && !error && movie && (
        <>
          <h3>{movie.Title}</h3>
          <p>
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>
          <p>{movie.Plot}</p>
        </>
      )}

      <Link to="/">← Back to home</Link>
    </section>
  )
}

export default MovieDetailsPage