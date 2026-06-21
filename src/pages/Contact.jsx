import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import AnimatedGrid from '../components/animations/AnimatedGrid.jsx'
import AnimateText from '../components/animations/AnimateText.jsx'
import PageTransition from '../components/animations/PageTransition.jsx'
import Magnetic from '../components/animations/Magnetic.jsx'

function InfoCard({ title, icon, value, isLink, linkHref, delay }) {
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
        className="relative rounded-xl border border-gray-850 bg-gray-950/70 p-6 flex gap-4 overflow-hidden shadow-md hover:border-amber-500/25 group transition-colors duration-300 select-none cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: useTransform(
              [glowX, glowY],
              ([xVal, yVal]) => `radial-gradient(150px circle at ${xVal}px ${yVal}px, rgba(194, 120, 58, 0.12), transparent 75%)`
            ),
            opacity: isHovered ? 1 : 0,
            pointerEvents: 'none',
            zIndex: 0
          }}
          className="transition-opacity duration-300"
        />

        <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all duration-300 z-10">
          {icon}
        </div>
        <div className="z-10 flex flex-col justify-center">
          <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">{title}</h4>
          {isLink ? (
            <a href={linkHref} className="text-sm font-bold text-white hover:text-amber-500 transition-colors duration-300">
              {value}
            </a>
          ) : (
            <p className="text-sm font-bold text-white leading-none mt-1">{value}</p>
          )}
        </div>
      </div>
    </Reveal>
  )
}

function Contact({ 
  aboutMigrated = true, 
  servicesMigrated = true, 
  projectsMigrated = true, 
  contactMigrated = true 
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  })

  const [success, setSuccess] = useState(false)

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters)'
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value.trim()) return 'Please enter your email'
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return ''
      }
      case 'subject':
        return value.trim().length >= 3 ? '' : 'Please enter a subject (at least 3 characters)'
      case 'message':
        return value.trim().length >= 10 ? '' : 'Please enter a message (at least 10 characters)'
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      const errorMsg = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: errorMsg }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const errorMsg = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: errorMsg }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const errorMsg = validateField(key, formData[key])
      if (errorMsg) {
        newErrors[key] = errorMsg
        isValid = false
      } else {
        newErrors[key] = ''
      }
    })

    setErrors(newErrors)
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    })

    if (isValid) {
      const body = 'Name: ' + formData.name.trim() + '\nEmail: ' + formData.email.trim() + '\n\n' + formData.message.trim()
      const mailtoLink = 'mailto:hello@tatvalabs.com'
        + '?subject=' + encodeURIComponent(formData.subject.trim())
        + '&body=' + encodeURIComponent(body)

      window.location.href = mailtoLink
      setSuccess(true)
    }
  }

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
        <section className="relative pt-32 pb-20 bg-black overflow-hidden select-none" id="contact-hero">
          <AnimatedGrid 
            gridSize={44}
            strokeColor="rgba(194, 120, 58, 0.04)"
            beamColor="#c2783a"
            beams={[
              { dir: 'h', pos: 2, delay: 0, duration: 7 },
              { dir: 'v', pos: 5, delay: 2, duration: 8 }
            ]}
          />

          {/* Accent lighting */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <Reveal className="inline-block text-xs font-semibold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase mb-4" variant="scale-in">
              Contact Us
            </Reveal>
            
            <AnimateText 
              text="Let's Talk"
              accentWords={["Talk"]}
              accentClass="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
              delay={0.1}
            />

            <Reveal className="text-sm md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed" delay={3} variant="fade-in">
              <p>Have an idea, scope details, or timeline requirements? Leave us a request below.</p>
            </Reveal>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-black relative select-none" id="contact-section">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">

              {/* Contact Form (Left side) */}
              <div className="lg:col-span-7 bg-gray-950/40 border border-gray-850 p-8 rounded-2xl shadow-xl backdrop-blur-xl relative overflow-hidden">
                <form onSubmit={handleSubmit} noValidate>
                  <AnimatePresence mode="wait">
                    {!success ? (
                      <motion.div 
                        key="form-fields"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="flex flex-col">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2" htmlFor="contact-name">Your Name</label>
                          <input 
                            type="text" 
                            className={`w-full bg-gray-950 border text-white text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500/50 transition-colors duration-300 placeholder-white/25 ${touched.name && errors.name ? 'border-red-500/40' : 'border-gray-850'}`}
                            id="contact-name" 
                            name="name" 
                            placeholder="John Doe" 
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required 
                          />
                          <span className={`text-[10px] text-red-400 mt-1.5 transition-opacity duration-300 ${touched.name && errors.name ? 'opacity-100' : 'opacity-0'}`} id="error-name">
                            {errors.name || 'Placeholder'}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2" htmlFor="contact-email">Email Address</label>
                          <input 
                            type="email" 
                            className={`w-full bg-gray-950 border text-white text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500/50 transition-colors duration-300 placeholder-white/25 ${touched.email && errors.email ? 'border-red-500/40' : 'border-gray-850'}`}
                            id="contact-email" 
                            name="email" 
                            placeholder="john@example.com" 
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required 
                          />
                          <span className={`text-[10px] text-red-400 mt-1.5 transition-opacity duration-300 ${touched.email && errors.email ? 'opacity-100' : 'opacity-0'}`} id="error-email">
                            {errors.email || 'Placeholder'}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2" htmlFor="contact-subject">Subject</label>
                          <input 
                            type="text" 
                            className={`w-full bg-gray-950 border text-white text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500/50 transition-colors duration-300 placeholder-white/25 ${touched.subject && errors.subject ? 'border-red-500/40' : 'border-gray-850'}`}
                            id="contact-subject" 
                            name="subject" 
                            placeholder="Project Inquiry" 
                            value={formData.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required 
                          />
                          <span className={`text-[10px] text-red-400 mt-1.5 transition-opacity duration-300 ${touched.subject && errors.subject ? 'opacity-100' : 'opacity-0'}`} id="error-subject">
                            {errors.subject || 'Placeholder'}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <label className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2" htmlFor="contact-message">Your Message</label>
                          <textarea 
                            className={`w-full bg-gray-950 border text-white text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500/50 transition-colors duration-300 placeholder-white/25 min-h-[120px] ${touched.message && errors.message ? 'border-red-500/40' : 'border-gray-850'}`}
                            id="contact-message" 
                            name="message" 
                            placeholder="Tell us about your project..." 
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          ></textarea>
                          <span className={`text-[10px] text-red-400 mt-1.5 transition-opacity duration-300 ${touched.message && errors.message ? 'opacity-100' : 'opacity-0'}`} id="error-message">
                            {errors.message || 'Placeholder'}
                          </span>
                        </div>

                        <button 
                          type="submit" 
                          className="w-full py-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-xs font-bold text-black shadow-lg shadow-amber-500/10 transition-all duration-300"
                          id="contact-submit"
                        >
                          Send Message
                        </button>
                      </motion.div>
                    ) : (
                      /* Success State */
                      <motion.div 
                        key="success-fields"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                        className="flex flex-col items-center justify-center text-center py-12"
                        id="form-success"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center mb-6 animate-pulse">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-xs md:text-sm text-white/50 max-w-xs leading-relaxed">Thank you for reaching out. We will connect back with you within 24 hours.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Contact Info Panel (Right side) */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                
                {/* Email card */}
                <InfoCard
                  title="Email Us"
                  value="hello@tatvalabs.com"
                  isLink={true}
                  linkHref="mailto:hello@tatvalabs.com"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                  delay={1}
                />

                {/* Location card */}
                <InfoCard
                  title="Location"
                  value="Remote-First · India"
                  isLink={false}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                  delay={2}
                />

                {/* Response time card */}
                <InfoCard
                  title="Response Time"
                  value="Within 24 hours"
                  isLink={false}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                  delay={3}
                />

                {/* Consultation Card */}
                <Reveal delay={4} variant="fade-up">
                  <div className="relative rounded-xl border border-gray-850 bg-gray-950/70 p-6 overflow-hidden shadow-md hover:border-amber-500/25 transition-colors duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent blur-md pointer-events-none" />
                    <h3 className="text-base font-bold text-white mb-2">Book a <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Consultation</span></h3>
                    <p className="text-xs text-white/50 leading-relaxed mb-6">
                      Want a detailed mapping of system specifications? Schedule a technical scoping session.
                    </p>
                    <Magnetic strength={0.15}>
                      <a
                        href="mailto:hello@tatvalabs.com?subject=Consultation%20Request"
                        className="inline-block px-5 py-2.5 rounded-lg border border-gray-850 bg-gray-950/70 hover:bg-gray-900 text-xs font-bold text-white transition-all duration-300 hover:border-gray-700 w-full text-center"
                        id="book-consultation-btn"
                      >
                        Schedule a Call
                      </a>
                    </Magnetic>
                  </div>
                </Reveal>

              </div>

            </div>
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

export default Contact
