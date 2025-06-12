 // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    // Counter Animation
    function animateCounters() {
      const counters = document.querySelectorAll('[data-count]');

      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 16);
      });
    }

    // Start counter animation when in view
    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer1.disconnect();
        }
      });
    });

    const statsSection = document.querySelector('.tech-stats');
    if (statsSection) {
      observer1.observe(statsSection);
    }

    // Particle System
    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';

      document.getElementById('particles').appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 25000);
    }

    // Create particles periodically
    setInterval(createParticle, 3000);

    // Smooth scroll for CTA button
    document.querySelector('.btn-glow').addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });

    // Mouse parallax effect for hero image
    document.addEventListener('mousemove', (e) => {
      const heroImg = document.querySelector('.hero-img');
      const rect = heroImg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / centerY * 5;
      const rotateY = (centerX - x) / centerX * 5;

      heroImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Loading animation delay for staggered entrance
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });