const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const form = document.querySelector('[data-catering-form]');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  status.textContent = 'Thanks! Your request is ready to send once the form is connected to your preferred email or CRM service.';
});
