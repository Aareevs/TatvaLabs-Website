import { Link } from 'react-router-dom'

function Footer({ 
  aboutMigrated = false, 
  servicesMigrated = false, 
  projectsMigrated = false, 
  contactMigrated = false 
}) {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#16161a] relative overflow-hidden py-16 text-white" id="main-footer">
      {/* Top border faded gradient line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gray-850 to-transparent" />

      {/* Subtle background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[180px] bg-gradient-to-b from-amber-500/3 via-amber-500/0 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-white" onClick={handleLogoClick}>
              tatva<span className="text-amber-500 font-medium">labs</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              A software development firm building modern digital products and AI-powered applications for startups and businesses.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a 
                href="mailto:hello@tatvalabs.com" 
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-850 bg-gray-950/40 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all text-white/60 hover:text-amber-400 shadow-md" 
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
              
              {aboutMigrated ? (
                <Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">About Us</Link>
              ) : (
                <a href="about.html" className="text-sm text-white/60 hover:text-white transition-colors">About Us</a>
              )}

              {servicesMigrated ? (
                <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">Services</Link>
              ) : (
                <a href="services.html" className="text-sm text-white/60 hover:text-white transition-colors">Services</a>
              )}

              {projectsMigrated ? (
                <Link to="/projects" className="text-sm text-white/60 hover:text-white transition-colors">Projects</Link>
              ) : (
                <a href="projects.html" className="text-sm text-white/60 hover:text-white transition-colors">Projects</a>
              )}

              {contactMigrated ? (
                <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link>
              ) : (
                <a href="contact.html" className="text-sm text-white/60 hover:text-white transition-colors">Contact</a>
              )}
            </div>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Services</h4>
            <div className="flex flex-col gap-2.5">
              {servicesMigrated ? (
                <>
                  <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">Web Development</Link>
                  <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">Full Stack Dev</Link>
                  <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">AI Integration</Link>
                  <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">Product Engineering</Link>
                  <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">MVP Development</Link>
                  <Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">Technical Consulting</Link>
                </>
              ) : (
                <>
                  <a href="services.html" className="text-sm text-white/60 hover:text-white transition-colors">Web Development</a>
                  <a href="services.html" className="text-sm text-white/60 hover:text-white transition-colors">Full Stack Dev</a>
                  <a href="services.html" className="text-sm text-white/60 hover:text-white transition-colors">AI Integration</a>
                  <a href="services.html" className="text-sm text-white/60 hover:text-white transition-colors">Product Engineering</a>
                  <a href="services.html" className="text-sm text-white/60 hover:text-white transition-colors">MVP Development</a>
                  <a href="services.html" className="text-sm text-white/60 hover:text-white transition-colors">Technical Consulting</a>
                </>
              )}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact</h4>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:hello@tatvalabs.com" className="text-sm text-white/60 hover:text-white transition-colors">hello@tatvalabs.com</a>
              {contactMigrated ? (
                <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Book a Consultation</Link>
              ) : (
                <a href="contact.html" className="text-sm text-white/60 hover:text-white transition-colors">Book a Consultation</a>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom Section faded divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-900 to-transparent mt-16" />

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>&copy; {new Date().getFullYear()} Tatva Labs. All rights reserved.</span>
          <span>Built with purpose by <span className="text-amber-500 font-semibold">Tatva Labs</span></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
