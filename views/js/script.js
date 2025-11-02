// ============================================
// VIDEO HERO SECTION
// ============================================

const heroVideo = document.getElementById('heroVideo');

if (heroVideo) {
    // Ensure video plays on page load
    heroVideo.addEventListener('loadedmetadata', () => {
        heroVideo.play().catch(err => {
            console.log('Video autoplay failed:', err);
        });
    });

    // Force video load
    window.addEventListener('load', () => {
        if (heroVideo) {
            heroVideo.load();
        }
    });

    // Error handling
    heroVideo.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        } else {
            mobileMenu.classList.add('active');
            document.body.classList.add('menu-open');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking on backdrop
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('menu-open') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ============================================
// OWNER MODAL
// ============================================

const ownerModal = document.getElementById('owner-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const ownerLink = document.getElementById('owner-link');
const ownerLinkMobile = document.getElementById('owner-link-mobile');
const closeModalBtn = document.getElementById('close-modal');

// Open modal function
const openModal = (e) => {
    e.preventDefault();
    if (ownerModal) {
        ownerModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

// Close modal function
const closeModal = () => {
    if (ownerModal) {
        ownerModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

// Event listeners for opening modal
if (ownerLink) {
    ownerLink.addEventListener('click', openModal);
}

if (ownerLinkMobile) {
    ownerLinkMobile.addEventListener('click', openModal);
}

// Footer owner link
const ownerLinkFooter = document.getElementById('owner-link-footer');
if (ownerLinkFooter) {
    ownerLinkFooter.addEventListener('click', openModal);
}

// Event listeners for closing modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !ownerModal.classList.contains('hidden')) {
        closeModal();
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Animate all elements with animation classes
const animatedElements = document.querySelectorAll('.fade-in-up, .scale-in, .fade-in, .slide-in-left, .slide-in-right');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(element => {
    observer.observe(element);
});

// Additional animation for feature and command cards
const cards = document.querySelectorAll('.feature-card-advanced, .command-card');
cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    // Trigger animations for visible elements
    const visibleElements = document.querySelectorAll('.fade-in-up, .scale-in, .fade-in');
    visibleElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            setTimeout(() => {
                element.classList.add('is-visible');
            }, index * 100);
        }
    });
});

// ============================================
// PREVENT SCROLL JANK ON MOBILE
// ============================================

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('.footer-year');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
};

updateFooterYear();

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🚀 KIRA-MD Bot Platform', 'color: #ec407a; font-size: 24px; font-weight: bold;');
console.log('%cThe best free WhatsApp bot - No server required', 'color: #7b1fa2; font-size: 16px;');
console.log('%cDeveloped by Sumon Roy', 'color: #ff6b9d; font-size: 14px;');

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize event listener removed (was for canvas animation)

// ============================================
// END OF SCRIPT
// ============================================