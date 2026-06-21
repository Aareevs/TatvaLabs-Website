import { motion } from 'framer-motion'

function AnimatedGrid({ 
  gridSize = 40, 
  strokeColor = 'rgba(154, 149, 144, 0.04)', 
  beamColor = '#c2783a', 
  beams = [
    { dir: 'h', pos: 4, delay: 0, duration: 6 },
    { dir: 'v', pos: 6, delay: 2, duration: 7 },
    { dir: 'h', pos: 10, delay: 4, duration: 8 },
    { dir: 'v', pos: 15, delay: 1, duration: 5 }
  ]
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <svg width="100%" height="100%" style={{ opacity: 0.9 }}>
        <defs>
          <pattern 
            id="coord-grid" 
            width={gridSize} 
            height={gridSize} 
            patternUnits="userSpaceOnUse"
          >
            <path 
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} 
              fill="none" 
              stroke={strokeColor} 
              strokeWidth="1" 
            />
          </pattern>
          {/* Glowing linear gradient for light pulses */}
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={beamColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Base Grid Layer */}
        <rect width="100%" height="100%" fill="url(#coord-grid)" />

        {/* Animated Light Pulse Beams */}
        {beams.map((beam, index) => {
          const isHorizontal = beam.dir === 'h'
          const lineCoordinate = beam.pos * gridSize

          // Render paths stretching past standard screens (up to 3000px)
          const dPath = isHorizontal 
            ? `M 0,${lineCoordinate} H 3000` 
            : `M ${lineCoordinate},0 V 3000`

          return (
            <motion.path
              key={index}
              d={dPath}
              stroke="url(#beam-grad)"
              strokeWidth="2"
              fill="none"
              initial={{ 
                strokeDashoffset: 1200, 
                strokeDasharray: "150 450" 
              }}
              animate={{ 
                strokeDashoffset: -1200 
              }}
              transition={{
                repeat: Infinity,
                duration: beam.duration,
                delay: beam.delay,
                ease: "linear"
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default AnimatedGrid
