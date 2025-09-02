/**
 * Enhanced Portfolio JavaScript with Mobile Menu and Enhanced Interactions
 */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('nav ul');
  
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Add active class to the clicked nav link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll to the section
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Highlight active section in navigation
  const sections = document.querySelectorAll('.section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Enhanced parallax effect for header
  document.addEventListener('mousemove', parallax);
  
  function parallax(e) {
    const header = document.querySelector('header');
    if (!header) return;
    
    const x = e.clientX;
    const y = e.clientY;
    const headerWidth = header.offsetWidth;
    const headerHeight = header.offsetHeight;
    
    const xPercent = (x / headerWidth) * 100;
    const yPercent = (y / headerHeight) * 100;
    
    header.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  }
  
  // Enhanced skill tag interactions
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('click', () => {
      tag.style.transform = 'scale(1.1) rotate(5deg)';
      setTimeout(() => {
        tag.style.transform = 'scale(1) rotate(0deg)';
      }, 300);
    });
  });
  
  // Project card hover effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Dynamic Code Snippet Generation
  const codeSnippets = [
    'const skills = ["JavaScript", "React", "Node.js"];',
    'function buildPortfolio() { return "Success!"; }',
    'npm install @awesome/developer',
    'git push origin main',
    'console.log("Hello, World!");',
    'const project = { name: "Portfolio", type: "Web" };',
    'if (user === "developer") { hire(); }',
    'async function deploy() { await build(); }',
    'const tech = ["AI", "ML", "Web3"];',
    'function innovate() { return "Future"; }',
    'npm run build && npm start',
    'const experience = "5+ years";',
    'git commit -m "Added new features"',
    'function solveProblem() { return "Solution"; }',
    'const passion = "Technology";'
  ];
  
  function createDynamicCodeSnippet() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const snippet = document.createElement('div');
    snippet.className = 'code-snippet';
    snippet.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    
    // Random positioning
    snippet.style.left = Math.random() * 80 + 10 + '%';
    snippet.style.top = Math.random() * 80 + 10 + '%';
    snippet.style.animationDelay = Math.random() * 5 + 's';
    snippet.style.animationDuration = (Math.random() * 20 + 20) + 's';
    
    header.appendChild(snippet);
    
    // Remove snippet after animation
    setTimeout(() => {
      if (snippet.parentNode) {
        snippet.parentNode.removeChild(snippet);
      }
    }, 40000);
  }
  
  // Create new code snippets periodically
  setInterval(createDynamicCodeSnippet, 8000);
  
  // Enhanced Matrix Rain Effect
  function createMatrixRain() {
    const matrixRain = document.querySelector('.matrix-rain');
    if (!matrixRain) return;
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    const columns = matrixRain.querySelectorAll('.matrix-column');
    columns.forEach((column, index) => {
      // Create multiple characters per column
      for (let i = 0; i < 20; i++) {
        const char = document.createElement('div');
        char.textContent = characters[Math.floor(Math.random() * characters.length)];
        char.style.position = 'absolute';
        char.style.top = (i * 20) + 'px';
        char.style.animationDelay = (i * 0.1) + 's';
        char.style.animationDuration = (8 + Math.random() * 4) + 's';
        char.style.opacity = Math.random() * 0.5 + 0.3;
        char.style.color = `rgba(76, 201, 240, ${Math.random() * 0.4 + 0.2})`;
        
        column.appendChild(char);
      }
    });
  }
  
  // Initialize matrix rain
  createMatrixRain();
  
  // Scroll Progress Indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });
  
  // Back to Top Button
  const backToTop = document.createElement('a');
  backToTop.href = '#';
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Enhanced contact link animations
  const contactLinks = document.querySelectorAll('.contact-links a');
  contactLinks.forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
    link.classList.add('bounce-in');
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe sections for animation
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
  });
  
  // Enhanced theme toggle with haptic feedback
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Add haptic feedback for mobile devices
      if (navigator.vibrate && isTouchDevice()) {
        navigator.vibrate(50);
      }
      
      // Add click animation
      themeToggle.style.transform = 'scale(0.9)';
      setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
      }, 150);
    });
  }
  
  // Touch device detection
  function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
  }
  
  // Enhanced CTA button interaction
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add click effect
      ctaButton.style.transform = 'scale(0.95)';
      setTimeout(() => {
        ctaButton.style.transform = 'scale(1)';
      }, 150);
      
      // Smooth scroll to contact section
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  }
  
  // Performance optimization: Throttle scroll events
  let ticking = false;
  
  function updateOnScroll() {
    ticking = false;
    // Update scroll progress and back to top visibility
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }
    
    if (backToTop) {
      if (scrollTop > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });
  
  // Initialize animations on page load
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});