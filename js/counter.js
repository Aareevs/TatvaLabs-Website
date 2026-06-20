/* ============================================
   TATVA LABS — Counter Animation
   Animates numbers when scrolled into view
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
});

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'), 10);
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000; // ms
  const startTime = performance.now();
  const startValue = 0;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentValue = Math.round(startValue + (target - startValue) * easedProgress);

    element.textContent = currentValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
