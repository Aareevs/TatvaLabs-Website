import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const services = [
    {
      title: "Custom Web Development",
      desc: "Build scalable and modern web applications tailored to your requirements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      )
    },
    {
      title: "Full Stack Development",
      desc: "End-to-end product engineering from idea to production deployment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      )
    },
    {
      title: "AI Integration",
      desc: "Integrate custom intelligent agents, LLMs, and automations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22"/><path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93"/><path d="M8.56 13.68C5.29 14.84 3 17.46 3 20.5h18c0-3.04-2.29-5.66-5.56-6.82"/></svg>
      )
    },
    {
      title: "MVP Development",
      desc: "Validate features quickly with focused, lean startup launches.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      )
    },
    {
      title: "Technical Consulting",
      desc: "Architecture guidelines, stack audits, and scale strategy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      )
    },
    {
      title: "Product Engineering",
      desc: "Clean version control, testing pipelines, and robust infrastructure.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
      )
    }
  ]

  // Polar Coordinate Math for 6 orbiting nodes on desktop
  const radius = 270 // orbital radius in px
  const coords = services.map((_, index) => {
    const angle = (index * 2 * Math.PI) / 6 - Math.PI / 2 // starting from 12 o'clock
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    }
  })

  // Center sphere sizing
  const centerSize = 210

  // Orbiting particle streams around the sphere
  const particles = [
    { id: 1, speed: 1.4, radius: 135, size: 3 },
    { id: 2, speed: 2.0, radius: 150, size: 2.5 },
    { id: 3, speed: 0.9, radius: 125, size: 3.5 },
    { id: 4, speed: 1.7, radius: 165, size: 2 },
    { id: 5, speed: 2.4, radius: 140, size: 4 },
    { id: 6, speed: 1.1, radius: 175, size: 2.5 }
  ]

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden select-none" id="services">
      {/* Dynamic line dash animation styles */}
      <style>{`
        @keyframes lineDash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .animate-line-dash {
          animation: lineDash 1.2s linear infinite;
        }
      `}</style>

      {/* Ambient background soft glow behind layout */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-amber-500/5 via-[#ff9f1c]/3 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <Reveal className="text-center mb-16" variant="fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4">
            Ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Services We <span className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent">Offer</span>
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            An integrated technological node structure covering end-to-end development, custom AI systems, and scalable architecture.
          </p>
        </Reveal>

        {/* 1. DESKTOP INTERACTIVE ORBITAL VIEW (lg screens) */}
        <div className="hidden lg:flex items-center justify-center relative w-[700px] h-[700px] mx-auto mt-8">
          
          {/* Orbital path borders */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-[0.8]" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute inset-0 rounded-full border border-amber-500/5 pointer-events-none" 
          />
          
          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 700 700">
            <defs>
              <linearGradient id="glowBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb347" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#ff9f1c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffb347" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="activeGlowBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb347" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#ff9f1c" stopOpacity="1.0" />
                <stop offset="100%" stopColor="#ffb347" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            {coords.map((coord, i) => {
              const isHovered = hoveredIndex === i
              return (
                <motion.line
                  key={i}
                  x1={350}
                  y1={350}
                  x2={350 + coord.x}
                  y2={350 + coord.y}
                  stroke={isHovered ? "url(#activeGlowBeam)" : "url(#glowBeam)"}
                  strokeWidth={isHovered ? "3.0" : "1.5"}
                  strokeDasharray="6 6"
                  className="animate-line-dash"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              )
            })}
          </svg>

          {/* Floating particle streams rotating around centerpiece */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              animate={{ rotate: 360 }}
              transition={{ duration: 12 / p.speed, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                width: p.radius * 2,
                height: p.radius * 2,
                top: `calc(50% - ${p.radius}px)`,
                left: `calc(50% - ${p.radius}px)`,
              }}
              className="pointer-events-none"
            >
              <div
                style={{
                  width: p.size,
                  height: p.size,
                  background: '#ffb347',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #ff9f1c',
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                }}
              />
            </motion.div>
          ))}

          {/* Gyroscopic Atomic Orbit Rings (Rotating around centerpiece in 3D perspective) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: `${centerSize + 70}px`,
              height: `${centerSize + 70}px`,
              borderRadius: '50%',
              border: '1.5px dashed rgba(255, 179, 71, 0.15)',
              transform: 'rotateX(72deg) rotateY(15deg)',
              zIndex: 1
            }}
            className="pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              width: `${centerSize + 110}px`,
              height: `${centerSize + 110}px`,
              borderRadius: '50%',
              border: '1px dashed rgba(255, 159, 28, 0.1)',
              transform: 'rotateX(64deg) rotateY(-20deg)',
              zIndex: 1
            }}
            className="pointer-events-none"
          />

          {/* Concentric Light Heartbeat Ripple Waves (radiating from sphere) */}
          <motion.div
            animate={{
              scale: hoveredIndex !== null ? [1, 2.1] : [1, 1.7],
              opacity: hoveredIndex !== null ? [0.65, 0] : [0.4, 0]
            }}
            transition={{
              duration: hoveredIndex !== null ? 1.5 : 3.2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{ width: `${centerSize}px`, height: `${centerSize}px`, zIndex: 1 }}
            className="absolute rounded-full border border-[#ffb347]/30 pointer-events-none"
          />
          <motion.div
            animate={{
              scale: hoveredIndex !== null ? [1, 2.1] : [1, 1.7],
              opacity: hoveredIndex !== null ? [0.65, 0] : [0.4, 0]
            }}
            transition={{
              duration: hoveredIndex !== null ? 1.5 : 3.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: hoveredIndex !== null ? 0.75 : 1.6
            }}
            style={{ width: `${centerSize}px`, height: `${centerSize}px`, zIndex: 1 }}
            className="absolute rounded-full border border-[#ff9f1c]/20 pointer-events-none"
          />

          {/* SIGNATURE GOLDEN SPHERE (Visual Centerpiece) */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 110,
              damping: 14,
              scale: { duration: hoveredIndex !== null ? 1.5 : 4, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: hoveredIndex !== null ? 1.5 : 4, repeat: Infinity, ease: "easeInOut" }
            }}
            animate={{
              scale: hoveredIndex !== null ? [1.1, 1.15, 1.1] : [1, 1.05, 1],
              boxShadow: hoveredIndex !== null
                ? [
                    "0 0 110px rgba(255,159,28,0.55), inset 0 0 55px rgba(255,255,255,0.35)",
                    "0 0 135px rgba(255,159,28,0.75), inset 0 0 65px rgba(255,255,255,0.45)",
                    "0 0 110px rgba(255,159,28,0.55), inset 0 0 55px rgba(255,255,255,0.35)"
                  ]
                : [
                    "0 0 75px rgba(255,179,71,0.35), inset 0 0 35px rgba(255,255,255,0.18)",
                    "0 0 95px rgba(255,159,28,0.5), inset 0 0 45px rgba(255,255,255,0.25)",
                    "0 0 75px rgba(255,179,71,0.35), inset 0 0 35px rgba(255,255,255,0.18)"
                  ]
            }}
            style={{
              width: `${centerSize}px`,
              height: `${centerSize}px`,
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #ffb347 22%, #ff9f1c 55%, #78350f 100%)'
            }}
            className="absolute z-20 rounded-full flex flex-col items-center justify-center text-center overflow-hidden border border-white/20 select-none cursor-pointer"
          >
            {/* Glossy 3D Highlight Sheen overlay */}
            <div className="absolute top-[6px] left-[15px] w-[180px] h-[55px] bg-white/25 rounded-full blur-[1.5px] -rotate-[10deg] pointer-events-none z-10" />
            <div className="absolute bottom-[6px] right-[15px] w-[110px] h-[25px] bg-white/10 rounded-full blur-[3px] rotate-[20deg] pointer-events-none z-10" />

            {/* Ambient occlusion inner outline edge lighting */}
            <div className="absolute inset-[1px] rounded-full border border-white/10 pointer-events-none z-10" />

            {/* Title text */}
            <span className="text-[10px] font-mono text-black font-extrabold uppercase tracking-[0.25em] mb-1 select-none z-10">
              Tatva Labs
            </span>
            <h3 className="text-[13px] font-black text-white leading-tight uppercase tracking-widest max-w-[130px] select-none z-10">
              Services We Offer
            </h3>
          </motion.div>

          {/* Orbiting Circular Glass Nodes */}
          {services.map((svc, i) => {
            const coord = coords[i]
            const floatDelay = i * 0.5
            const isHovered = hoveredIndex === i
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${coord.x}px - 110px)`, // offset by half card size (110px)
                  top: `calc(50% + ${coord.y}px - 110px)`, // offset by half card size (110px)
                  width: '220px',
                  height: '220px'
                }}
                animate={{
                  y: [0, -8, 0],
                  scale: isHovered ? 1.08 : 1,
                  boxShadow: isHovered 
                    ? "0 0 35px rgba(255,159,28,0.25)" 
                    : "0 10px 30px rgba(0,0,0,0.5)"
                }}
                transition={{
                  delay: 0.4 + i * 0.12,
                  type: 'spring',
                  stiffness: 90,
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
                  scale: { type: 'spring', stiffness: 200, damping: 15 },
                  boxShadow: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`z-10 rounded-full border border-gray-850 bg-gray-950/75 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6 transition-colors duration-500 cursor-pointer ${
                  isHovered ? 'border-amber-500/40 bg-gray-900/40' : 'hover:border-gray-800'
                }`}
              >
                {/* Inner radial backdrop glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className={`w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 border border-amber-500/15 transition-all duration-300 ${
                  isHovered ? 'scale-105 bg-amber-500/20 text-amber-300' : ''
                }`}>
                  {svc.icon}
                </div>
                
                <h4 className="text-xs font-bold text-white mb-1 px-1 transition-colors duration-300 leading-snug">
                  {svc.title}
                </h4>
                
                <p className="text-[10px] text-white/40 leading-relaxed px-2 max-w-[170px] select-none">
                  {svc.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* 2. MOBILE SCROLL VIEW (sm/md screens) */}
        {/* Keep the central sphere visual at the top, and stack service cards below it */}
        <div className="lg:hidden flex flex-col items-center gap-10 mt-10">
          
          {/* Mobile Central Sphere (Ray-traced style) */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              scale: [1, 1.04, 1],
              boxShadow: [
                "0 0 60px rgba(255,179,71,0.35), inset 0 0 30px rgba(255,255,255,0.15)",
                "0 0 80px rgba(255,159,28,0.5), inset 0 0 40px rgba(255,255,255,0.22)",
                "0 0 60px rgba(255,179,71,0.35), inset 0 0 30px rgba(255,255,255,0.15)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ 
              width: '160px', 
              height: '160px',
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #ffb347 22%, #ff9f1c 55%, #78350f 100%)'
            }}
            className="rounded-full flex flex-col items-center justify-center text-center overflow-hidden border border-white/20 select-none shadow-lg relative shrink-0"
          >
            <div className="absolute top-[5px] left-[12px] w-[130px] h-[38px] bg-white/20 rounded-full blur-[1px] -rotate-[10deg] pointer-events-none z-10" />
            <div className="absolute inset-[1px] rounded-full border border-white/10 pointer-events-none z-10" />
            
            <span className="text-[8px] font-mono text-black font-extrabold uppercase tracking-widest mb-0.5 z-10">Tatva Labs</span>
            <h3 className="text-[11px] font-black text-white leading-tight uppercase tracking-widest max-w-[100px] z-10">Services</h3>
          </motion.div>

          {/* Stacked nodes below central sphere */}
          <div className="flex flex-col gap-4 w-full max-w-[420px]">
            {services.map((svc, i) => (
              <Reveal key={i} delay={i * 0.08} variant="fade-up">
                <div className="relative overflow-hidden rounded-xl border border-gray-850 bg-gray-950/70 p-5 flex items-start gap-4 hover:border-amber-500/35 transition-colors duration-300 shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-[#ffb347]/15 shrink-0">
                    {svc.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1 transition-colors duration-300">{svc.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default ServicesSection
