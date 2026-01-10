// Category Navigation Functionality
function showCategory(categoryId) {
    // Hide all category detail sections
    const allSections = document.querySelectorAll('.category-detail-section');
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected category section
    const selectedSection = document.getElementById(categoryId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        // Scroll to the section
        selectedSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Category Dropdown Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categoryCards = document.querySelectorAll('.category-card');
    
    if (categoryFilter && categoryCards.length > 0) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            
            categoryCards.forEach(card => {
                if (selectedCategory === 'all') {
                    // Show all cards
                    card.style.display = '';
                    card.style.opacity = '1';
                } else {
                    // Show only matching category
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === selectedCategory) {
                        card.style.display = '';
                        card.style.opacity = '1';
                        // Scroll to the first matching card
                        setTimeout(() => {
                            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    }
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        let ticking = false;
        
        // Throttled scroll handler using requestAnimationFrame for better performance
        function updateScrollButton() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
            ticking = false;
        }
        
        // Show button when user scrolls down 300px
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollButton);
                ticking = true;
            }
        }, { passive: true });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 