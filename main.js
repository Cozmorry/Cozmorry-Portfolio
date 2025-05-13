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
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-hover');
    });
  });
  
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