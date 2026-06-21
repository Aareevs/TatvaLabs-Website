import { useState } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

function SpotlightCard({ 
  children, 
  className = '', 
  id = '', 
  glowColor = 'rgba(194, 120, 58, 0.18)', 
  borderColor = 'rgba(194, 120, 58, 0.35)',
  style = {}
}) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth cursor lag follow effect
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  // Create radial gradient templates driven by spring motion values
  const spotlightGlow = useMotionTemplate`radial-gradient(350px circle at ${x}px ${y}px, ${glowColor}, transparent 80%)`
  const borderGlow = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, ${borderColor}, transparent 80%)`

  return (
    <div
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card-wrapper ${className}`}
      style={{
        position: 'relative',
        borderRadius: 'inherit', // inherits from whatever card styles are in our CSS
        padding: '1px', // creates the 1px border gutter
        background: 'rgba(154, 149, 144, 0.12)', // fallback card border color
        overflow: 'hidden',
        transition: 'background var(--duration-fast) ease',
        ...style
      }}
    >
      {/* Border Spotlight Glow */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: borderGlow,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity var(--duration-normal) ease',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Card Content Container */}
      <div
        className="spotlight-card-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'var(--color-bg-card)',
          borderRadius: 'inherit',
          overflow: 'hidden',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Background Spotlight Glow */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: spotlightGlow,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity var(--duration-normal) ease',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Card Body */}
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default SpotlightCard
