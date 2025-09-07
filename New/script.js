document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for all navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      // Make sure the target element exists
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 3D effect for category cards
  const categories = document.querySelectorAll('.category');
  categories.forEach(category => {
    category.addEventListener('mousemove', e => {
      const rect = category.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      category.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      category.style.transition = 'transform 0.1s';
    });
    
    category.addEventListener('mouseleave', () => {
      category.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      category.style.transition = 'transform 0.3s';
    });
  });
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input').value;
      alert(`Thank you for subscribing with: ${email}`);
      newsletterForm.reset();
    });
  }
  
  // Navbar background change on scroll
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (nav) {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
      }
    }
  });
  
  // Parallax scroll effect
  const headerBg = document.querySelector('.header-bg');
  if (headerBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      headerBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
  }
  
  // Smooth scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }
});