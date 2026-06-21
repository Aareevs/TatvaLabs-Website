import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import AnimatedGrid from '../components/animations/AnimatedGrid.jsx'
import AnimateText from '../components/animations/AnimateText.jsx'
import PageTransition from '../components/animations/PageTransition.jsx'

function ServiceDetailCard({ index, title, icon, desc, features, delay }) {
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
        className="relative rounded-2xl border border-gray-850 bg-gray-950/70 p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:border-amber-500/30 group transition-all duration-300 min-h-[340px] select-none cursor-pointer h-full"
      >
        {/* Ambient background highlight */}
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
              ([xVal, yVal]) => `radial-gradient(180px circle at ${xVal}px ${yVal}px, rgba(194, 120, 58, 0.12), transparent 75%)`
            ),
            opacity: isHovered ? 1 : 0,
            pointerEvents: 'none',
            zIndex: 0
          }}
          className="transition-opacity duration-300"
        />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            {/* Header row with card number */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-500 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300">
                {icon}
              </div>
              <span className="text-xl font-mono font-bold text-white/10 group-hover:text-amber-500/25 transition-colors duration-300">
                {index}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-6">
              {desc}
            </p>
          </div>

          {/* Bullet points */}
          <div className="space-y-2.5 border-t border-gray-900 pt-5 mt-auto">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-white/60 group-hover:text-white/70 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Services({ 
  aboutMigrated = true, 
  servicesMigrated = true, 
  projectsMigrated = true, 
  contactMigrated = true 
}) {
  const serviceList = [
    {
      index: "01",
      title: "Custom Web Development",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
      desc: "Build scalable and modern web applications that deliver great user experiences across every device and screen size.",
      features: ["Responsive layouts for all screen sizes", "SEO-optimized markup hierarchies", "Performance-first codebase optimization"]
    },
    {
      index: "02",
      title: "Full Stack Development",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
      desc: "End-to-end product engineering from idea to deployment — frontend, backend, database, and infrastructure handled cleanly.",
      features: ["React, Next.js, and TypeScript client-side apps", "Node.js, Express, and Python backend APIs", "PostgreSQL and NoSQL schema design"]
    },
    {
      index: "03",
      title: "AI Integration",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22"/><path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93"/><path d="M8.56 13.68C5.29 14.84 3 17.46 3 20.5h18c0-3.04-2.29-5.66-5.56-6.82"/></svg>,
      desc: "Integrate custom intelligent agents, LLM pipelines, and automated workflows to bring generative AI capabilities directly to your app.",
      features: ["OpenAI, Anthropic, and Google Gemini API setup", "RAG vector database architectures", "Custom AI agent routing logic"]
    },
    {
      index: "04",
      title: "Product Engineering",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
      desc: "Design and build products that scale — from initial architecture specifications to automated deployment workflows under high load.",
      features: ["Clean scalable directory patterns", "Robust test pipelines and coverage tracking", "Optimized CDN caching structures"]
    },
    {
      index: "05",
      title: "Startup MVP Development",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
      desc: "Rapidly launch startup ideas and validate products. We build highly focused MVPs that get you to market fast to begin gathering feedback.",
      features: ["Rapid prototype iteration speeds", "Lean feature prioritization alignment", "Live product deployment within weeks"]
    },
    {
      index: "06",
      title: "Technical Consulting",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
      desc: "Architecture strategy reviews, code performance auditing, and roadmap advisory to guarantee long-term system health.",
      features: ["Codebase quality assessments", "Engineering pipeline advice", "Infrastructure scalability reviews"]
    }
  ]

  const processSteps = [
    {
      num: "01",
      title: "Discover",
      desc: "We discuss features, scope alignment, and target objectives. No over-engineered specs — just a clear, actionable product blueprint."
    },
    {
      num: "02",
      title: "Design",
      desc: "We plan out the systems architecture, map clean UI mockups, and develop quick wireframes to align visual direction early."
    },
    {
      num: "03",
      title: "Develop",
      desc: "We code in structured sprints, provide access to sandbox environments, and tweak variables based on regular user feedback."
    },
    {
      num: "04",
      title: "Deploy",
      desc: "We push to staging and production, guarantee performance checklists, and provide post-launch support nodes."
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
        <section className="relative pt-32 pb-20 bg-black overflow-hidden select-none" id="services-hero">
          <AnimatedGrid 
            gridSize={44}
            strokeColor="rgba(194, 120, 58, 0.04)"
            beamColor="#e09850"
            beams={[
              { dir: 'h', pos: 2, delay: 0.5, duration: 6.5 },
              { dir: 'v', pos: 5, delay: 2.5, duration: 7.5 }
            ]}
          />

          {/* Ambient radial accent glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <Reveal className="inline-block text-xs font-semibold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4" variant="scale-in">
              Our Services
            </Reveal>
            
            <AnimateText 
              text="What We Build"
              accentWords={["Build"]}
              accentClass="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
              delay={0.1}
            />

            <Reveal className="text-sm md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed" delay={3} variant="fade-in">
              <p>End-to-end engineering pipelines designed to build scalable, robust systems matching the requirements of modern startups and brands.</p>
            </Reveal>
          </div>
        </section>

        {/* Services Detail Grid */}
        <section className="py-24 bg-black relative select-none" id="services-detail">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceList.map((svc, i) => (
                <ServiceDetailCard
                  key={i}
                  index={svc.index}
                  title={svc.title}
                  icon={svc.icon}
                  desc={svc.desc}
                  features={svc.features}
                  delay={i + 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-24 bg-black relative select-none border-t border-gray-900/40" id="process">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header */}
            <Reveal className="text-center mb-20" variant="fade-up">
              <span className="inline-block text-xs font-semibold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4">
                How We Work
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Our <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Process</span>
              </h2>
              <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
                A structured execution timeline carrying your idea safely from abstract specifications to deployment.
              </p>
            </Reveal>

            {/* Timeline */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              
              {/* Desktop connecting route path */}
              <div className="hidden lg:block absolute top-6 left-10 right-10 h-[1.5px] bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 pointer-events-none z-0" />
              
              {processSteps.map((step, idx) => (
                <Reveal key={idx} delay={idx + 1} variant="fade-up">
                  <div className="relative flex flex-col items-start bg-gray-950/40 border border-gray-850 p-6 rounded-xl hover:border-amber-500/25 transition-all duration-300 h-full group z-10">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-500 flex items-center justify-center font-mono font-bold text-xs mb-5 group-hover:bg-amber-500/20 transition-all duration-300">
                      {step.num}
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-amber-500 transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-xs md:text-sm text-white/45 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}

            </div>
          </div>
        </section>

        {/* Services CTA Banner */}
        <section className="py-20 bg-black relative overflow-hidden select-none border-t border-gray-900/40" id="services-cta">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal variant="scale-in">
              <div className="relative rounded-3xl border border-gray-850 bg-gray-950/40 backdrop-blur-xl p-10 md:p-14 text-center overflow-hidden shadow-2xl flex flex-col items-center">
                
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  Ready to <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Get Started</span>?
                </h2>
                <p className="text-xs md:text-sm text-white/50 mb-8 max-w-md leading-relaxed">
                  Book a direct technical alignment consultation. We will draft scoping details and deployment estimates within 24 hours.
                </p>
                <Link
                  to="/contact"
                  className="inline-block px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-xs font-bold text-black shadow-lg shadow-amber-500/10 transition-all duration-300 text-center"
                  id="services-cta-btn"
                >
                  Book a Consultation
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

export default Services
