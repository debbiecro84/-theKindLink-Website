// Mobile Menu JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileNav.classList.contains('active')) {
            body.style.overflow = 'hidden';
            body.classList.add('mobile-menu-open');
        } else {
            body.style.overflow = '';
            body.classList.remove('mobile-menu-open');
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
        body.classList.remove('mobile-menu-open');
    }

    // Event listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    mobileNav.addEventListener('click', function(e) {
        if (e.target === mobileNav) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Set active nav link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Initialize active nav link
    setActiveNavLink();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMobileMenu();
            }
        });
    });

    // Add loading animation
    function addLoadingAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            .mobile-nav {
                animation: slideInFromTop 0.3s ease-out;
            }
            
            .mobile-nav-link {
                animation: fadeInUp 0.4s ease-out;
                animation-fill-mode: both;
            }
            
            .mobile-nav-link:nth-child(1) { animation-delay: 0.1s; }
            .mobile-nav-link:nth-child(2) { animation-delay: 0.2s; }
            .mobile-nav-link:nth-child(3) { animation-delay: 0.3s; }
            .mobile-nav-link:nth-child(4) { animation-delay: 0.4s; }
            .mobile-nav-link:nth-child(5) { animation-delay: 0.5s; }
            .mobile-nav-link:nth-child(6) { animation-delay: 0.6s; }
            .mobile-nav-link:nth-child(7) { animation-delay: 0.7s; }
            
            @keyframes slideInFromTop {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize loading animation
    addLoadingAnimation();
});
