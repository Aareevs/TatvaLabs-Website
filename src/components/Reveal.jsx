import { motion } from 'framer-motion'

function Reveal({ 
  children, 
  delay = 0, 
  className = '', 
  as = 'div',
  variant = 'fade-up', // options: 'fade-up', 'fade-down', 'fade-in', 'scale-in'
  duration = 0.6
}) {
  const MotionComponent = motion[as] || motion.div

  const animationVariants = {
    hidden: {
      opacity: 0,
      y: variant === 'fade-up' ? 30 : variant === 'fade-down' ? -30 : 0,
      scale: variant === 'scale-in' ? 0.96 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 15,
        duration: duration,
        delay: delay * 0.1,
      }
    }
  }

  // We keep standard classes for compatibility, but the animation is handled by framer-motion.
  // Note: we remove opacity reset from base.css since framer-motion governs opacity
  const cleanClassName = className.replace(/\breveal\b/, '').trim()

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      variants={animationVariants}
      className={cleanClassName}
    >
      {children}
    </MotionComponent>
  )
}

export default Reveal
