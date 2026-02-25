import { NavLink, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  function handleHomeClick(event) {
    event.preventDefault()
    navigate('/', {
      state: { resetHomeAt: Date.now() },
    })
  }

  const isHomeActive = location.pathname === '/'

  return (
    <header className="top-bar">
      <h1>Mini IMDb</h1>
      <nav className="main-nav" aria-label="Primary navigation">
        <a
          href="/"
          onClick={handleHomeClick}
          className={`main-nav__link ${isHomeActive ? 'main-nav__link--active' : ''}`}
        >
          Home
        </a>
        <NavLink
          to="/newsletter"
          className={({ isActive }) =>
            `main-nav__link ${isActive ? 'main-nav__link--active' : ''}`
          }
        >
          Newsletter
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar