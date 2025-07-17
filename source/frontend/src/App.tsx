import { Sun, Moon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './index.css'

import About from './components/About'
import AddCoach from './components/AddCoach'
import AddPlayer from './components/AddPlayer'
import AddTeam from './components/AddTeam'
import Coach from './components/Coach'
import Contact from './components/Contact'
import Players from './components/Players'
import Schools from './components/Schools'
import Universities from './components/Universities'
import UniversityDetails from './components/UniversityDetails'
//import Countries from './components/Countries'

function ScrollSections() {
  return (
    <>
      <About />
      <Schools />
      <Universities />
      <Players />
      <Coach />
      <Contact />
    </>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode')
      if (stored !== null) return stored === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [isDarkMode])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev)


  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left: Name */}
            <Link to="/" className="text-xl font-bold text-gray-950 dark:text-white transition-colors duration-200">
              FIA
            </Link>

            {/* Right: Navigation + Dark mode + Mobile menu */}
            <div className="flex items-center space-x-8">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {isHomePage &&
                  ['about', 'universities', 'schools', 'players', 'coach', 'contact'].map((id) => (
                    <a key={id} href={`#${id}`} onClick={(e) => handleNavLinkClick(e, id)} className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200">
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </a>
                  ))}
                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">
                      Database ▾
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
                        <Link to="/add-player" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                          ➕ Add Player
                        </Link>
                        <Link to="/add-team" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                          🏟️ Add Team
                        </Link>
                        <Link to="/add-coach" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200">
                          👔 Add Coach
                        </Link>
                      </div>
                    )}
                </div>
              </div>

              {/* Dark mode toggle */}
              <button onClick={toggleDarkMode} className="p-2 rounded-lg text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200" aria-label="Toggle dark mode">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile menu button */}
              <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200" aria-label="Toggle menu">
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (<path d="M6 18L18 6M6 6l12 12" />) : (<path d="M4 6h16M4 12h16M4 18h16" />)}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                {isHomePage &&
                 ['about', 'universities', 'schools', 'players', 'coach', 'contact'].map((id) => (
                    <a key={id} href={`#${id}`} className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200" onClick={(e) => handleNavLinkClick(e, id)}>
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </a>
                  ))}
                 <Link to="/add-player" className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200">Add Player</Link>
                 <Link to="/add-team" className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200">Add Team</Link>
                 <Link to="/add-coach" className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200">Add Coach</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content with padding-top for fixed nav */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<ScrollSections />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/add-team" element={<AddTeam />} />
          <Route path="/add-coach" element={<AddCoach />} />
          <Route path="/university/:name" element={<UniversityDetails />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300 transition-colors duration-200">
          <p>&copy; {new Date().getFullYear()} - Football Intelligence Agency 7</p>
        </div>
      </footer>
    </div>
  )
}

export default App
