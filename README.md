# Mini IMDb (React + Vite)

A small movie discovery app built for an interview exercise.

The app demonstrates:
- **Form validation** (newsletter sign-up with duplicate check in `localStorage`)
- **Multiple pages** (Home, Movie details, Newsletter)
- **Responsive design** (mobile-friendly layout/components)
- **API-driven data** (OMDb-powered movie search and details)

## Tech stack

- React 18
- Vite 5
- React Router DOM 6
- Plain CSS (split by page/component)

## Features

### Home page (`/`)
- Search movies by title
- Quick category chips (Action, Comedy, Drama, etc.)
- Randomised featured picks
- Movie cards with poster, year, type and details CTA

### Movie details (`/movie/:id`)
- Full movie details from OMDb
- Poster + highlighted metadata
- Back navigation to Home

### Newsletter (`/newsletter`)
- Email + consent checkbox validation
- Duplicate email protection
- Data persisted in browser `localStorage`

## Project structure

```txt
src/
  components/
    Navbar.jsx
    Navbar.css
    MovieCard.jsx
    MovieCard.css
    SearchBar.jsx
    SearchBar.css
  hooks/
    useAsyncState.js
  pages/
    HomePage.jsx
    HomePage.css
    MovieDetailsPage.jsx
    MovieDetailsPage.css
    NewsletterPage.jsx
    NewsletterPage.css
  services/
    omdbApi.js
  styles/
    base.css
    layout.css
```

## Local setup

### 1 Install dependencies

```bash
npm install
```

### 2 Configure environment

Create `.env`:

```env
VITE_OMDB_API_KEY=your_real_key_here
VITE_OMDB_BASE_URL=https://www.omdbapi.com
```

Get a free OMDb key at: https://www.omdbapi.com/apikey.aspx

### 3 Run app

```bash
npm run dev
```

### 4 Build for production

```bash
npm run build
npm run preview
```

## Notes

- The project intentionally focuses on a clean front-end implementation for interview/demo purposes.
- Newsletter persistence is client-side only (`localStorage`).
- API key files are excluded from git via `.gitignore`.