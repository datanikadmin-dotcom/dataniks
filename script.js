const toggle = document.querySelector('.theme-toggle') || document.createElement('div');
toggle.className = 'theme-toggle'; toggle.textContent = '🌙'; document.body.appendChild(toggle);
const body = document.body;
toggle.addEventListener('click', () => {
  body.classList.toggle('light');
  toggle.textContent = body.classList.contains('light') ? '🌙' : '☀️';
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});
if (localStorage.getItem('theme') === 'light') { body.classList.add('light'); toggle.textContent = '🌙'; }

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => { e.preventDefault(); document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }); });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; } });
});
document.querySelectorAll('.glass-card, .service-card, .step-card, .case-card').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = 'all 0.6s cubic-bezier(0.4,0,0.2,1)';
  observer.observe(el);
});