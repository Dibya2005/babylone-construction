// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-content');
  animateElements.forEach(el => {
    observer.observe(el);
  });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;

    // Basic validation
    if (!name || !email || !service || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate form submission
    showNotification('Thank you! Your message has been sent. We will get back to you soon.', 'success');
    this.reset();
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat h3');
  const speed = 200;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target') || parseInt(counter.innerText);
      const count = +counter.innerText.replace(/\D/g, '');
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment) + (counter.innerText.includes('+') ? '+' : '') + (counter.innerText.includes('%') ? '%' : '');
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target + (counter.innerText.includes('+') ? '+' : '') + (counter.innerText.includes('%') ? '%' : '');
      }
    };
    updateCount();
  });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  aboutObserver.observe(aboutSection);
}

// Add loading animation to page elements
window.addEventListener('load', () => {
  const loadingElements = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-content');
  loadingElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('loaded');
    }, index * 100);
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add active class to current navigation item
function updateActiveNavItem() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavItem);

// Phone number functionality
function initializePhoneNumbers() {
  const phoneLinks = document.querySelectorAll('.phone-link');

  phoneLinks.forEach(link => {
    // Add click tracking
    link.addEventListener('click', function (e) {
      const phoneNumber = this.getAttribute('href').replace('tel:', '');

      // Track phone call click (you can integrate with analytics here)
      console.log('Phone call initiated:', phoneNumber);

      // Show notification for mobile devices
      if (isMobileDevice()) {
        showNotification('Initiating call to ' + phoneNumber, 'info');
      }

      // Add visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });

    // Add hover effect for desktop
    if (!isMobileDevice()) {
      link.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
      });

      link.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
      });
    }
  });
}

// Check if device is mobile
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Copy phone number to clipboard functionality
function addCopyPhoneFunctionality() {
  const phoneLinks = document.querySelectorAll('.phone-link');

  phoneLinks.forEach(link => {
    // Add right-click context menu for copy
    link.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      const phoneNumber = this.getAttribute('href').replace('tel:', '');

      if (navigator.clipboard) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
          showNotification('Phone number copied to clipboard!', 'success');
        }).catch(() => {
          showNotification('Failed to copy phone number', 'error');
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Phone number copied to clipboard!', 'success');
      }
    });
  });
}

// Initialize phone functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializePhoneNumbers();
  addCopyPhoneFunctionality();
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3498db !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .phone-link {
        cursor: pointer;
        user-select: none;
    }
    
    .phone-link:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style); 