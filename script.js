/* ====== script.js (Versão Compatível e Otimizada) ====== */

document.addEventListener('DOMContentLoaded', () => {
  /* ELEMENTS */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const themeBtn = document.getElementById('theme-btn');
  const root = document.documentElement;
  const header = document.querySelector('.site-header');

  /* FUNÇÃO PARA CALCULAR ALTURA DO HEADER */
  const getHeaderHeight = () => {
    return header ? header.offsetHeight : 70;
  };

  /* MOBILE MENU */
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    
    // Animação do hamburger
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  /* FECHAR MENU AO CLICAR EM LINK MOBILE */
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      
      // Reset hamburger animation
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  /* FECHAR MENU AO REDIMENSIONAR PARA DESKTOP */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains('show')) {
      mobileNav.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      
      // Reset hamburger animation
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  /* SCROLL SUAVE PARA TODOS OS LINKS ÂNCORA */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Pular se for apenas "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      // Fechar menu mobile se aberto
      if (mobileNav.classList.contains('show')) {
        mobileNav.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
      
      // Calcular posição com offset do header
      const headerHeight = getHeaderHeight();
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* TOGGLE DE TEMA DARK/LIGHT */
  const savedTheme = localStorage.getItem('site-theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);
  themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  themeBtn.setAttribute('aria-label', `Switch to ${savedTheme === 'dark' ? 'light' : 'dark'} theme`);

  themeBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('site-theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    themeBtn.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} theme`);
  });

  /* HIGHLIGHT NAV ON SCROLL */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function highlightNavOnScroll() {
    const headerHeight = getHeaderHeight();
    const scrollPosition = window.scrollY + headerHeight + 10;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Debounce para performance
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(highlightNavOnScroll, 50);
  });
  
  // Executar uma vez ao carregar
  highlightNavOnScroll();

  /* OTIMIZAÇÃO PARA MOBILE: Adicionar padding ao WhatsApp float em iOS */
  function checkIOS() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      const whatsappFloat = document.getElementById('whatsapp-float');
      if (whatsappFloat) {
        whatsappFloat.style.bottom = 'calc(20px + env(safe-area-inset-bottom))';
      }
    }
  }
  
  checkIOS();
  window.addEventListener('resize', checkIOS);
});