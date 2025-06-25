

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

// File upload handling
function setupFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');

    fileInputs.forEach(input => {
        input.addEventListener('change', function () {
            const fileName = this.files[0] ? this.files[0].name : '';
            const fileNameDiv = this.parentNode.querySelector('.file-name');
            const uploadBtn = this.parentNode.querySelector('.file-upload-btn span');

            if (fileName) {
                fileNameDiv.textContent = `Selected: ${fileName}`;
                fileNameDiv.style.display = 'block';
                uploadBtn.textContent = 'Change File';
            } else {
                fileNameDiv.style.display = 'none';
                uploadBtn.textContent = input.name === 'resume' ? 'Upload Resume' : 'Upload Cover Letter';
            }
        });
    });
}

// Form validation
function validateForm() {
    const form = document.getElementById('careerForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    // Reset previous errors
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            const errorMsg = field.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.style.display = 'block';
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            field.classList.add('error');
            const errorMsg = field.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = 'Please enter a valid email address';
                errorMsg.style.display = 'block';
            }
            isValid = false;
        }
    });

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form submission
function setupFormSubmission() {
    const form = document.getElementById('careerForm');
    const submitBtn = document.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        btnText.textContent = 'Submitting...';

        // Simulate form submission
        setTimeout(() => {
            // Hide loading state
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Submit Application';

            // Show success message
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth' });

            // Reset form after a delay
            setTimeout(() => {
                form.reset();
                document.querySelectorAll('.file-name').forEach(el => {
                    el.style.display = 'none';
                });
                document.querySelectorAll('.file-upload-btn span').forEach((el, index) => {
                    el.textContent = index === 0 ? 'Upload Resume' : 'Upload Cover Letter';
                });
                successMessage.style.display = 'none';
            }, 3000);

        }, 2000);
    });
}

// Real-time validation
function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.hasAttribute('required')) {
                if (!this.value.trim()) {
                    this.classList.add('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) errorMsg.style.display = 'block';
                } else {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) errorMsg.style.display = 'none';

                    // Special validation for email
                    if (this.type === 'email' && !isValidEmail(this.value)) {
                        this.classList.add('error');
                        if (errorMsg) {
                            errorMsg.textContent = 'Please enter a valid email address';
                            errorMsg.style.display = 'block';
                        }
                    }
                }
            }
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error') && this.value.trim()) {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) errorMsg.style.display = 'none';
            }
        });
    });
}

// Smooth scroll for navigation
function setupSmoothScroll() {
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
}

// Enhanced form interactions
function setupFormEnhancements() {
    // Add focus effects to form groups
    const formControls = document.querySelectorAll('.form-control, .form-select');

    formControls.forEach(control => {
        control.addEventListener('focus', function () {
            this.closest('.form-group').style.transform = 'translateY(-1px)';
        });

        control.addEventListener('blur', function () {
            this.closest('.form-group').style.transform = 'translateY(0)';
        });
    });

    // Enhanced checkbox interactions
    const checkboxes = document.querySelectorAll('.form-check-input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                this.parentNode.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.parentNode.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Progress indicator
function setupProgressIndicator() {
    const form = document.getElementById('careerForm');
    const formGroups = form.querySelectorAll('.form-group');
    let completedSections = 0;

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #667eea, #764ba2);
                z-index: 9999;
                transition: width 0.3s ease;
            `;
    document.body.appendChild(progressBar);

    function updateProgress() {
        const totalFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        const completedFields = Array.from(totalFields).filter(field => {
            if (field.type === 'checkbox') return field.checked;
            return field.value.trim() !== '';
        });

        const progress = (completedFields.length / totalFields.length) * 100;
        progressBar.style.width = progress + '%';
    }

    // Update progress on input
    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    setupFileUploads();
    setupFormSubmission();
    setupRealTimeValidation();
    setupSmoothScroll();
    setupFormEnhancements();
    setupProgressIndicator();

    // Add staggered animation to form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = (index * 0.1) + 's';
    });

    // Add typing effect to hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };

    setTimeout(typeWriter, 1000);
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

