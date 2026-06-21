import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import AnimatedGrid from '../components/animations/AnimatedGrid.jsx'
import AnimateText from '../components/animations/AnimateText.jsx'
import PageTransition from '../components/animations/PageTransition.jsx'
import Magnetic from '../components/animations/Magnetic.jsx'

// Spotlight Panel for Mission & Vision Section
function SpotlightPanel({ children, borderGlow = "rgba(255, 179, 71, 0.25)", bodyGlow = "rgba(255, 179, 71, 0.1)" }) {
  const panelRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const glowX = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 })
  const glowY = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 })

  const handleMouseMove = (e) => {
    if (!panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="relative rounded-2xl border border-gray-850 bg-gray-950/60 backdrop-blur-xl p-1 overflow-hidden shadow-xl select-none cursor-pointer flex-grow min-h-[280px]"
    >
      {/* Outer border spotlight glow */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: useTransform(
            [glowX, glowY],
            ([xVal, yVal]) => `radial-gradient(220px circle at ${xVal}px ${yVal}px, ${borderGlow}, transparent 80%)`
          ),
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
          zIndex: 0
        }}
        className="transition-opacity duration-300"
      />
      {/* Inner body spotlight glow */}
      <div
        className="absolute inset-[1.5px] rounded-2xl bg-gray-950/90 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: useTransform(
              [glowX, glowY],
              ([xVal, yVal]) => `radial-gradient(280px circle at ${xVal}px ${yVal}px, ${bodyGlow}, transparent 80%)`
            ),
            opacity: isHovered ? 1 : 0,
            pointerEvents: 'none',
            zIndex: 0
          }}
          className="transition-opacity duration-300"
        />
        <div className="relative z-10 p-6 flex flex-col justify-between h-full">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

// Team Member Card for About Page
function TeamMemberCard({ member, delay }) {
  const [isHovered, setIsHovered] = useState(false)

  const getGradient = (init) => {
    switch (init) {
      case "AG": return "from-[#ffb347] to-orange-600 shadow-[0_0_35px_rgba(255,179,71,0.25)]"
      case "AR": return "from-amber-400 to-[#ff9f1c] shadow-[0_0_35px_rgba(255,159,28,0.22)]"
      case "SB": return "from-orange-500 to-amber-600 shadow-[0_0_35px_rgba(255,179,71,0.2)]"
      case "SV": return "from-[#ffb347] to-amber-500 shadow-[0_0_35px_rgba(255,179,71,0.2)]"
      default: return "from-amber-400 to-orange-600"
    }
  }

  return (
    <Reveal delay={delay} variant="fade-up">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ y: isHovered ? -8 : 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="relative rounded-2xl border border-gray-850 bg-gray-950/70 p-6 flex flex-col items-center justify-between text-center overflow-hidden hover:border-amber-500/35 group transition-colors duration-500 shadow-xl h-[410px] select-none cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex flex-col items-center w-full">
          {/* Double rotating golden rings around image */}
          <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
            {/* Outer clockwise ring */}
            <div className="absolute inset-0 rounded-full border border-amber-500/20 scale-110 animate-[spin_10s_linear_infinite] pointer-events-none" />
            {/* Inner counter-clockwise ring */}
            <div className="absolute inset-0 rounded-full border border-[#ff9f1c]/15 scale-100 animate-[spin_16s_linear_infinite_reverse] pointer-events-none" />
            
            {/* Avatar core placeholder */}
            <motion.div
              animate={{ scale: isHovered ? 1.06 : 1 }}
              className={`w-26 h-26 rounded-full bg-gradient-to-br ${getGradient(member.initials)} flex items-center justify-center text-3xl font-black text-black z-10 shadow-[0_0_25px_rgba(255,179,71,0.25)] relative overflow-hidden`}
            >
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35)_0%,transparent_70%)]" />
                  <span className="relative z-10 bg-gradient-to-b from-black to-gray-900 bg-clip-text text-transparent">
                    {member.initials}
                  </span>
                </>
              )}
            </motion.div>
          </div>

          <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
            {member.role}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 px-2 mb-4 max-w-[240px]">
          {member.focus.map((tag) => (
            <span
              key={tag}
              className="text-[8px] font-mono text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md hover:text-white/80 hover:border-white/20 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* BOTTOM: Socials Container */}
        <div className="relative w-full z-10 shrink-0 border-t border-gray-900 pt-3 flex items-center justify-center">
          <div className="flex gap-4 justify-center items-center">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-500/10 flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-500/10 flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="LinkedIn"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

function About({ 
  aboutMigrated = true, 
  servicesMigrated = true, 
  projectsMigrated = true, 
  contactMigrated = true 
}) {
  const [coreHoveredIndex, setCoreHoveredIndex] = useState(null)

  const coreNodes = [
    { name: "AI", desc: "Agents & LLMs" },
    { name: "Frontend", desc: "React & Next" },
    { name: "Backend", desc: "Node & Python" },
    { name: "Product", desc: "Lean MVPs" },
    { name: "Architecture", desc: "Scalable Grids" },
    { name: "Design", desc: "Premium UI/UX" }
  ]

  const orbitRadius = 160
  const coreCoords = coreNodes.map((_, index) => {
    const angle = (index * 2 * Math.PI) / 6 - Math.PI / 2
    return {
      x: orbitRadius * Math.cos(angle),
      y: orbitRadius * Math.sin(angle)
    }
  })

  const milestones = [
    { year: "2025", title: "Tatva Labs Founded", desc: "Formed a core group of engineering nodes focused on custom product builds." },
    { year: "Q2 2025", title: "First Products Shipped", desc: "Validated features quickly for early startup clients with lean launchers." },
    { year: "Q4 2025", title: "10+ Projects Delivered", desc: "Shipped stable, production-ready systems utilized by active users." },
    { year: "2026", title: "AI Integration Expansion", desc: "Deployed integrated custom LLM agents and intelligent workspace automation." },
    { year: "Future", title: "Global Scaling & Growth", desc: "Expanding builder network grids globally to support high-throughput apps." }
  ]

  const team = [
    {
      name: "Awaneesh Gupta",
      role: "Full Stack Developer",
      initials: "AG",
      image: "assets/images/awaneesh.png",
      focus: ["Full Stack Engineering", "AI Integration", "Product Architecture"],
      github: "https://github.com/Awaneesh03",
      linkedin: "https://www.linkedin.com/in/awaneesh-gupta/"
    },
    {
      name: "Aareev",
      role: "Full Stack Developer",
      initials: "AR",
      image: "assets/images/aareev.jpg",
      focus: ["Full Stack Engineering", "Software Architecture", "Product Development"],
      github: "https://github.com/Aareevs",
      linkedin: "https://www.linkedin.com/in/aareev-srinivasan/"
    },
    {
      name: "Shubham Barik",
      role: "Full Stack Developer",
      initials: "SB",
      image: "assets/images/shubham.png",
      focus: ["Backend Systems", "Application Engineering", "Web Development"],
      github: "https://github.com/phoenixshubham07",
      linkedin: "https://www.linkedin.com/in/shubham-barik/"
    },
    {
      name: "Shivansh",
      role: "Marketing Lead",
      initials: "SV",
      image: "assets/images/shivansh.png",
      focus: ["Business Development", "Client Relations", "Brand Strategy", "Growth & Marketing"],
      linkedin: "https://www.linkedin.com/in/iamshivanshojha/"
    }
  ]

  const bgParticles = [
    { id: 1, top: "12%", left: "15%", size: 3, delay: 0 },
    { id: 2, top: "28%", left: "80%", size: 2, delay: 1.5 },
    { id: 3, top: "65%", left: "85%", size: 4, delay: 0.4 },
    { id: 4, top: "82%", left: "10%", size: 3, delay: 2.1 },
    { id: 5, top: "45%", left: "5%", size: 2.5, delay: 3.2 }
  ]

  return (
    <>
      <Navbar 
        aboutMigrated={aboutMigrated}
        servicesMigrated={servicesMigrated}
        projectsMigrated={projectsMigrated}
        contactMigrated={contactMigrated}
      />

      <PageTransition>
        {/* SECTION 1 - HERO */}
        <section className="relative pt-36 pb-24 bg-[#050505] overflow-hidden select-none" id="about-hero">
          
          {/* Background Animated Beams Grid */}
          <AnimatedGrid 
            gridSize={44}
            strokeColor="rgba(255, 179, 71, 0.03)"
            beamColor="#ff9f1c"
            beams={[
              { dir: 'h', pos: 2, delay: 1, duration: 7 },
              { dir: 'v', pos: 5, delay: 3, duration: 8 }
            ]}
          />

          {/* Large glowing amber radial bloom */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-gradient-to-r from-amber-500/10 via-[#ff9f1c]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

          {/* Soft diagonal cinematic light rays */}
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,179,71,0.02)_20%,transparent_50%,rgba(255,159,28,0.02)_80%)] pointer-events-none" />

          {/* Floating background particles */}
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
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 10 + p.id * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay
              }}
              className="pointer-events-none"
            />
          ))}

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <Reveal className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4" variant="scale-in">
              About Us
            </Reveal>
            
            <AnimateText 
              text="The People Behind Tatva Labs"
              accentWords={["Tatva", "Labs"]}
              accentClass="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent"
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
              delay={0.1}
            />

            <Reveal className="text-sm md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed" delay={3} variant="fade-in">
              <p>A team of builders, developers, and problem solvers passionate about creating scalable technology that delivers real-world value.</p>
            </Reveal>
          </div>
        </section>

        {/* SECTION 2 - OUR STORY */}
        <section className="py-24 bg-[#050505] relative overflow-hidden select-none border-t border-gray-900/40" id="company-story">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Column Story */}
              <Reveal className="flex flex-col items-start text-left" variant="fade-up">
                <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                  Built by Developers,<br />for <span className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent">Businesses</span>
                </h2>
                <p className="text-sm md:text-base text-white/50 leading-relaxed mb-4">
                  Tatva Labs is a software development firm focused on building modern digital products, custom web applications, and integrated AI systems.
                </p>
                <p className="text-sm md:text-base text-white/50 leading-relaxed mb-6">
                  We help startups and established brands transform ideas into production-ready platforms through design, clean engineering, and robust architecture.
                </p>

                {/* Metrics summarize panel */}
                <div className="grid grid-cols-3 gap-6 w-full pt-6 border-t border-gray-900 max-w-[480px]">
                  <div>
                    <h4 className="text-2xl font-black text-amber-400">2025</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Founded</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white">10+</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Projects</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white">20+</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Builders</p>
                  </div>
                </div>
              </Reveal>

              {/* Right Column Technology Core (Interactive orbital core) */}
              <div className="flex items-center justify-center relative w-[420px] h-[420px] mx-auto z-10">
                <style>{`
                  @keyframes coreLineDash {
                    to {
                      stroke-dashoffset: -30;
                    }
                  }
                  .animate-core-line-dash {
                    animation: coreLineDash 1s linear infinite;
                  }
                `}</style>

                {/* Circular orbit track line */}
                <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-[0.76]" />
                <div className="absolute inset-0 rounded-full border border-amber-500/5 pointer-events-none" />

                {/* Connecting active rays */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 420 420">
                  <defs>
                    <linearGradient id="coreBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffb347" stopOpacity="0.05" />
                      <stop offset="50%" stopColor="#ff9f1c" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ffb347" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="activeCoreBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffb347" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#ff9f1c" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ffb347" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  {coreCoords.map((coord, i) => {
                    const isHovered = coreHoveredIndex === i
                    return (
                      <line
                        key={i}
                        x1={210}
                        y1={210}
                        x2={210 + coord.x}
                        y2={210 + coord.y}
                        stroke={isHovered ? "url(#activeCoreBeam)" : "url(#coreBeam)"}
                        strokeWidth={isHovered ? "2" : "1"}
                        strokeDasharray="5 5"
                        className="animate-core-line-dash"
                      />
                    )
                  })}
                </svg>

                {/* Concentric rings pulsing */}
                <motion.div
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.35, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                  style={{ width: '130px', height: '130px' }}
                  className="absolute rounded-full border border-[#ffb347]/20 pointer-events-none z-1"
                />

                {/* Center Core Glowing Pentagon Reactor */}
                <motion.div
                  animate={{
                    scale: coreHoveredIndex !== null ? 1.10 : 1,
                    rotate: coreHoveredIndex !== null ? [-2, 2, -2] : [-1.5, 1.5, -1.5],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{
                    width: '130px',
                    height: '130px'
                  }}
                  className="absolute z-20 flex flex-col items-center justify-center select-none cursor-pointer"
                >
                  {/* Soft radial glow behind the pentagon */}
                  <div className="absolute inset-0 bg-[#E5A237]/15 rounded-full blur-2xl pointer-events-none scale-125" />
                  
                  {/* Pentagon SVG shape */}
                  <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_20px_rgba(248,194,92,0.35)]">
                    <defs>
                      <linearGradient id="reactorGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F8C25C" />
                        <stop offset="50%" stopColor="#E5A237" />
                        <stop offset="100%" stopColor="#B86D0A" />
                      </linearGradient>
                      <linearGradient id="borderGold" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#B86D0A" />
                        <stop offset="50%" stopColor="#F8C25C" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient id="glassSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="pentagonClip">
                        <path d="M 53.5 17.7 Q 60 13 66.5 17.7 L 101.1 42.9 Q 107.6 47.6 105.1 55.2 L 91.9 95.8 Q 89.4 103.5 81.4 103.5 L 38.6 103.5 Q 30.6 103.5 28.1 95.8 L 14.9 55.2 Q 12.5 47.6 18.9 42.9 Z" />
                      </clipPath>
                    </defs>

                    {/* Pentagon Base with Metallic Gradient */}
                    <path
                      d="M 53.5 17.7 Q 60 13 66.5 17.7 L 101.1 42.9 Q 107.6 47.6 105.1 55.2 L 91.9 95.8 Q 89.4 103.5 81.4 103.5 L 38.6 103.5 Q 30.6 103.5 28.1 95.8 L 14.9 55.2 Q 12.5 47.6 18.9 42.9 Z"
                      fill="url(#reactorGold)"
                    />

                    {/* Glass reflections & inner reactor grid lines */}
                    <g clipPath="url(#pentagonClip)">
                      <path d="M 0 0 L 120 0 L 120 50 Q 60 30 0 50 Z" fill="url(#glassSheen)" />
                      <circle cx="60" cy="63" r="42" fill="none" stroke="#78350f" strokeWidth="0.5" opacity="0.15" />
                      <circle cx="60" cy="63" r="28" fill="none" stroke="#78350f" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 2" />
                      <path d="M 60 13 L 60 103 M 12 63 L 108 63" stroke="#78350f" strokeWidth="0.5" opacity="0.1" strokeDasharray="3 3" />
                    </g>

                    {/* Thin animated border pulse path */}
                    <motion.path
                      d="M 53.5 17.7 Q 60 13 66.5 17.7 L 101.1 42.9 Q 107.6 47.6 105.1 55.2 L 91.9 95.8 Q 89.4 103.5 81.4 103.5 L 38.6 103.5 Q 30.6 103.5 28.1 95.8 L 14.9 55.2 Q 12.5 47.6 18.9 42.9 Z"
                      fill="none"
                      stroke="url(#borderGold)"
                      strokeWidth="1.5"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        strokeWidth: [1.2, 1.8, 1.2]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </svg>

                  {/* Inner Label details */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-30 pt-1">
                    <span className="text-[7.5px] font-mono text-black font-extrabold uppercase tracking-widest leading-none">TATVA LABS</span>
                    <span className="text-[8px] font-mono text-amber-950 font-black leading-tight uppercase tracking-wider mt-1 select-none">TECH CORE</span>
                  </div>
                </motion.div>

                {/* Orbiting nodes */}
                {coreNodes.map((node, i) => {
                  const coord = coreCoords[i]
                  const isHovered = coreHoveredIndex === i
                  
                  return (
                    <motion.div
                      key={i}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${coord.x}px - 36px)`,
                        top: `calc(50% + ${coord.y}px - 36px)`,
                        width: '72px',
                        height: '72px'
                      }}
                      animate={{
                        y: [0, -4, 0],
                        scale: isHovered ? 1.08 : 1
                      }}
                      transition={{
                        y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                        scale: { duration: 0.2 }
                      }}
                      onMouseEnter={() => setCoreHoveredIndex(i)}
                      onMouseLeave={() => setCoreHoveredIndex(null)}
                      className={`z-10 rounded-full border border-gray-850 bg-gray-950/80 backdrop-blur-xl flex flex-col items-center justify-center text-center p-2 transition-colors duration-500 cursor-pointer ${
                        isHovered ? 'border-amber-500/40 bg-gray-900/30' : 'hover:border-gray-800'
                      }`}
                    >
                      <h4 className="text-[9px] font-extrabold text-white">{node.name}</h4>
                      <p className="text-[7px] text-white/30 tracking-tight leading-none scale-[0.9] mt-0.5 select-none">{node.desc}</p>
                    </motion.div>
                  )
                })}
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3 - OUR JOURNEY */}
        <section className="py-24 bg-[#050505] relative overflow-hidden select-none border-t border-gray-900/40" id="our-journey">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header */}
            <Reveal className="text-center mb-20" variant="fade-up">
              <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4">
                Milestones
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Our <span className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
                Tracing the deployment timeline and growth coordinates of our software nodes.
              </p>
            </Reveal>

            {/* Timeline track container */}
            <div className="relative max-w-4xl mx-auto">
              
              {/* Vertical connector line */}
              <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-4 bottom-4 w-[1.5px] bg-gradient-to-b from-amber-500/10 via-[#ff9f1c]/35 to-amber-500/10 pointer-events-none z-0 shadow-[0_0_8px_rgba(255,159,28,0.2)]" />

              {/* Milestones map */}
              <div className="space-y-12">
                {milestones.map((ms, idx) => {
                  const isLeft = idx % 2 === 0
                  
                  return (
                    <div key={idx} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      
                      {/* Timeline dot */}
                      <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#ff9f1c] border-2 border-black z-10 shadow-[0_0_10px_#ffb347] top-6" />

                      {/* Content block wrapper */}
                      <div className={`col-span-1 lg:col-span-5 pl-10 lg:pl-0 ${
                        isLeft ? 'lg:col-start-1 lg:col-end-6 lg:text-right' : 'lg:col-start-7 lg:col-end-12'
                      }`}>
                        <Reveal delay={idx + 1} variant={isLeft ? "fade-up" : "fade-up"}>
                          <div className="relative p-6 rounded-xl border border-gray-850 bg-gray-950/50 backdrop-blur-xl hover:border-amber-500/25 transition-colors duration-300 shadow-md group">
                            
                            {/* Ambient inner soft highlight */}
                            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 via-amber-500/0 to-amber-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

                            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">{ms.year}</span>
                            <h4 className="text-base font-bold text-white mt-1.5 mb-2 group-hover:text-amber-400 transition-colors duration-300">
                              {ms.title}
                            </h4>
                            <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                              {ms.desc}
                            </p>
                          </div>
                        </Reveal>
                      </div>

                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4 - MISSION & VISION */}
        <section className="py-24 bg-[#050505] relative overflow-hidden select-none border-t border-gray-900/40" id="mission-vision">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header */}
            <Reveal className="text-center mb-16" variant="fade-up">
              <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Mission & <span className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent">Vision</span>
              </h2>
            </Reveal>

            {/* Premium Glass Panels with cursor spotlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Mission Panel */}
              <SpotlightPanel>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-400 flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Our Mission</h3>
                    <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-6">
                      Build stable digital architectures, resolve hard engineering bottlenecks, and establish a reliable long-term technological alliance with our clients.
                    </p>
                  </div>
                  
                  {/* Embedded metrics values */}
                  <div className="grid grid-cols-3 gap-4 border-t border-gray-900/60 pt-5">
                    <div>
                      <h5 className="text-sm font-bold text-white">20+</h5>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider mt-0.5">Builders</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">10+</h5>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider mt-0.5">Projects</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#ff9f1c]">3+</h5>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider mt-0.5">Engineers</p>
                    </div>
                  </div>
                </div>
              </SpotlightPanel>

              {/* Vision Panel */}
              <SpotlightPanel>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-400 flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Our Vision</h3>
                    <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-6">
                      To become the premium technological backbone for founders and companies who value execution speed, robust code quality, and active product support.
                    </p>
                  </div>
                  
                  {/* Embedded metrics values */}
                  <div className="grid grid-cols-3 gap-4 border-t border-gray-900/60 pt-5">
                    <div>
                      <h5 className="text-xs font-bold text-white">Global</h5>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider mt-1">Reach</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Future</h5>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider mt-1">Ready</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#ff9f1c]">100%</h5>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider mt-1">Product</p>
                    </div>
                  </div>
                </div>
              </SpotlightPanel>

            </div>
          </div>
        </section>

        {/* SECTION 5 - TEAM */}
        <section className="py-24 bg-[#050505] relative overflow-hidden select-none border-t border-gray-900/40" id="team">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header */}
            <Reveal className="text-center mb-16" variant="fade-up">
              <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Meet the <span className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent">Team</span>
              </h2>
              <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
                The engineers and builders designing and deploying high-performance apps.
              </p>
            </Reveal>

            {/* Team grid utilizing the dedicated about cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  member={member}
                  delay={index + 1}
                />
              ))}
            </div>

          </div>
        </section>
      </PageTransition>

      <Footer 
        aboutMigrated={aboutMigrated}
        servicesMigrated={servicesMigrated}
        projectsMigrated={projectsMigrated}
        contactMigrated={contactMigrated}
      />
    </>
  )
}

export default About
