import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import AnimatedGrid from '../components/animations/AnimatedGrid.jsx'
import AnimateText from '../components/animations/AnimateText.jsx'
import PageTransition from '../components/animations/PageTransition.jsx'

function ProjectShowcaseCard({ project, delay }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const glowX = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 })
  const glowY = useSpring(useMotionValue(0), { damping: 30, stiffness: 200 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    glowX.set(e.clientX - rect.left)
    glowY.set(e.clientY - rect.top)
  }

  return (
    <Reveal delay={delay} variant="fade-up">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-2xl border border-gray-850 bg-gray-950/70 overflow-hidden shadow-xl hover:border-amber-500/30 group transition-all duration-300 flex flex-col justify-between h-full select-none cursor-pointer"
      >
        {/* Soft backlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Spotlight glow template */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: useTransform(
              [glowX, glowY],
              ([xVal, yVal]) => `radial-gradient(200px circle at ${xVal}px ${yVal}px, rgba(194, 120, 58, 0.12), transparent 75%)`
            ),
            opacity: isHovered ? 1 : 0,
            pointerEvents: 'none',
            zIndex: 0
          }}
          className="transition-opacity duration-300"
        />

        {/* Project Image Area */}
        <div className="relative w-full h-[200px] overflow-hidden bg-gray-900 border-b border-gray-900/60 flex items-center justify-center shrink-0">
          <img
            src={project.img}
            alt={project.title}
            style={project.imgStyle || { objectFit: 'cover', width: '100%', height: '100%' }}
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
        </div>

        {/* Card Body */}
        <div className="p-6 flex-grow flex flex-col justify-between z-10">
          <div>
            <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-amber-500 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-xs text-white/50 leading-relaxed">
              {project.desc}
            </p>
          </div>

          <div>
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[8px] font-semibold text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 mt-5 pt-4 border-t border-gray-900">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                {project.title === "Ingredio" ? "Try It" : "Visit Site"}
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-white/60 hover:text-white flex items-center gap-1.5 transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Projects({ 
  aboutMigrated = true, 
  servicesMigrated = true, 
  projectsMigrated = true, 
  contactMigrated = true 
}) {
  const projectsList = [
    {
      title: "Campus Critique",
      desc: "A platform helping students explore and review college campuses with verified student reviews, real placement data, and comparison tools.",
      tags: ["Web App", "EdTech", "Reviews"],
      img: "assets/images/logo-campuscritique.png",
      imgStyle: { objectFit: 'contain', background: '#ffffff', padding: '16px', height: '100%', width: '100%' },
      live: "https://www.campuscritique.in/"
    },
    {
      title: "Motif",
      desc: "An AI-powered startup idea platform that helps founders validate ideas, collaborate, and turn concepts into fundable ventures.",
      tags: ["AI", "Startup Tools", "Collaboration"],
      img: "assets/images/logo-motif.png",
      imgStyle: { objectFit: 'contain', background: '#ffffff', padding: '16px', height: '100%', width: '100%' },
      live: "https://motif-website-master.vercel.app/",
      github: "https://github.com/Awaneesh03/motif-website"
    },
    {
      title: "Vaani Setu",
      desc: "A web application for learning American Sign Language with interactive tutorials, real-time interpretation, and community features.",
      tags: ["TypeScript", "React", "PostgreSQL"],
      img: "assets/images/vaani-setu-logo.jpg",
      imgStyle: { objectFit: 'cover', width: '100%', height: '100%' },
      live: "https://vaani-setu-website.vercel.app",
      github: "https://github.com/Aareevs/Vaani-Setu-Website"
    },
    {
      title: "AlgoClash",
      desc: "A competitive coding platform where developers solve algorithmic challenges, compete in contests, and sharpen their problem-solving skills.",
      tags: ["Programming", "Web App"],
      img: "assets/images/logo-algoclash.svg",
      imgStyle: { objectFit: 'cover', width: '100%', height: '100%' },
      live: "https://algoclash.com"
    },
    {
      title: "Syntrox",
      desc: "An AI governance and system observability platform for monitoring and managing AI systems with transparency and accountability.",
      tags: ["AI Governance", "Observability"],
      img: "assets/images/logo-syntrox.png",
      imgStyle: { objectFit: 'contain', background: '#000000', padding: '16px', height: '100%', width: '100%' },
      live: "https://syntrox.io"
    },
    {
      title: "ATFRO",
      desc: "A business transformation and systems consulting platform focused on technology infrastructure, growth systems, and brand positioning.",
      tags: ["Consulting", "Business", "Branding"],
      img: "assets/images/logo-atfro.png",
      imgStyle: { objectFit: 'contain', background: '#ffffff', padding: '16px', height: '100%', width: '100%' },
      live: "https://atfro.com/"
    },
    {
      title: "Ingredio",
      desc: "An AI-powered food analysis tool that scans ingredient labels and packaging to evaluate health and safety risks against global regulations.",
      tags: ["AI", "Health", "Computer Vision"],
      img: "assets/images/logo-ingredio.svg",
      imgStyle: { objectFit: 'cover', width: '100%', height: '100%' },
      live: "https://phxshubham-ingredio.hf.space"
    }
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
        {/* Page Hero */}
        <section className="relative pt-32 pb-20 bg-black overflow-hidden select-none" id="projects-hero">
          <AnimatedGrid 
            gridSize={44}
            strokeColor="rgba(194, 120, 58, 0.04)"
            beamColor="#c2783a"
            beams={[
              { dir: 'h', pos: 3, delay: 1, duration: 6 },
              { dir: 'v', pos: 7, delay: 3, duration: 8 }
            ]}
          />

          {/* Ambient radial accent glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <Reveal className="inline-block text-xs font-semibold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4" variant="scale-in">
              Our Work
            </Reveal>
            
            <AnimateText 
              text="Projects We've Shipped"
              accentWords={["Shipped"]}
              accentClass="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
              delay={0.1}
            />

            <Reveal className="text-sm md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed" delay={3} variant="fade-in">
              <p>Real production products engineered for real-world impact. Explore some of our latest deployments.</p>
            </Reveal>
          </div>
        </section>

        {/* Projects Showcase Grid */}
        <section className="py-24 bg-black relative select-none" id="projects-showcase">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {projectsList.map((project, index) => (
                <ProjectShowcaseCard
                  key={index}
                  project={project}
                  delay={index + 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects CTA Banner */}
        <section className="py-20 bg-black relative overflow-hidden select-none border-t border-gray-900/40" id="projects-cta">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal variant="scale-in">
              <div className="relative rounded-3xl border border-gray-850 bg-gray-950/40 backdrop-blur-xl p-10 md:p-14 text-center overflow-hidden shadow-2xl flex flex-col items-center">
                
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  Have a Project <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">in Mind</span>?
                </h2>
                <p className="text-xs md:text-sm text-white/50 mb-8 max-w-md leading-relaxed">
                  Let&apos;s map out specs, integrations, and timelines. We deliver clean codebases structured for your user metrics.
                </p>
                <Link
                  to="/contact"
                  className="inline-block px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-xs font-bold text-black shadow-lg shadow-amber-500/10 transition-all duration-300 text-center"
                >
                  Start a Conversation
                </Link>

              </div>
            </Reveal>
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

export default Projects
