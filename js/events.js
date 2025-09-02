// Event Date Checker - Simple and Clean
document.addEventListener('DOMContentLoaded', () => {
    // Function to check and hide expired events
    function checkEventDates() {
        const today = new Date();
        const eventCards = document.querySelectorAll('.type-card[data-event-date]');
        
        eventCards.forEach(card => {
            const eventDate = card.getAttribute('data-event-date');
            
            // Skip ongoing events
            if (eventDate === 'ongoing') {
                return;
            }
            
            // Parse the event date
            const eventDateObj = new Date(eventDate);
            
            // If event date has passed, hide the card
            if (eventDateObj < today) {
                card.style.display = 'none';
            }
        });
        
        // Check if all events are hidden and show a message
        const visibleEvents = document.querySelectorAll('.type-card:not([style*="display: none"])');
        if (visibleEvents.length === 0) {
            const container = document.querySelector('.categories-grid');
            if (container) {
                const noEventsMessage = document.createElement('div');
                noEventsMessage.className = 'no-events-message';
                noEventsMessage.innerHTML = '<h3>No upcoming events at the moment</h3><p>Check back soon for new vegan events and festivals!</p>';
                container.appendChild(noEventsMessage);
            }
        }
    }
    
    // Run the check when page loads
    checkEventDates();
    
    // Also run the check daily (optional - for long-term visitors)
    setInterval(checkEventDates, 24 * 60 * 60 * 1000); // Check every 24 hours
});
