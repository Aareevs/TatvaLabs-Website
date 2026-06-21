import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ 
  aboutMigrated = true, 
  servicesMigrated = true, 
  projectsMigrated = true, 
  contactMigrated = true 
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen)
  }

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path || (path === '/' && location.pathname === '/index.html')
  }

  // Icons from SaaS Template
  const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )

  const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )

  return (
    <header className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${scrolled ? 'border-gray-800/80 bg-black/90 backdrop-blur-md shadow-lg' : 'border-transparent bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Branding Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-white" id="nav-logo" onClick={closeMobileMenu}>
          tatva<span className="text-amber-500 font-medium">labs</span>
        </Link>
        
        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm transition-colors ${isActive('/') ? 'text-white font-medium' : 'text-white/60 hover:text-white'}`} id="nav-home">
            Home
          </Link>
          
          {aboutMigrated ? (
            <Link to="/about" className={`text-sm transition-colors ${isActive('/about') ? 'text-white font-medium' : 'text-white/60 hover:text-white'}`} id="nav-about">
              About
            </Link>
          ) : (
            <a href="about.html" className="text-sm text-white/60 hover:text-white transition-colors" id="nav-about">
              About
            </a>
          )}

          {servicesMigrated ? (
            <Link to="/services" className={`text-sm transition-colors ${isActive('/services') ? 'text-white font-medium' : 'text-white/60 hover:text-white'}`} id="nav-services">
              Services
            </Link>
          ) : (
            <a href="services.html" className="text-sm text-white/60 hover:text-white transition-colors" id="nav-services">
              Services
            </a>
          )}

          {projectsMigrated ? (
            <Link to="/projects" className={`text-sm transition-colors ${isActive('/projects') ? 'text-white font-medium' : 'text-white/60 hover:text-white'}`} id="nav-projects">
              Projects
            </Link>
          ) : (
            <a href="projects.html" className="text-sm text-white/60 hover:text-white transition-colors" id="nav-projects">
              Projects
            </a>
          )}
        </div>

        {/* CTA Button (Desktop) */}
        <div className="hidden md:flex items-center">
          {contactMigrated ? (
            <Link to="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors bg-white text-black hover:bg-gray-100 h-9 px-4" id="nav-contact">
              Contact Us
            </Link>
          ) : (
            <a href="contact.html" className="inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors bg-white text-black hover:bg-gray-100 h-9 px-4" id="nav-contact">
              Contact Us
            </a>
          )}
        </div>

        {/* Hamburger (Mobile Toggle) */}
        <button
          type="button"
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          id="nav-toggle"
        >
          {mobileOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800/50 transition-all duration-300">
          <div className="px-6 py-6 flex flex-col gap-4">
            <Link
              to="/"
              className={`text-base py-2 transition-colors ${isActive('/') ? 'text-white font-medium' : 'text-white/60'}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            
            {aboutMigrated ? (
              <Link
                to="/about"
                className={`text-base py-2 transition-colors ${isActive('/about') ? 'text-white font-medium' : 'text-white/60'}`}
                onClick={closeMobileMenu}
              >
                About
              </Link>
            ) : (
              <a
                href="about.html"
                className="text-base py-2 text-white/60"
                onClick={closeMobileMenu}
              >
                About
              </a>
            )}

            {servicesMigrated ? (
              <Link
                to="/services"
                className={`text-base py-2 transition-colors ${isActive('/services') ? 'text-white font-medium' : 'text-white/60'}`}
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            ) : (
              <a
                href="services.html"
                className="text-base py-2 text-white/60"
                onClick={closeMobileMenu}
              >
                Services
              </a>
            )}

            {projectsMigrated ? (
              <Link
                to="/projects"
                className={`text-base py-2 transition-colors ${isActive('/projects') ? 'text-white font-medium' : 'text-white/60'}`}
                onClick={closeMobileMenu}
              >
                Projects
              </Link>
            ) : (
              <a
                href="projects.html"
                className="text-base py-2 text-white/60"
                onClick={closeMobileMenu}
              >
                Projects
              </a>
            )}

            <div className="pt-4 border-t border-gray-800/50">
              {contactMigrated ? (
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors bg-white text-black hover:bg-gray-100 h-10 px-4"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </Link>
              ) : (
                <a
                  href="contact.html"
                  className="w-full inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors bg-white text-black hover:bg-gray-100 h-10 px-4"
                  onClick={closeMobileMenu}
                >
                  Contact Us
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
