// Modal functionality for restaurant suggestions

function openSuggestModal() {
    document.getElementById('suggestModal').style.display = 'block';
}

function closeSuggestModal() {
    document.getElementById('suggestModal').style.display = 'none';
}

// Handle form submission
function handleFormSubmit(event) {
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
            showMessage('Thank you! Your restaurant suggestion has been submitted successfully.', 'success');
            form.reset();
            setTimeout(() => {
                closeSuggestModal();
            }, 2000);
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        // Show error message
        showMessage('Sorry, there was an error submitting your suggestion. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}

// Show message to user
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Insert message after the form
    const form = document.querySelector('.suggest-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    var modal = document.getElementById('suggestModal');
    var sanctuaryModal = document.getElementById('suggestSanctuaryModal');
    var companyModal = document.getElementById('companyListingModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target == sanctuaryModal) {
        sanctuaryModal.style.display = 'none';
    }
    if (event.target == companyModal) {
        companyModal.style.display = 'none';
    }
}

// Sanctuary Modal Functions
function openSuggestSanctuaryModal() {
    document.getElementById('suggestSanctuaryModal').style.display = 'block';
}

function closeSuggestSanctuaryModal() {
    document.getElementById('suggestSanctuaryModal').style.display = 'none';
}

// Handle sanctuary form submission
function handleSanctuaryFormSubmit(event) {
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
            showSanctuaryMessage('Thank you! Your sanctuary suggestion has been submitted successfully.', 'success');
            form.reset();
            setTimeout(() => {
                closeSuggestSanctuaryModal();
            }, 2000);
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        // Show error message
        showSanctuaryMessage('Sorry, there was an error submitting your suggestion. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}

// Show message for sanctuary form
function showSanctuaryMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Insert message after the form
    const form = document.querySelector('#suggestSanctuaryModal .suggest-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Company Listing Modal Functions
function openCompanyListingModal() {
    document.getElementById('companyListingModal').style.display = 'block';
}

function closeCompanyListingModal() {
    document.getElementById('companyListingModal').style.display = 'none';
}

// Handle company form submission
function handleCompanyFormSubmit(event) {
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
            showCompanyMessage('Thank you! Your company listing request has been submitted successfully. We\'ll get back to you soon!', 'success');
            form.reset();
            setTimeout(() => {
                closeCompanyListingModal();
            }, 2000);
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        // Show error message
        showCompanyMessage('Sorry, there was an error submitting your request. Please try again.', 'error');
    })
    .finally(() => {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}

// Show message for company form
function showCompanyMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Insert message after the form
    const form = document.querySelector('#companyListingModal .suggest-form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}
