// Get Featured Modal Functions
function openGetFeaturedModal() {
    document.getElementById('getFeaturedModal').style.display = 'block';
}

function closeGetFeaturedModal() {
    document.getElementById('getFeaturedModal').style.display = 'none';
}

// Handle Get Featured form submission
function handleGetFeaturedFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitButton.disabled = true;
    
    // Submit form to FormSubmit
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            showGetFeaturedMessage('Thank you! Your feature request has been submitted successfully. We\'ll review it and get back to you soon.', 'success');
            form.reset();
            setTimeout(() => {
                closeGetFeaturedModal();
            }, 3000);
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        // Show error message
        showGetFeaturedMessage('Sorry, there was an error submitting your request. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}

// Show message to user for Get Featured form
function showGetFeaturedMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Insert message after the form
    const form = document.querySelector('#getFeaturedModal .suggest-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    var getFeaturedModal = document.getElementById('getFeaturedModal');
    if (event.target == getFeaturedModal) {
        getFeaturedModal.style.display = 'none';
    }
});
