document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const themeBtn = document.getElementById('theme-btn');

  let menuOpen = false;

  function openMenu() {
    mobileNav.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    menuOpen = true;
  }

  function closeMenu() {
    mobileNav.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuOpen = false;
  }

  // Toggle menu
  hamburger.addEventListener('click', () => {
    menuOpen ? closeMenu() : openMenu();
  });

  // Fecha menu ao clicar em link mobile
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) closeMenu();
    });
  });

  // Tema
  const savedTheme = localStorage.getItem('site-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    themeBtn.textContent = next === 'dark' ? '🌙' : '☀️';
  });
});
