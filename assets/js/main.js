document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
    });
    
    // Projects Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card, .gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animated Counters (hero stats)
    function animateCount(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        const duration = 1600;
        const startTime = performance.now();
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            el.textContent = target;
            return;
        }
        function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(tick);
    }
    
    // Scroll reveal + counters (single IntersectionObserver)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        document.querySelectorAll('.el-stagger').forEach(el => observer.observe(el));
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        document.querySelectorAll('.count[data-count]').forEach(el => countObserver.observe(el));
    } else {
        // Fallback: reveal everything, set counters
        document.querySelectorAll('.reveal, .el-stagger').forEach(el => el.classList.add('in-view'));
        document.querySelectorAll('.count[data-count]').forEach(el => {
            el.textContent = el.getAttribute('data-count');
        });
    }
    
    // Lead magnet form (progress hint, no opaque failure)
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            const emailInput = leadForm.querySelector('input[type="email"]');
            if (emailInput && !emailInput.value.trim()) {
                e.preventDefault();
                emailInput.focus();
            }
        });
    }
    
    // Testimonials Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let slideIndex = 0;
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        const dotsWrap = document.querySelector('.testimonial-dots');
        
        function showSlide(index) {
            slideIndex = index;
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${-100 * (i - index)}%)`;
            });
            if (dotsWrap) {
                const dots = dotsWrap.querySelectorAll('.dot');
                dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            }
        }
        
        function nextSlide() {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide(slideIndex);
        }
        
        function prevSlide() {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            showSlide(slideIndex);
        }
        
        function stopAuto() {
            clearInterval(testimonialSlider._auto);
            testimonialSlider._auto = null;
        }
        
        function startAuto() {
            if (!testimonialSlider._auto) {
                testimonialSlider._auto = setInterval(nextSlide, 5000);
            }
        }
        
        // Build dots
        if (dotsWrap && slides.length > 0) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'dot';
                dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
                dot.addEventListener('click', () => showSlide(i));
                dotsWrap.appendChild(dot);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => { prevSlide(); stopAuto(); });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => { nextSlide(); stopAuto(); });
        }
        
        // Pause on hover, resume on leave
        testimonialSlider.addEventListener('mouseenter', stopAuto);
        testimonialSlider.addEventListener('mouseleave', startAuto);
        
        // Auto-advance every 5 seconds
        testimonialSlider._auto = setInterval(nextSlide, 5000);
        
        // Initialize
        showSlide(0);
    }
    
    // Back to top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Add active class to header on scroll
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
    
    // Add scroll-based styling to header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
            header.style.backgroundColor = 'rgba(255,255,255,0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.backgroundColor = 'white';
        }
    });
});