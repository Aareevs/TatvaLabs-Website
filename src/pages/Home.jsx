import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import PageTransition from '../components/animations/PageTransition.jsx'
import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import ServicesSection from '../components/ServicesSection.jsx'
import WhyUs from '../components/WhyUs.jsx'
import FeaturedProjects from '../components/FeaturedProjects.jsx'
import TeamSection from '../components/TeamSection.jsx'
import CTASection from '../components/CTASection.jsx'
import '../css/home.css'

function Home({ 
  aboutMigrated = true, 
  servicesMigrated = true, 
  projectsMigrated = true, 
  contactMigrated = true 
}) {
  return (
    <>
      <Navbar 
        aboutMigrated={aboutMigrated}
        servicesMigrated={servicesMigrated}
        projectsMigrated={projectsMigrated}
        contactMigrated={contactMigrated}
      />

      <PageTransition>
        <Hero 
          projectsMigrated={projectsMigrated}
          contactMigrated={contactMigrated}
        />

        <Stats />

        <ServicesSection />

        <WhyUs />

        <FeaturedProjects projectsMigrated={projectsMigrated} />

        <TeamSection />

        <CTASection contactMigrated={contactMigrated} />
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

export default Home
