import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'

function HexagonCard({ children, delay, status, title, icon }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for coordinates
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring animations for tilt
  const springConfig = { damping: 20, stiffness: 120, mass: 0.5 }
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig)
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig)

  // Spring animations for spotlight glow coordinates
  const glowX = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 })
  const glowY = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    
    // Normalize coordinates relative to card center [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(relativeX)
    mouseY.set(relativeY)

    // Set absolute glow coordinate position
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const hexClipStyle = {
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
  }

  return (
    <Reveal delay={delay} variant="scale-in">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
        className="relative w-[300px] h-[340px] mx-auto cursor-pointer group transition-all duration-300 select-none"
      >
        {/* Ambient background shadow glow */}
        <div className="absolute inset-0 bg-amber-500/5 blur-2xl rounded-full scale-75 group-hover:bg-amber-500/10 group-hover:scale-90 transition-all duration-500 pointer-events-none" />

        {/* Outer Hexagon (Glow border container) */}
        <div
          style={hexClipStyle}
          className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900/60 p-[1.5px] group-hover:from-[#ffb347] group-hover:via-[#ff9f1c]/40 group-hover:to-[#ffb347]/10 transition-all duration-500"
        >
          {/* Inner Hexagon (Dark body glass) */}
          <div
            style={hexClipStyle}
            className="w-full h-full bg-gray-950/90 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between p-6 px-8 py-10"
          >
            {/* Dynamic Spotlight radial glow over card body */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: useTransform(
                  [glowX, glowY],
                  ([xVal, yVal]) => `radial-gradient(150px circle at ${xVal}px ${yVal}px, rgba(255, 179, 71, 0.12), transparent 75%)`
                ),
                opacity: isHovered ? 1 : 0,
                pointerEvents: 'none',
                zIndex: 0
              }}
              className="transition-opacity duration-300"
            />

            {/* TOP AREA (Triangular region safe space) */}
            <div className="flex flex-col items-center z-10">
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-400 flex items-center justify-center mb-2 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300">
                {icon}
              </div>
              <span className="text-[9px] font-mono text-amber-400 font-bold tracking-widest uppercase">
                {status}
              </span>
            </div>

            {/* MIDDLE AREA (Safe rectangular center) */}
            <div className="text-center z-10 flex flex-col justify-center flex-grow py-3">
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                {title}
              </h4>
              {children}
            </div>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

function WhyUs() {
  const bgParticles = [
    { id: 1, top: "15%", left: "10%", size: 3, delay: 0 },
    { id: 2, top: "30%", left: "85%", size: 2.5, delay: 1.2 },
    { id: 3, top: "65%", left: "90%", size: 4, delay: 0.4 },
    { id: 4, top: "75%", left: "15%", size: 3, delay: 2.0 },
    { id: 5, top: "45%", left: "8%", size: 2, delay: 2.8 },
    { id: 6, top: "80%", left: "50%", size: 3, delay: 1.5 }
  ]

  const cards = [
    {
      title: "Modern Tech Stack",
      status: "SYSTEM: ACTIVE",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      ),
      content: (
        <div className="flex flex-col items-center">
          <p className="text-[11px] text-white/50 leading-relaxed mb-4">
            React, Next.js, Node.js, Python, PostgreSQL — clean architecture without unnecessary overhead.
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-[200px]">
            {["React", "Next.js", "Python", "PostgreSQL"].map((tech) => (
              <span key={tech} className="text-[8px] font-mono bg-white/5 border border-white/10 text-white/70 px-2 py-0.5 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Fast Execution",
      status: "VELOCITY: 98%",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      ),
      content: (
        <div className="flex flex-col items-center">
          <p className="text-[11px] text-white/50 leading-relaxed mb-3">
            Small focused core team. Zero latency in communications, fast sprints, and weekly feedback reviews.
          </p>
          <div className="w-24 h-6 border-b border-white/10 flex items-end">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <path
                d="M0,25 Q15,20 30,22 T60,10 T85,15 T100,2"
                fill="none"
                stroke="#ff9f1c"
                strokeWidth="1.5"
              />
              <circle cx="100" cy="2" r="2.5" fill="#ffb347" className="animate-ping" />
              <circle cx="100" cy="2" r="2" fill="#ff9f1c" />
            </svg>
          </div>
        </div>
      )
    },
    {
      title: "Startup Mindset",
      status: "BUDGET: OPTIMIZED",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
      ),
      content: (
        <div className="flex flex-col items-center">
          <p className="text-[11px] text-white/50 leading-relaxed mb-3">
            We understand tight limits. We optimize features to validate MVP assumptions quickly and scale cleanly.
          </p>
          <div className="w-full flex items-center justify-between gap-2 max-w-[180px]">
            <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
              <div className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] h-full w-[80%] rounded-full" />
            </div>
            <span className="text-[9px] font-mono text-white/40">Efficiency</span>
          </div>
        </div>
      )
    },
    {
      title: "Clean Engineering",
      status: "PIPELINE: SUCCESS",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      ),
      content: (
        <div className="flex flex-col items-center">
          <p className="text-[11px] text-white/50 leading-relaxed mb-3">
            CI/CD delivery pipeline, comprehensive tests, clean version logs, and systematic automated deployment steps.
          </p>
          <div className="flex gap-2">
            <span className="text-[8px] font-mono text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded">
              ✓ BUILD PASS
            </span>
            <span className="text-[8px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              ✓ COV 100%
            </span>
          </div>
        </div>
      )
    },
    {
      title: "Active Partnership",
      status: "ENGAGEMENT: STABLE",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
      content: (
        <div className="flex flex-col items-center">
          <p className="text-[11px] text-white/50 leading-relaxed mb-3">
            We stick around. From launch, bug fixing, analytics integration to future core enhancements.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[9px] font-mono text-white/60">Uptime: 99.9%</span>
          </div>
        </div>
      )
    },
    {
      title: "Shipped Experience",
      status: "DEPLOYMENTS: 10+",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      ),
      content: (
        <div className="flex flex-col items-center">
          <p className="text-[11px] text-white/50 leading-relaxed mb-3">
            Production grade deployments used by real users daily. High throughput and bulletproof setups.
          </p>
          <div className="flex gap-1.5 justify-center">
            {["E-com", "SaaS", "FinTech"].map((v) => (
              <span key={v} className="text-[8px] font-mono text-white/40 border border-white/5 bg-white/5 px-2 py-0.5 rounded">
                {v}
              </span>
            ))}
          </div>
        </div>
      )
    }
  ]

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden select-none" id="why-us">
      
      {/* Cinematic ambient background glow */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-orange-500/3 rounded-full blur-[130px] pointer-events-none" />

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
        <Reveal className="text-center mb-16" variant="fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4">
            Why Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Why Choose <span className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent">Tatva Labs</span>
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            Backed by a growing network of builders, modern standards, and focused execution pipelines.
          </p>
        </Reveal>

        {/* Honeycomb grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 lg:gap-y-6 gap-x-6 justify-center items-center max-w-[1000px] mx-auto">
          {cards.map((card, index) => {
            let staggeredClass = ""
            if (index === 1 || index === 4) {
              staggeredClass = "lg:translate-y-8"
            }
            return (
              <div key={index} className={`${staggeredClass} py-2`}>
                <HexagonCard
                  delay={index + 1}
                  status={card.status}
                  title={card.title}
                  icon={card.icon}
                >
                  {card.content}
                </HexagonCard>
              </div>
            )
          })}
        </div>

        {/* Safety spacing */}
        <div className="hidden lg:block h-10" />

      </div>
    </section>
  )
}

export default WhyUs
