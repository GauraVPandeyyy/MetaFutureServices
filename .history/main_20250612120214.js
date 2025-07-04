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


// SERVICE JS




















// CEO JS

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeInteractions();
});

function initializeAnimations() {
    // Main container entrance
    gsap.to('.ceo-container', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.ceo-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // Staggered content animations
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.content-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    timeline
        .to('.section-badge', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('.welcome-title', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.welcome-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.welcome-message', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3')
        .to('.stats-mini', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2')
        .to('.ceo-info', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2');

    // Photo container animation
    gsap.to('.photo-container', {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.photo-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Counter animation for mini stats
    const statNumbers = document.querySelectorAll('.stat-mini-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numValue = parseInt(finalValue);

        gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            onUpdate: function () {
                const current = Math.ceil(this.targets()[0].textContent);
                if (finalValue.includes('+')) {
                    stat.textContent = current + '+';
                } else {
                    stat.textContent = current;
                }
            }
        });
    });

    // Parallax effects for floating elements
    if (window.innerWidth > 768) {
        gsap.to('.floating-element:nth-child(1)', {
            y: -40,
            x: -20,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.ceo-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.floating-element:nth-child(2)', {
            y: -60,
            x: 30,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.ceo-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.floating-element:nth-child(3)', {
            y: -30,
            x: -10,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.ceo-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
}

function initializeInteractions() {
    const photoMain = document.querySelector('.photo-main');
    const ceoContainer = document.querySelector('.ceo-container');

    // Enhanced photo hover effect
    photoMain.addEventListener('mouseenter', function () {
        gsap.to(this, {
            scale: 1.05,
            rotation: 2,
            duration: 0.6,
            ease: 'power2.out'
        });

        gsap.to('.photo-decoration', {
            scale: 1.3,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1
        });
    });

    photoMain.addEventListener('mouseleave', function () {
        gsap.to(this, {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'power2.out'
        });

        gsap.to('.photo-decoration', {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1
        });
    });

    // Container hover effect
    ceoContainer.addEventListener('mouseenter', function () {
        gsap.to(this, {
            y: -5,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    ceoContainer.addEventListener('mouseleave', function () {
        gsap.to(this, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    // Badge hover effect
    const badge = document.querySelector('.section-badge');
    badge.addEventListener('mouseenter', function () {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    badge.addEventListener('mouseleave', function () {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}

// Intersection Observer for performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe key elements
document.querySelectorAll('.ceo-container, .photo-container').forEach(el => {
    observer.observe(el);
});