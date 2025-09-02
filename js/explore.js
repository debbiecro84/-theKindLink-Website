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

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show button when user scrolls down 300px
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 