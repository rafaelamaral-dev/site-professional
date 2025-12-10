/* ====== script.js ====== */

/* ELEMENTS */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');
const themeBtn = document.getElementById('theme-btn');
const langBtn = document.getElementById('lang-btn');

/* MOBILE MENU */
hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('show');
  if(open){
    hamburger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  } else {
    hamburger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
});

/* Close mobile menu when clicking a link */
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('show');
    document.body.style.overflow = '';
  });
});

/* Close mobile menu on resize > mobile */
window.addEventListener('resize', () => {
  if(window.innerWidth > 680 && mobileNav.classList.contains('show')){
    mobileNav.classList.remove('show');
    document.body.style.overflow = '';
  }
});

/* SMOOTH SCROLL for header links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({top, behavior: 'smooth'});
    // close mobile if open
    if(mobileNav.classList.contains('show')){
      mobileNav.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
});

/* THEME TOGGLE (dark/light) */
const root = document.documentElement;
const savedTheme = localStorage.getItem('site-theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeBtn.addEventListener('click', () => {
  const cur = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', cur);
  localStorage.setItem('site-theme', cur);
  themeBtn.textContent = cur === 'dark' ? '🌙' : '☀️';
});

/* LANGUAGE - placeholder toggle (EN / PT) */
let lang = localStorage.getItem('site-lang') || 'en';
langBtn.textContent = lang.toUpperCase();
langBtn.addEventListener('click', () => {
  lang = lang === 'en' ? 'pt' : 'en';
  localStorage.setItem('site-lang', lang);
  langBtn.textContent = lang.toUpperCase();
  // NOTE: you can implement text swap by observing data attributes or by using a translations object
});

/* Optional: highlight nav on scroll (simple) */
const sections = document.querySelectorAll('main section[id]');
function onScroll(){
  const scrollPos = window.scrollY + 90;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if(link){
      if(scrollPos >= top && scrollPos < bottom){
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}
window.addEventListener('scroll', onScroll);
onScroll();