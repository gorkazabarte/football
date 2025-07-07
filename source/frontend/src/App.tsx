import { useState, useEffect } from 'react'
import './index.css'
import About from './components/About'
import Contact from './components/Contact'
import Countries from './components/Countries'
import Players from './components/Players'
import { Sun, Moon } from 'lucide-react'

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

  // Close menu on link click AND smooth scroll
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      // scroll-margin-top needs to be set on target sections to offset fixed nav height
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left: Name */}
            <a href="#about" className="text-xl font-bold text-gray-950 dark:text-white transition-colors duration-200" onClick={(e) => handleNavLinkClick(e, 'about')}>
              FIA
            </a>

            {/* Right: Navigation + Dark mode + Mobile menu */}
            <div className="flex items-center space-x-8">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {['about', 'countries', 'players', 'contact'].map((id) => (
                  <a key={id} href={`#${id}`} onClick={(e) => handleNavLinkClick(e, id)} className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200">
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                ))}
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                {['about', 'countries', 'players', 'contact'].map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200"
                    onClick={(e) => handleNavLinkClick(e, id)}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content with padding-top for fixed nav */}
      <main className="pt-20">
        <About />
        <Countries />
        <Players />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300 transition-colors duration-200">
          <p>&copy; {new Date().getFullYear()} - Football International Agency</p>
        </div>
      </footer>
    </div>
  )
}

export default App
