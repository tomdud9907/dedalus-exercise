function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
      <path d="M15.5 14h-.8l-.3-.3a6 6 0 10-.7.7l.3.3v.8L19 20.5 20.5 19 15.5 14zM10 15a5 5 0 110-10 5 5 0 010 10z" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="spark-icon">
      <path d="m12 2 2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2L12 2zm7.2 12.3 1.1 2.9 2.9 1.1-2.9 1.1-1.1 2.9-1.1-2.9-2.9-1.1 2.9-1.1 1.1-2.9zM4.8 14.5l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1z" />
    </svg>
  )
}

function SearchBar({ value, onChange, onSubmit, disabled }) {
  return (
    <form className="search-shell" onSubmit={onSubmit}>
      <div className="search-shell__left">
        <SparkIcon />
        <span className="search-shell__label">Movie Finder</span>
      </div>

      <label htmlFor="movie-search" className="sr-only">
        Search movies
      </label>
      <div className="search-input-wrap">
        <SearchIcon />
        <input
          id="movie-search"
          type="text"
          placeholder="Type a movie title..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
        />
      </div>

      <button type="submit" className="search-button" disabled={disabled}>
        Search
      </button>
    </form>
  )
}

export default SearchBar