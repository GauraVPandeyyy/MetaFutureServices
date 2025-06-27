// Initialize AOS
AOS.init({
    duration: 600,
    easing: 'ease-out-cubic',
    once: true
});

// Create animated particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Smooth scrolling for anchor links
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

// Handle window resize for responsive adjustments
window.addEventListener('resize', function () {
    // Recalculate any dynamic elements if needed
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
    });
});

// Keyboard navigation enhancements
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.matches('.form-control, .form-select')) {
        e.preventDefault();
        const formElements = Array.from(document.querySelectorAll('.form-control, .form-select, .form-check-input'));
        const currentIndex = formElements.indexOf(e.target);
        const nextElement = formElements[currentIndex + 1];

        if (nextElement) {
            nextElement.focus();
        }
    }
});

// --- Merge all DOMContentLoaded logic here ---
document.addEventListener('DOMContentLoaded', function () {
    // Hero title animation
    createParticles();
    gsap.from(".hero-title", {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
    });

    // Floating animation for tech icons
    gsap.to(".tech-icon", {
        duration: 8,
        y: -30,
        rotation: 360,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
            each: 0.5,
            repeat: -1
        }
    });

    // Culture highlights stagger animation
    gsap.from(".culture-item", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.1,
        delay: 1
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));

        if (!isNaN(numericValue)) {
            gsap.from(stat, {
                duration: 2,
                textContent: 0,
                roundProps: "textContent",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                onUpdate: function () {
                    const current = Math.round(this.targets()[0].textContent);
                    const suffix = finalValue.replace(/[\d]/g, '');
                    stat.textContent = current + suffix;
                }
            });
        }
    });

    // Button hover animations
    document.querySelectorAll('.btn-apply-now, .btn-learn-more').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', function () {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });

    // --- Form logic ---
    const form = document.getElementById('applicationForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const successMessage = document.getElementById('successMessage');
    const modal = document.getElementById('applyModal');
    const bootstrapModal = new bootstrap.Modal(modal);

    // File upload handling
    const fileInput = document.getElementById('resume');
    const fileLabel = fileInput.nextElementSibling;
    const fileText = fileLabel.querySelector('.file-upload-text');

    fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            fileText.textContent = fileName;
            fileLabel.classList.add('file-selected');
            clearError('resume');
        } else {
            fileText.textContent = 'Choose Resume File';
            fileLabel.classList.remove('file-selected');
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (this.value.trim()) {
                clearError(this.name);
            }
        });

        input.addEventListener('blur', function () {
            validateField(this);
        });
    });

    // Form submission
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return; // Stop if any field is invalid

        // All fields valid, submit form
        submitBtn.disabled = true;
        btnText.innerHTML = '<span class="loading"></span>Submitting...';

        const formData = new FormData(form);

        try {
            const response = await fetch('https://mfs.winxx777.live/api/send-resume', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.status) {
                // Show API success message
                form.style.display = 'none';
                successMessage.querySelector('h4').textContent = data.message || "Application Submitted Successfully!";
                successMessage.classList.add('show');
                setTimeout(() => {
                    resetForm();
                    bootstrapModal.hide();
                }, 3000);
            } else {
                // Show API error message
                showError('resume', data.message || 'Submission failed. Please try again.');
                submitBtn.disabled = false;
                btnText.innerHTML = 'Submit Application';
            }
        } catch (err) {
            showError('resume', 'Network error. Please try again.');
            submitBtn.disabled = false;
            btnText.innerHTML = 'Submit Application';
        }
    });

    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        let isValid = true;

        if (!value) {
            showError(fieldName, 'This field is required.');
            isValid = false;
        } else if (fieldName === 'email' && !isValidEmail(value)) {
            showError(fieldName, 'Please enter a valid email address.');
            isValid = false;
        } else if (fieldName === 'resume') {
            const file = field.files[0];
            if (!file) {
                showError(fieldName, 'This field is required.');
                isValid = false;
            } else if (file.type !== "application/pdf") {
                showError(fieldName, 'Only PDF files are allowed.');
                isValid = false;
            } else if (file.size > 5 * 1024 * 1024) {
                showError(fieldName, 'File size must be less than 5MB.');
                isValid = false;
            } else {
                clearError(fieldName);
            }
        } else {
            clearError(fieldName);
        }

        return isValid;
    }

    function showError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const errorElement = document.getElementById(`${fieldName}Error`);

        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');

        // Add special handling for file upload
        if (fieldName === 'resume') {
            fileLabel.style.borderColor = '#e74c3c';
        }
    }

    function clearError(fieldName) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const errorElement = document.getElementById(`${fieldName}Error`);

        field.classList.remove('error');
        errorElement.classList.remove('show');

        // Add special handling for file upload
        if (fieldName === 'resume') {
            fileLabel.style.borderColor = '#284283';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function resetForm() {
        // Reset form
        form.reset();
        form.style.display = 'block';
        successMessage.classList.remove('show');

        // Reset submit button
        submitBtn.disabled = false;
        btnText.innerHTML = 'Submit Application';

        // Reset file upload display
        fileText.textContent = 'Choose Resume File';
        fileLabel.classList.remove('file-selected');

        // Clear all errors
        inputs.forEach(input => {
            clearError(input.name);
        });
    }

    // Reset form when modal is closed
    modal.addEventListener('hidden.bs.modal', function () {
        resetForm();
    });
});
