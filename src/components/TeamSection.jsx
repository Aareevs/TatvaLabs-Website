import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'

function TeamMemberCard({ member, delay }) {
  const [isHovered, setIsHovered] = useState(false)

  // Gold-amber cinematic gradient styles based on initials
  const getGradient = (init) => {
    switch (init) {
      case "AG": return "from-[#ffb347] to-orange-600 shadow-[0_0_40px_rgba(255,179,71,0.3)]"
      case "AR": return "from-amber-400 to-[#ff9f1c] shadow-[0_0_40px_rgba(255,159,28,0.25)]"
      case "SB": return "from-orange-500 to-amber-600 shadow-[0_0_40px_rgba(255,179,71,0.2)]"
      case "SV": return "from-[#ffb347] to-amber-500 shadow-[0_0_40px_rgba(255,179,71,0.2)]"
      default: return "from-amber-400 to-orange-600"
    }
  }

  return (
    <Reveal delay={delay} variant="fade-up">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -8 : 0
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="relative rounded-2xl border border-gray-850 bg-gray-950/70 p-6 flex flex-col items-center justify-between text-center overflow-hidden hover:border-amber-500/30 group transition-colors duration-500 shadow-xl h-[410px] select-none cursor-pointer"
      >
        {/* ambient background highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* TOP: Large Avatar (Visual focus) and Name */}
        <div className="flex flex-col items-center w-full">
          
          {/* Double ring avatar container - Photo ready */}
          <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
            {/* Outer Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border border-amber-500/25 scale-110 group-hover:scale-120 group-hover:border-amber-400/40 transition-all duration-500 animate-pulse pointer-events-none" />
            {/* Inner Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border border-amber-500/15 scale-100 group-hover:scale-110 group-hover:border-amber-400/30 transition-all duration-500 pointer-events-none" />
            
            {/* Main Avatar Core (initials placeholder for real photos) */}
            <motion.div
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 12 }}
              className={`w-28 h-28 rounded-full bg-gradient-to-br ${getGradient(member.initials)} flex items-center justify-center text-3xl font-black text-black border border-black/10 z-10 shadow-[0_0_30px_rgba(255,179,71,0.25)] relative overflow-hidden`}
            >
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <>
                  {/* Glow filter sheen */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
                  <span className="relative z-10 bg-gradient-to-b from-black to-gray-900 bg-clip-text text-transparent">
                    {member.initials}
                  </span>
                </>
              )}
            </motion.div>
          </div>

          <h3 className="text-base font-bold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
            {member.role}
          </p>
        </div>

        {/* MIDDLE: Focus tags */}
        <div className="flex flex-wrap justify-center gap-1.5 px-2 mb-4 max-w-[240px]">
          {member.focus.map((tag) => (
            <span
              key={tag}
              className="text-[8px] font-mono text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md hover:text-white/80 hover:border-white/20 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* BOTTOM: Socials Container */}
        <div className="relative w-full z-10 shrink-0 border-t border-gray-900 pt-3 flex items-center justify-center">
          <div className="flex gap-4 justify-center items-center">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-500/10 flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-500/10 flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="LinkedIn"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

function TeamSection() {
  const team = [
    {
      name: "Awaneesh Gupta",
      role: "Full Stack Developer",
      initials: "AG",
      image: "assets/images/awaneesh.png",
      focus: ["Full Stack Engineering", "AI Integration", "Product Architecture"],
      github: "https://github.com/Awaneesh03",
      linkedin: "https://www.linkedin.com/in/awaneesh-gupta/"
    },
    {
      name: "Aareev",
      role: "Full Stack Developer",
      initials: "AR",
      image: "assets/images/aareev.jpg",
      focus: ["Full Stack Engineering", "Software Architecture", "Product Development"],
      github: "https://github.com/Aareevs",
      linkedin: "https://www.linkedin.com/in/aareev-srinivasan/"
    },
    {
      name: "Shubham Barik",
      role: "Full Stack Developer",
      initials: "SB",
      image: "assets/images/shubham.png",
      focus: ["Backend Systems", "Application Engineering", "Web Development"],
      github: "https://github.com/phoenixshubham07",
      linkedin: "https://www.linkedin.com/in/shubham-barik/"
    },
    {
      name: "Shivansh",
      role: "Marketing Lead",
      initials: "SV",
      image: "assets/images/shivansh.png",
      focus: ["Business Development", "Client Relations", "Brand Strategy", "Growth & Marketing"],
      linkedin: "https://www.linkedin.com/in/iamshivanshojha/"
    }
  ]

  const bgParticles = [
    { id: 1, top: "10%", left: "12%", size: 3, delay: 0 },
    { id: 2, top: "85%", left: "85%", size: 2.5, delay: 1.6 },
    { id: 3, top: "45%", left: "92%", size: 3, delay: 0.9 },
    { id: 4, top: "70%", left: "8%", size: 4, delay: 2.2 }
  ]

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden select-none" id="home-team">
      
      {/* Decorative details */}
      <div className="absolute right-10 bottom-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            y: [0, -35, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 9 + p.id * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
          className="pointer-events-none"
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <Reveal className="text-center mb-16" variant="fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Meet the <span className="bg-gradient-to-r from-amber-400 to-[#ff9f1c] bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            The engineers and strategists behind every Tatva Labs deployment.
          </p>
        </Reveal>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamMemberCard
              key={index}
              member={member}
              delay={index + 1}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default TeamSection
