// Mobile nav toggle (hamburger menu)
document.querySelectorAll('.nav-toggle').forEach(btn => {
  const menu = btn.closest('ul');
  if (!menu) return;
  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('nav-open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });
  // close the menu after tapping a link
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('nav-open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll-in animation for cards.
// Content is visible by default (see styles.css) — we only opt into the
// hidden/reveal state here, and only when IntersectionObserver exists and
// the user hasn't asked for reduced motion. If this script fails to load
// or errors out, cards simply stay visible instead of being stuck hidden.
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.glass-card, .service-card, .case-card, .process-card, .package-card').forEach(el => {
    observer.observe(el);
  });
}
