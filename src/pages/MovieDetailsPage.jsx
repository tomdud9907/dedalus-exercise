import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsyncState from '../hooks/useAsyncState'
import { fetchMovieById } from '../services/api'
import './MovieDetailsPage.css'

function MovieDetailsPage() {
  const { id } = useParams()
  const {
    data: movie,
    loading,
    error,
    run,
  } = useAsyncState(null)

  useEffect(() => {
    run(() => fetchMovieById(id)).catch(() => {})
  }, [id, run])

  return (
    <section className="details-page">
      <Link to="/" className="details-back-link">
        ← Back to home
      </Link>

      {loading && <p>Loading details...</p>}
      {error && <p role="alert">Error: {error}</p>}

      {!loading && !error && movie && (
        <article className="details-card">
          <div className="details-card__poster-wrap">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img src={movie.Poster} alt={`Poster: ${movie.Title}`} className="details-card__poster" />
            ) : (
              <div className="details-card__poster details-card__poster--fallback">No poster</div>
            )}
          </div>

          <div className="details-card__content">
            <h2>{movie.Title}</h2>
            <p className="details-card__subtitle">
              {movie.Year} • {movie.Runtime}
            </p>

            <div className="details-highlights">
              <span className="details-pill"> IMDb: {movie.imdbRating || 'N/A'}</span>
              <span className="details-pill"> Director: {movie.Director || 'N/A'}</span>
              <span className="details-pill"> Genre: {movie.Genre || 'N/A'}</span>
            </div>

            <p className="details-plot">{movie.Plot || 'No plot available.'}</p>

            <dl className="details-meta-grid">
              <div>
                <dt>Actors</dt>
                <dd>{movie.Actors || 'N/A'}</dd>
              </div>
              <div>
                <dt>Country</dt>
                <dd>{movie.Country || 'N/A'}</dd>
              </div>
              <div>
                <dt>Awards</dt>
                <dd>{movie.Awards || 'N/A'}</dd>
              </div>
              <div>
                <dt>Released</dt>
                <dd>{movie.Released || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </article>
      )}
    </section>
  )
}

export default MovieDetailsPage
