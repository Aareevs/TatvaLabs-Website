import { motion } from 'framer-motion'

function AnimateText({ 
  text, 
  className = '', 
  as: Component = 'h1', 
  delay = 0,
  accentWords = [],
  accentClass = 'text-gradient'
}) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      }
    }
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(5px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
      }
    }
  }

  return (
    <Component className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        style={{ display: 'inline' }}
      >
        {words.map((word, index) => {
          // Strip punctuation to check matching accent words
          const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
          const isAccent = accentWords.some(acc => acc.toLowerCase() === cleanWord.toLowerCase())

          return (
            <motion.span
              key={index}
              variants={wordVariants}
              className={isAccent ? accentClass : ''}
              style={{ 
                display: 'inline-block', 
                whiteSpace: 'pre',
                marginRight: '0.24em'
              }}
            >
              {word}
            </motion.span>
          )
        })}
      </motion.span>
    </Component>
  )
}

export default AnimateText
