import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Magnetic from './animations/Magnetic.jsx'

function RotatingProjectCard({ project, isActive, diff, onClick }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tilt (only enabled on active card for premium control)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 }
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouseMove = (e) => {
    if (!isActive || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(relativeX)
    mouseY.set(relativeY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  // Calculate dynamic 3D styles based on active distance (diff)
  const getStyles = () => {
    if (diff === 0) {
      return {
        x: "0%",
        scale: 1.05,
        rotateY: 0,
        zIndex: 10,
        opacity: 1,
        pointerEvents: "auto"
      }
    } else if (diff === -1) {
      return {
        x: "-105%",
        scale: 0.85,
        rotateY: 25,
        zIndex: 5,
        opacity: 0.45,
        pointerEvents: "auto"
      }
    } else if (diff === 1) {
      return {
        x: "105%",
        scale: 0.85,
        rotateY: -25,
        zIndex: 5,
        opacity: 0.45,
        pointerEvents: "auto"
      }
    } else {
      return {
        x: diff > 0 ? "200%" : "-200%",
        scale: 0.7,
        rotateY: 0,
        zIndex: 0,
        opacity: 0,
        pointerEvents: "none"
      }
    }
  }

  const currentStyle = getStyles()

  return (
    <motion.div
      ref={cardRef}
      animate={currentStyle}
      transition={{ type: "spring", stiffness: 100, damping: 18 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: 'absolute',
        width: '380px',
        height: '420px',
        transformStyle: 'preserve-3d',
        rotateX: isActive ? tiltX : 0,
        rotateY: isActive ? tiltY : currentStyle.rotateY,
      }}
      className={`rounded-2xl border bg-gray-950/80 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer select-none ${
        isActive 
          ? 'border-[#ffb347]/50 shadow-[0_0_50px_rgba(255,179,71,0.18)]' 
          : 'border-gray-850 hover:border-gray-700'
      }`}
    >
      {/* Background radial gradient glow for active card on hover */}
      <div className={`absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none transition-opacity duration-300 ${isActive && isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Project Image */}
      <div className="relative w-full h-[180px] overflow-hidden bg-gray-900 border-b border-gray-900/60 flex items-center justify-center shrink-0">
        <img
          src={project.img}
          alt={project.title}
          style={project.imgStyle || { objectFit: 'cover', width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
      </div>

      {/* Card Body */}
      <div className="p-6 flex-grow flex flex-col justify-between z-10">
        <div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs text-white/50 leading-relaxed line-clamp-3">
            {project.desc}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[9px] font-semibold text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-5 border-t border-gray-900 pt-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Visit Site
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-white/60 hover:text-white flex items-center gap-1.5 transition-colors duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedProjects({ projectsMigrated = true }) {
  const [activeIndex, setActiveIndex] = useState(1)

  const projects = [
    {
      title: "Campus Critique",
      desc: "A platform helping students explore and review college campuses with verified reviews and real placement data.",
      tags: ["Web App", "EdTech"],
      img: "assets/images/logo-campuscritique.png",
      imgStyle: { objectFit: 'contain', background: '#ffffff', padding: '16px', height: '100%', width: '100%' },
      live: "https://www.campuscritique.in/"
    },
    {
      title: "Motif",
      desc: "An AI-powered platform that helps founders validate startup ideas and turn concepts into fundable ventures.",
      tags: ["AI", "Startup Tools"],
      img: "assets/images/logo-motif.png",
      imgStyle: { objectFit: 'contain', background: '#ffffff', padding: '16px', height: '100%', width: '100%' },
      live: "https://motif-website-master.vercel.app/",
      github: "https://github.com/Awaneesh03/motif-website"
    },
    {
      title: "Vaani Setu",
      desc: "A web application for learning American Sign Language with interactive tutorials and real-time interpretation.",
      tags: ["TypeScript", "React"],
      img: "assets/images/vaani-setu-logo.jpg",
      imgStyle: { objectFit: 'cover', width: '100%', height: '100%' },
      live: "https://vaani-setu-website.vercel.app",
      github: "https://github.com/Aareevs/Vaani-Setu-Website"
    },
    {
      title: "AlgoClash",
      desc: "A competitive coding platform for algorithmic challenges, coding contests, and skill building.",
      tags: ["Programming", "Web App"],
      img: "assets/images/logo-algoclash.svg",
      imgStyle: { objectFit: 'cover', width: '100%', height: '100%' },
      live: "https://algoclash.com"
    },
    {
      title: "Syntrox",
      desc: "An AI governance and system observability platform for monitoring AI systems responsibly.",
      tags: ["AI Governance", "Observability"],
      img: "assets/images/logo-syntrox.png",
      imgStyle: { objectFit: 'contain', background: '#000000', padding: '16px', height: '100%', width: '100%' },
      live: "https://syntrox.io"
    },
    {
      title: "ATFRO",
      desc: "A business transformation platform for technology infrastructure, growth systems, and brand positioning.",
      tags: ["Consulting", "Business"],
      img: "assets/images/logo-atfro.png",
      imgStyle: { objectFit: 'contain', background: '#ffffff', padding: '16px', height: '100%', width: '100%' },
      live: "https://atfro.com/"
    }
  ]

  const bgParticles = [
    { id: 1, top: "20%", left: "12%", size: 3, delay: 0.2 },
    { id: 2, top: "75%", left: "80%", size: 3, delay: 0.8 },
    { id: 3, top: "10%", left: "85%", size: 2.5, delay: 1.4 },
    { id: 4, top: "85%", left: "15%", size: 4, delay: 0.1 },
    { id: 5, top: "50%", left: "92%", size: 2, delay: 2.5 }
  ]

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const getDiff = (idx) => {
    let diff = idx - activeIndex
    const L = projects.length
    if (diff < -L / 2) diff += L
    if (diff > L / 2) diff -= L
    return diff
  }

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden select-none" id="featured-projects">
      
      {/* Cinematic ambient background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating particles inside section */}
      {bgParticles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: '#ffb347',
            borderRadius: '50%',
            boxShadow: '0 0 10px #ff9f1c',
            opacity: 0.35,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 9 + p.id * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
          className="pointer-events-none"
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <Reveal className="text-center mb-12" variant="fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Featured <span className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            Real products we&apos;ve built and shipped for real-world impact.
          </p>
        </Reveal>

        {/* 1. DESKTOP ROTATING STAGE CAROUSEL */}
        <div className="hidden lg:flex flex-col items-center justify-center relative h-[520px] mt-8">
          
          {/* Stage Container */}
          <div
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-[800px] h-[420px] flex items-center justify-center"
          >
            {projects.map((project, index) => {
              const diff = getDiff(index)
              const isActive = index === activeIndex
              return (
                <RotatingProjectCard
                  key={index}
                  project={project}
                  isActive={isActive}
                  diff={diff}
                  onClick={() => setActiveIndex(index)}
                />
              )
            })}
          </div>

          {/* Slider Controls */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-800 bg-gray-950 text-white/70 hover:text-white hover:border-amber-500/50 flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-800 bg-gray-950 text-white/70 hover:text-white hover:border-amber-500/50 flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>

        {/* 2. MOBILE RESPONSIVE GRID */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 0.1} variant="fade-up">
              <div className="rounded-xl border border-gray-850 bg-gray-950/70 overflow-hidden flex flex-col justify-between hover:border-amber-500/30 group transition-all duration-300 shadow-lg h-full">
                <div className="relative w-full h-[160px] bg-gray-900 border-b border-gray-900 flex items-center justify-center">
                  <img
                    src={project.img}
                    alt={project.title}
                    style={project.imgStyle || { objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[8px] font-semibold text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-4 pt-3 border-t border-gray-900">
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Visit Site
                      </a>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-white/60 hover:text-white flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Reveal delay={1} variant="scale-in">
            <Magnetic strength={0.25}>
              {projectsMigrated ? (
                <Link to="/projects" className="inline-block px-6 py-3 rounded-full border border-gray-800 bg-gray-950 text-xs font-semibold text-white hover:border-amber-500/50 hover:bg-gray-900 transition-all duration-300 shadow-md" id="view-all-projects">
                  View All Projects
                </Link>
              ) : (
                <a href="projects.html" className="inline-block px-6 py-3 rounded-full border border-gray-800 bg-gray-950 text-xs font-semibold text-white hover:border-amber-500/50 hover:bg-gray-900 transition-all duration-300 shadow-md" id="view-all-projects">
                  View All Projects
                </a>
              )}
            </Magnetic>
          </Reveal>
        </div>

      </div>
    </section>
  )
}

export default FeaturedProjects
