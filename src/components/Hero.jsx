import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import Magnetic from './animations/Magnetic.jsx'
import AnimatedGrid from './animations/AnimatedGrid.jsx'
import AnimateText from './animations/AnimateText.jsx'
import SplineScene from './ui/SplineScene.jsx'

function Hero({ projectsMigrated = true, contactMigrated = true }) {
  // Arrow right icon for the badge
  const ArrowRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline ml-1 transition-transform group-hover:translate-x-0.5">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-black" id="hero">
      {/* Futuristic coordinates animated grid background */}
      <AnimatedGrid 
        gridSize={48} 
        strokeColor="rgba(194, 120, 58, 0.04)" 
        beamColor="#c2783a"
        beams={[
          { dir: 'h', pos: 3, delay: 0, duration: 8 },
          { dir: 'v', pos: 5, delay: 2, duration: 9 },
          { dir: 'h', pos: 7, delay: 4, duration: 11 },
          { dir: 'v', pos: 12, delay: 1, duration: 7 }
        ]}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col items-start text-left max-w-2xl mx-auto lg:mx-0">
          {/* Brand Pill Badge */}
          <Reveal variant="scale-in" delay={0.1}>
            <aside className="mb-6 inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/40 backdrop-blur-sm group hover:border-gray-700 transition-colors">
              <span className="text-xs text-white/50">
                Now building AI-powered digital products
              </span>
              <Link
                to="/services"
                className="flex items-center text-xs text-amber-500 hover:text-amber-400 transition-colors font-medium"
                aria-label="Read more about our services"
              >
                Explore services
                <ArrowRight />
              </Link>
            </aside>
          </Reveal>

          {/* Word-by-word staggered title reveal */}
          <AnimateText 
            text="We Build Products That Businesses Depend On" 
            accentWords={["Depend", "On"]} 
            accentClass="text-amber-500"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white leading-[1.1] md:leading-[1.05]"
            delay={0.15}
          />

          <Reveal delay={0.6} variant="fade-in">
            <p className="text-sm md:text-base text-white/60 mb-10 leading-relaxed">
              From custom MVPs to highly scalable software architectures, Tatva Labs helps startups and established businesses engineer products that stand the test of scale.
            </p>
          </Reveal>

          {/* Call to Actions (Magnetic hover integrated) */}
          <Reveal delay={0.8} variant="fade-in">
            <div className="flex items-center gap-4 relative z-20 flex-wrap">
              {projectsMigrated ? (
                <Magnetic strength={0.2} scaleOnHover={1.04}>
                  <Link to="/projects" className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-white text-black hover:bg-gray-100 h-11 px-6 shadow-lg shadow-white/5" id="hero-cta-projects">
                    View Projects
                  </Link>
                </Magnetic>
              ) : (
                <Magnetic strength={0.2} scaleOnHover={1.04}>
                  <a href="projects.html" className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-white text-black hover:bg-gray-100 h-11 px-6 shadow-lg shadow-white/5" id="hero-cta-projects">
                    View Projects
                  </a>
                </Magnetic>
              )}
              
              {contactMigrated ? (
                <Magnetic strength={0.2} scaleOnHover={1.04}>
                  <Link to="/contact" className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors border border-gray-800 hover:bg-gray-900/60 h-11 px-6 text-white" id="hero-cta-contact">
                    Get In Touch
                  </Link>
                </Magnetic>
              ) : (
                <Magnetic strength={0.2} scaleOnHover={1.04}>
                  <a href="contact.html" className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors border border-gray-800 hover:bg-gray-900/60 h-11 px-6 text-white" id="hero-cta-contact">
                    Get In Touch
                  </a>
                </Magnetic>
              )}
            </div>
          </Reveal>
        </div>

        {/* Right Column: 3D Spline Canvas with background glows */}
        <Reveal className="w-full relative h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center" delay={1} variant="scale-in">
          {/* Background glow behind 3D canvas */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square pointer-events-none z-0"
            aria-hidden="true"
          >
            <img
              src="https://i.postimg.cc/Ss6yShGy/glows.png"
              alt=""
              className="w-full h-auto select-none opacity-80"
              loading="eager"
            />
          </div>
          
          <div className="relative z-10 w-full h-full">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
              className="w-full h-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
