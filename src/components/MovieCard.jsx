import { Link } from 'react-router-dom'
import './MovieCard.css'

function MovieCard({ movie }) {
  const posterAvailable = movie.Poster && movie.Poster !== 'N/A'

  return (
    <article className="movie-card">
      <div className="movie-card__media">
        {posterAvailable ? (
          <img src={movie.Poster} alt={`Poster: ${movie.Title}`} className="movie-card__poster" />
        ) : (
          <div className="movie-card__poster movie-card__poster--fallback">No poster</div>
        )}
        <span className="movie-card__badge">{movie.Type || 'movie'}</span>
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__meta">Released: {movie.Year}</p>

        {movie.Genre && <p className="movie-card__meta">Genre: {movie.Genre}</p>}

        <Link to={`/movie/${movie.imdbID}`} className="movie-card__cta">
          Open details →
        </Link>
      </div>
    </article>
  )
}

export default MovieCard
