import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function Magnetic({ children, strength = 0.35, scaleOnHover = 1.03 }) {
  const ref = useRef(null)
  
  // Create motion values for translation offsets
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Configure high-frequency responsive spring parameters
  const springConfig = { type: 'spring', stiffness: 180, damping: 15, mass: 0.15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    
    // Calculate elements center coordinates
    const centerX = left + width / 2
    const centerY = top + height / 2

    // Get cursor offset relative to center
    const offsetX = clientX - centerX
    const offsetY = clientY - centerY

    // Pull translation to a percentage of cursor offset
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        x: springX, 
        y: springY, 
        display: 'inline-block',
        position: 'relative'
      }}
      whileHover={{ scale: scaleOnHover }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

export default Magnetic
