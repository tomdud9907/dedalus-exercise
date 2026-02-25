const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL || 'https://www.omdbapi.com'

function ensureApiKey() {
  if (!API_KEY) {
    throw new Error('Missing VITE_OMDB_API_KEY. Add it to your .env file.')
  }
}

function buildUrl(params) {
  const searchParams = new URLSearchParams({
    apikey: API_KEY,
    ...params,
  })

  return `${BASE_URL}/?${searchParams.toString()}`
}

export async function fetchMoviesBySearch(query) {
  ensureApiKey()
  const response = await fetch(buildUrl({ s: query }))
  const data = await response.json()

  if (!response.ok || data.Response === 'False') {
    throw new Error(data.Error || 'Failed to fetch movies list.')
  }

  return data.Search
}

export async function fetchMovieById(id) {
  ensureApiKey()
  const response = await fetch(buildUrl({ i: id, plot: 'full' }))
  const data = await response.json()

  if (!response.ok || data.Response === 'False') {
    throw new Error(data.Error || 'Failed to fetch movie details.')
  }

  return data
}