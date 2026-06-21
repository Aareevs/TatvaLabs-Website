import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'

function AnimatedRoutes() {
  const location = useLocation()

  const migrationState = {
    aboutMigrated: true,
    servicesMigrated: true,
    projectsMigrated: true,
    contactMigrated: true
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={<Home {...migrationState} />} 
        />
        <Route 
          path="/index.html" 
          element={<Home {...migrationState} />} 
        />
        <Route 
          path="/about" 
          element={<About {...migrationState} />} 
        />
        <Route 
          path="/about.html" 
          element={<About {...migrationState} />} 
        />
        <Route 
          path="/services" 
          element={<Services {...migrationState} />} 
        />
        <Route 
          path="/services.html" 
          element={<Services {...migrationState} />} 
        />
        <Route 
          path="/projects" 
          element={<Projects {...migrationState} />} 
        />
        <Route 
          path="/projects.html" 
          element={<Projects {...migrationState} />} 
        />
        <Route 
          path="/contact" 
          element={<Contact {...migrationState} />} 
        />
        <Route 
          path="/contact.html" 
          element={<Contact {...migrationState} />} 
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App
