(() => {
    // === AOS Initialization ===
    if (window.AOS) {
        AOS.init({ duration: 1000, once: true, offset: 50 });
    }

    // === Navbar Scroll & Indicator ===
    const navbar = document.getElementById('mainNavbar');
    const scrollIndicator = document.getElementById('scrollIndicator');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        if (scrollIndicator) scrollIndicator.style.width = scrollPercent + '%';
        if (navbar) navbar.classList.toggle('scrolled', scrollTop > 50);
        // Active link highlighting
        document.querySelectorAll('section[id]').forEach(section => {
            const navLinks = document.querySelectorAll('.nav-link');
            if (window.pageYOffset >= section.offsetTop - 200) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
                });
            }
        });
    });

    // === Smooth Scroll (delegated) ===
    document.body.addEventListener('click', e => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

    // === Navbar Toggler (Bootstrap) ===
    document.addEventListener("DOMContentLoaded", () => {
        const toggler = document.querySelector(".navbar-toggler");
        const navbarContent = document.getElementById("navbarContent");
        if (toggler && navbarContent && window.bootstrap) {
            const bsCollapse = new bootstrap.Collapse(navbarContent, { toggle: false });
            toggler.addEventListener("click", () => {
                navbarContent.classList.contains("show") ? bsCollapse.hide() : bsCollapse.show();
            });
            document.addEventListener("click", event => {
                if (
                    !navbarContent.contains(event.target) &&
                    !toggler.contains(event.target) &&
                    navbarContent.classList.contains("show") &&
                    window.innerWidth < 992
                ) {
                    bsCollapse.hide();
                }
            });
        }
    });

    // === Counter Animation ===
    function animateCounters(selector = '[data-count]') {
        document.querySelectorAll(selector).forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000, increment = target / (duration / 16);
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
    // Intersection Observer for counters
    const statsSection = document.querySelector('.tech-stats-home');
    if (statsSection) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
        observer.observe(statsSection);
    }

    // === Particle System ===
    function createParticle() {
        const particles = document.getElementById('particles');
        if (!particles) return;
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particles.appendChild(particle);
        setTimeout(() => particle.remove(), 25000);
    }
    setInterval(createParticle, 3000);

    // === Parallax Hero Image ===
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        document.addEventListener('mousemove', e => {
            const rect = heroImg.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const centerX = rect.width / 2, centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (centerX - x) / centerX * 5;
            heroImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }


// from github





    // === GSAP Animations (Service, CEO, etc.) ===
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Service Cards Animation
        gsap.to('.service-card', {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.services-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
        });
        // Stats Animation
        gsap.to('.stat-item', {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: '.stats-bar', start: 'top 90%', toggleActions: 'play none none reverse' }
        });
        // CEO Section Animation
        gsap.to('.ceo-container', {
            opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.ceo-section', start: 'top 70%', toggleActions: 'play none none reverse' }
        });
        // Parallax for floating shapes (example)
        if (window.innerWidth > 768) {
            ['.shape:nth-child(1)', '.shape:nth-child(2)', '.shape:nth-child(3)'].forEach((selector, i) => {
                gsap.to(selector, {
                    y: [-50, -30, -40][i], x: [0, -20, 30][i], duration: 1, ease: 'none',
                    scrollTrigger: { trigger: '.services-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
                });
            });
        }
    }

    // === Logo Slider Pause/Resume ===
    const logoSlider = document.getElementById('logoSlider');
    const logoTrack = document.getElementById('logoTrack');
    if (logoSlider && logoTrack) {
        logoSlider.addEventListener('mouseenter', () => logoTrack.style.animationPlayState = 'paused');
        logoSlider.addEventListener('mouseleave', () => logoTrack.style.animationPlayState = 'running');
    }

    // === Floating Elements Mouse Parallax ===
    document.addEventListener('mousemove', e => {
        document.querySelectorAll('.floating-element').forEach((el, i) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30 * (i + 1) * 0.01;
            const y = (e.clientY / window.innerHeight - 0.5) * 30 * (i + 1) * 0.01;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
        });
    });

    // === Contact Form Submission ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            if (!submitBtn || !successMessage || !errorMessage) return;
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i><span>Sending...</span>';
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    successMessage.style.display = 'flex';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i><span>Send Message</span>';
                    }, 2000);
                } else {
                    errorMessage.style.display = 'flex';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i><span>Send Message</span>';
                }
            }, 2000);
        });
    }

    // === Newsletter Form Submission ===
    const newsletterForm = document.querySelector('.newsletter-form form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            const btn = this.querySelector('.newsletter-btn');
            if (email && btn) {
                btn.innerHTML = '<i class="fas fa-check me-2"></i>Subscribed!';
                btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Subscribe';
                    btn.style.background = 'var(--primary-gradient)';
                    this.querySelector('.newsletter-input').value = '';
                }, 3000);
            }
        });
    }

    // === Miscellaneous UI Enhancements ===
    // Floating contact button scroll
    const floatingContact = document.querySelector('.floating-contact');
    if (floatingContact) {
        floatingContact.addEventListener('click', e => {
            e.preventDefault();
            const contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    // Map click simulation
    // const mapBtn = document.querySelector('.map-placeholder button');
    // if (mapBtn) {
    //     mapBtn.addEventListener('click', () => {
    //         alert('Opening directions to: 123 Tech Street, Digital City, DC 12345');
    //     });
    // }
    // Typing effect for message placeholder
    const messageField = document.querySelector('textarea[name="message"]');
    if (messageField) {
        const placeholders = [
            "Tell us about your project requirements...",
            "What's your timeline for this project?",
            "Do you have any specific technology preferences?",
            "What's your budget range for this project?",
            "Tell us about your business goals..."
        ];
        let currentPlaceholder = 0;
        setInterval(() => {
            if (document.activeElement !== messageField) {
                messageField.placeholder = placeholders[currentPlaceholder];
                currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
            }
        }, 3000);
    }
    // Real-time form validation
    document.querySelectorAll('input[required], textarea[required]').forEach(field => {
        field.addEventListener('input', function () {
            this.style.borderColor = this.value.trim() ? 'var(--success-color)' : 'rgba(40, 66, 131, 0.1)';
        });
    });
    // Contact item hover effect
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', () => item.style.transform = 'translateX(10px) scale(1.02)');
        item.addEventListener('mouseleave', () => item.style.transform = 'translateX(0) scale(1)');
    });

    // === Footer Particles ===
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    document.addEventListener('DOMContentLoaded', createParticles);

    // === Performance: Reduce animation on low-end devices ===
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-duration', '60s');
    }
})();


