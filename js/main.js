/* ============================================
   TATVA LABS — Main JavaScript
   Navigation, Scroll Animations, Mobile Menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initSmoothScroll();
});

/* --- Navigation --- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  const overlay = document.querySelector('.nav__mobile-overlay');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  // Scroll-based glass effect
  let lastScroll = 0;
  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check

  // Mobile menu toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.contains('open');
      toggleMobileMenu(!isOpen);
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  });

  function toggleMobileMenu(open) {
    toggle.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // Set active nav link
  setActiveNavLink();
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Smooth Scroll for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
