// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }

    // Set active nav link based on current page
    setActiveNavLink();

    // Smooth scroll for back to top
    const backToTopLink = document.querySelector('.back-to-top');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    initializeIntersectionObserver();

    // Animate skill bars when they come into view
    animateSkillBars();

    // Add scroll indicator visibility
    handleScrollIndicator();

    // Close mobile menu on link click
    closeMenuOnNavigation();
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize Intersection Observer for fade-in animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const elementsToObserve = document.querySelectorAll(
        '.stat-card, .featured-card, .mission-card, .vision-card, ' +
        '.value-card, .achievement-card, .skill-card, .soft-skill, ' +
        '.tool-category, .language-card, .education-item, .timeline-item'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.animation = `fillBar 1.5s ease-out forwards`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillSections = document.querySelectorAll('.skills-grid, .language-grid');
    skillSections.forEach(section => {
        observer.observe(section);
    });
}

// Handle scroll indicator visibility
function handleScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.display = 'none';
        } else {
            scrollIndicator.style.display = 'flex';
        }
    });
}

// Close menu on navigation
function closeMenuOnNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                if (navbarMenu) {
                    navbarMenu.classList.remove('active');
                }
            }
        });
    });
}

// Smooth scroll behavior for internal links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    
    // Check if it's an internal anchor link
    if (href && href.startsWith('#') && !href.includes('.html')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add click tracking for buttons
document.addEventListener('click', function(e) {
    const button = e.target.closest('.btn');
    if (button) {
        // Add a subtle animation on click
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
});

// Handle window resize for responsive behavior
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu on resize to desktop
        const hamburger = document.querySelector('.hamburger');
        const navbarMenu = document.querySelector('.navbar-menu');
        
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (navbarMenu) navbarMenu.classList.remove('active');
        }
    }, 250);
});

// Scroll to page header when navigating between pages
window.addEventListener('load', function() {
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader && window.location.pathname !== window.location.pathname.split('/')[0]) {
        setTimeout(() => {
            pageHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
});

// Add loading state for links with download attribute
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[download]');
    if (link && !link.classList.contains('loading')) {
        link.classList.add('loading');
        setTimeout(() => {
            link.classList.remove('loading');
        }, 2000);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navbarMenu = document.querySelector('.navbar-menu');
        
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            if (navbarMenu) {
                navbarMenu.classList.remove('active');
            }
        }
    }

    // Skip to main content (Ctrl/Cmd + Shift + M)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
            main.focus();
            main.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add focus visible styles for accessibility
document.addEventListener('keydown', function() {
    document.body.classList.add('keyboard-nav');
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Dynamically add aria-labels to social links if missing
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    const socialPlatforms = {
        'github.com': 'GitHub',
        'linkedin.com': 'LinkedIn',
        'facebook.com': 'Facebook',
        'instagram.com': 'Instagram'
    };

    socialLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        let platform = 'Social Media';

        for (let [domain, name] of Object.entries(socialPlatforms)) {
            if (href.includes(domain)) {
                platform = name;
                break;
            }
        }

        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `Visit my ${platform} profile`);
        }
    });
});

// Add animation to stat numbers
function animateCountUp(element, targetValue, duration = 2000) {
    const finalValue = parseInt(targetValue);
    const increment = finalValue / (duration / 16);
    let currentValue = 0;

    const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = targetValue;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(currentValue) + '+';
        }
    }, 16);
}

// Trigger stat animation when visible
const observerOptions = {
    threshold: 0.5
};

const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.dataset.animated) {
                    const value = stat.textContent.replace(/[^0-9]/g, '');
                    animateCountUp(stat, stat.textContent);
                    stat.dataset.animated = 'true';
                }
            });
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statObserver.observe(statsContainer);
}

// Intersection Observer for parallax-like effect on hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}

// Form handling (if contact form exists)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Add your form submission logic here
        // This is a placeholder for custom form handling
    });
}

// Prefetch navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.html')) {
            const link_element = document.createElement('link');
            link_element.rel = 'prefetch';
            link_element.href = href;
            document.head.appendChild(link_element);
        }
    });
});

// Add utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Log page performance
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below to enable service worker
        // navigator.serviceWorker.register('sw.js').catch(err => {
        //     console.log('Service Worker registration failed:', err);
        // });
    });
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// Export functions for potential external use
window.portfolioUtils = {
    scrollToElement: function(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },
    setActiveNav: setActiveNavLink,
    animateSkillBars: animateSkillBars,
    isInViewport: isInViewport
};
