// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeInteractions();
});

function initializeAnimations() {
    // Animate section title
    gsap.to('.section-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate section subtitle
    gsap.to('.section-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate service cards with stagger
    gsap.to('.service-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate stats
    gsap.to('.stat-item', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.stats-bar',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumber = !isNaN(parseFloat(finalValue));

        if (isNumber) {
            const numValue = parseFloat(finalValue);
            gsap.from(stat, {
                textContent: 0,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                onUpdate: function () {
                    if (finalValue.includes('+')) {
                        stat.textContent = Math.ceil(this.targets()[0].textContent) + '+';
                    } else if (finalValue.includes('%')) {
                        stat.textContent = Math.ceil(this.targets()[0].textContent) + '%';
                    } else if (finalValue.includes('/')) {
                        stat.textContent = finalValue; // Keep original for 24/7
                    }
                }
            });
        }
    });
}

function initializeInteractions() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function () {
            gsap.to(this.querySelector('.service-icon'), {
                scale: 1.1,
                rotation: 5,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(this, {
                y: -15,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function () {
            gsap.to(this.querySelector('.service-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: 'power2.out'
            });

            gsap.to(this, {
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        // Click interaction for mobile
        card.addEventListener('click', function () {
            const serviceType = this.dataset.service;

            // Pulse effect on click
            gsap.to(this, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });

            // Could integrate with your routing/modal system here
            console.log(`Service clicked: ${serviceType}`);
        });
    });

    // Parallax effect for floating shapes
    if (window.innerWidth > 768) {
        gsap.to('.shape:nth-child(1)', {
            y: -50,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.services-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.shape:nth-child(2)', {
            y: -30,
            x: -20,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.services-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        gsap.to('.shape:nth-child(3)', {
            y: -40,
            x: 30,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.services-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
}

// Optimize performance
let ticking = false;

function updateAnimations() {
    // Any continuous animations or updates can go here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
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
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});