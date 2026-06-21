import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Magnetic from './animations/Magnetic.jsx'
import AnimatedGrid from './animations/AnimatedGrid.jsx'

function CTASection({ contactMigrated = true }) {
  const bgParticles = [
    { id: 1, top: "10%", left: "15%", size: 3, delay: 0 },
    { id: 2, top: "80%", left: "80%", size: 2.5, delay: 1.5 },
    { id: 3, top: "35%", left: "85%", size: 4, delay: 0.5 },
    { id: 4, top: "70%", left: "10%", size: 3, delay: 2.2 }
  ]

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden select-none" id="home-cta">
      
      {/* Cinematic ambient background glow */}
      <motion.div 
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/5 via-orange-500/3 to-transparent rounded-full blur-[140px] pointer-events-none" 
      />

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
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 8 + p.id * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
          className="pointer-events-none"
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal variant="scale-in">
          {/* Main Glass Panel */}
          <div className="relative rounded-3xl border border-gray-850 bg-gray-950/40 backdrop-blur-xl p-10 md:p-16 text-center overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[380px]">
            
            {/* Background Beams and Grid Layer */}
            <AnimatedGrid 
              gridSize={36} 
              strokeColor="rgba(255, 179, 71, 0.03)" 
              beamColor="#ff9f1c"
              beams={[
                { dir: 'h', pos: 2, delay: 1, duration: 6 },
                { dir: 'v', pos: 5, delay: 3, duration: 7 },
                { dir: 'h', pos: 8, delay: 0.5, duration: 8 }
              ]}
            />

            {/* Concentric vector accent lines pulsing slowly */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="absolute rounded-full border border-[#ffb347]/5 w-[360px] h-[360px] animate-pulse" />
              <div className="absolute rounded-full border border-[#ff9f1c]/5 w-[580px] h-[580px] animate-[pulse_4s_infinite_1.5s]" />
              <div className="absolute rounded-full border border-[#ffb347]/5 w-[800px] h-[800px] animate-[pulse_5s_infinite_3s]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-2xl flex flex-col items-center">
              <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-5">
                Collaboration
              </span>
              
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
                Let&apos;s Build Something <span className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent">Meaningful</span> Together
              </h2>
              
              <p className="text-sm md:text-base text-white/50 mb-8 max-w-lg leading-relaxed">
                Have an idea? Let&apos;s talk about turning it into a stable, production-grade product that delivers value.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                
                {/* Book a Call CTA */}
                <Magnetic strength={0.15}>
                  <a
                    href="mailto:hello@tatvalabs.com?subject=Consultation%20Request"
                    className="inline-block px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-[#ff9f1c] hover:from-amber-300 hover:to-[#ff9f1c] text-xs font-bold text-black shadow-lg shadow-amber-500/10 transition-all duration-300 w-full sm:w-auto text-center"
                    id="cta-book"
                  >
                    Book a Call
                  </a>
                </Magnetic>

                {/* Secondary Start Project CTA */}
                <Magnetic strength={0.15}>
                  {contactMigrated ? (
                    <Link
                      to="/contact"
                      className="inline-block px-7 py-3.5 rounded-full border border-gray-850 bg-gray-950/70 hover:bg-gray-900 text-xs font-bold text-white transition-all duration-300 w-full sm:w-auto hover:border-gray-700 text-center"
                      id="cta-contact"
                    >
                      Start Your Project
                    </Link>
                  ) : (
                    <a
                      href="contact.html"
                      className="inline-block px-7 py-3.5 rounded-full border border-gray-850 bg-gray-950/70 hover:bg-gray-900 text-xs font-bold text-white transition-all duration-300 w-full sm:w-auto hover:border-gray-700 text-center"
                      id="cta-contact"
                    >
                      Start Your Project
                    </a>
                  )}
                </Magnetic>

              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CTASection
