/* ====== script.js (Versão 10: Scroll Suave Funcionando) ====== */

document.addEventListener('DOMContentLoaded', () => {
  /* ELEMENTOS */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const themeBtn = document.getElementById('theme-btn');
  const root = document.documentElement;
  const header = document.querySelector('.site-header');

  /* ESTADOS */
  let isMobileMenuOpen = false;

  /* FUNÇÕES UTILITÁRIAS */
  const getHeaderHeight = () => {
    return header ? header.offsetHeight : 70;
  };

  const closeMobileMenu = () => {
    mobileNav.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    isMobileMenuOpen = false;
    
    // Reset hamburger animation
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  };

  const openMobileMenu = () => {
    mobileNav.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    isMobileMenuOpen = true;
    
    // Animação do hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  };

  /* SCROLL SUAVE - FUNÇÃO PRINCIPAL */
  const smoothScrollTo = (targetId) => {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const headerHeight = getHeaderHeight();
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  /* MANIPULADOR DE CLIQUE PARA TODOS OS LINKS ÂNCORA */
  const handleSmoothScrollClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    
    // Ignorar se não for âncora interna
    if (!href || !href.startsWith('#') || href === '#') return;
    
    e.preventDefault();
    
    // Fechar menu mobile se estiver aberto
    if (isMobileMenuOpen) {
      closeMobileMenu();
      
      // Pequeno delay para garantir que o menu fechou
      setTimeout(() => {
        smoothScrollTo(href);
      }, 100);
    } else {
      smoothScrollTo(href);
    }
  };

  /* INICIALIZAR TODOS OS EVENT LISTENERS */
  const initEventListeners = () => {
    // Hamburger menu
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if (isMobileMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Links do menu desktop
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', handleSmoothScrollClick);
    });

    // Links do menu mobile
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', handleSmoothScrollClick);
    });

    // Botões da hero section (View Projects e Get in touch)
    document.querySelectorAll('.hero-ctas a[href^="#"]').forEach(link => {
      link.addEventListener('click', handleSmoothScrollClick);
    });

    // Fechar menu ao clicar fora (overlay)
    document.addEventListener('click', (e) => {
      if (isMobileMenuOpen && 
          !mobileNav.contains(e.target) && 
          !hamburger.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    });
  };

  /* TOGGLE DE TEMA */
  const initThemeToggle = () => {
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
  };

  /* HIGHLIGHT NAV ON SCROLL */
  const initScrollHighlight = () => {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNavOnScroll = () => {
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
    };
    
    // Debounce para performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(highlightNavOnScroll, 50);
    });
    
    // Executar uma vez ao carregar
    highlightNavOnScroll();
  };

  /* OTIMIZAÇÃO PARA iOS */
  const initIOSOptimization = () => {
    const checkIOS = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        const whatsappFloat = document.getElementById('whatsapp-float');
        if (whatsappFloat) {
          whatsappFloat.style.bottom = 'calc(20px + env(safe-area-inset-bottom))';
        }
      }
    };
    
    checkIOS();
    window.addEventListener('resize', checkIOS);
  };

  /* INICIALIZAÇÃO */
  const init = () => {
    initEventListeners();
    initThemeToggle();
    initScrollHighlight();
    initIOSOptimization();
  };

  // Iniciar tudo
  init();
});