const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});


mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});


const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    try {
        
        console.log('Form submitted:', formProps);
        alert('Message sent successfully!');
        contactForm.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    }
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.querySelectorAll('.project-card, .skill-category, section').forEach(
    el => observer.observe(el)
);

/**
 * Animation and interactive elements for the portfolio
 */
document.addEventListener('DOMContentLoaded', () => {
  // Apply special glow effect to AI Face detective card
  const applyPermanentGlow = () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const heading = card.querySelector('h3');
      if (heading && heading.textContent.includes('AI Face detective')) {
        card.classList.add('permanent-glow');
        
        // Create a permanent glow element
        const glowElement = document.createElement('div');
        glowElement.classList.add('card-glow', 'permanent');
        
        // Add glow styles based on current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || 
                           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        const glowColor = currentTheme === 'dark' ? 'rgba(76, 201, 240, 0.4)' : 'rgba(67, 97, 238, 0.3)';
        
        Object.assign(glowElement.style, {
          position: 'absolute',
          bottom: '-15px',
          left: '10%',
          width: '80%',
          height: '25px',
          borderRadius: '50%',
          background: glowColor,
          filter: 'blur(20px)',
          opacity: '0.7',
          zIndex: '-1',
          pointerEvents: 'none',
          animation: 'pulseGlow 3s infinite alternate ease-in-out'
        });
        
        card.appendChild(glowElement);
      }
    });
  };
  
  // Apply the permanent glow effect
  applyPermanentGlow();
  
  // Update the glow effect when theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        // Remove existing permanent glows
        document.querySelectorAll('.card-glow.permanent').forEach(el => el.remove());
        
        // Re-apply with the new theme
        applyPermanentGlow();
      }
    });
  });
  
  // Observe theme changes
  observer.observe(document.documentElement, { attributes: true });
  
  // Typing animation for header
  const headerTitle = document.querySelector('header h1');
  const headerText = document.querySelector('header p');
  
  if (headerTitle && headerText) {
    // Add classes for animation
    headerTitle.classList.add('animate-in');
    
    // Stagger the subtitle animation
    setTimeout(() => {
      headerText.classList.add('animate-in');
    }, 500);
  }
  
  // Project card hover effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('card-hover');
      
      // Don't add hover glow if this card already has permanent glow
      if (!this.classList.contains('permanent-glow')) {
        // Start the glow animation
        animateGlow(this);
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-hover');
      
      // Only remove non-permanent glows
      const glowElement = this.querySelector('.card-glow:not(.permanent)');
      if (glowElement) {
        glowElement.remove();
      }
    });
  });
  
  // Function to animate the glow effect
  function animateGlow(card) {
    // Check if there's already a glow element
    let glowElement = card.querySelector('.card-glow:not(.permanent)');
    
    if (!glowElement) {
      // Create a glow element
      glowElement = document.createElement('div');
      glowElement.classList.add('card-glow');
      
      // Add glow styles
      Object.assign(glowElement.style, {
        position: 'absolute',
        bottom: '-20px',
        left: '10%',
        width: '80%',
        height: '25px',
        borderRadius: '50%',
        background: 'var(--accent-color)',
        filter: 'blur(25px)',
        opacity: '0',
        zIndex: '-1',
        pointerEvents: 'none'
      });
      
      card.appendChild(glowElement);
    }
    
    // Animate the glow
    let opacity = 0;
    let increasing = true;
    const glowInterval = setInterval(() => {
      if (!card.classList.contains('card-hover')) {
        clearInterval(glowInterval);
        return;
      }
      
      if (increasing) {
        opacity += 0.02;
        if (opacity >= 0.6) {
          increasing = false;
        }
      } else {
        opacity -= 0.02;
        if (opacity <= 0.3) {
          increasing = true;
        }
      }
      
      glowElement.style.opacity = opacity;
    }, 50);
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Add active class to the clicked nav link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        
        // Smooth scroll to the section
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Offset for the sticky header
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
  
  // Add parallax effect to header
  document.addEventListener('mousemove', parallax);
  
  function parallax(e) {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Get the mouse position
    const x = e.clientX;
    const y = e.clientY;
    
    // Get header dimensions
    const headerWidth = header.offsetWidth;
    const headerHeight = header.offsetHeight;
    
    // Calculate the percentage position
    const xPercent = (x / headerWidth) * 100;
    const yPercent = (y / headerHeight) * 100;
    
    // Move header background slightly for parallax effect
    header.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  }
  
  // Add a subtle tilt effect to skill tags
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width) - 0.5;
      const yPercent = (y / rect.height) - 0.5;
      
      const rotateX = yPercent * 10; // Rotation intensity
      const rotateY = xPercent * -10;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
  
  // Add subtle animations to contact links
  const contactLinks = document.querySelectorAll('.contact-links a');
  
  contactLinks.forEach((link, index) => {
    // Add staggered animation delay
    link.style.animationDelay = `${index * 0.1}s`;
    link.classList.add('bounce-in');
    
    // Add hover animation
    link.addEventListener('mouseenter', function() {
      this.classList.add('pulse');
    });
    
    link.addEventListener('mouseleave', function() {
      this.classList.remove('pulse');
    });
  });
});