// Event Date Checker and Filter - Simple and Clean
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
            
            // If event date has passed, mark as expired
            if (eventDateObj < today) {
                card.setAttribute('data-expired', 'true');
                card.style.display = 'none';
            }
        });
        
        // Check if all events are hidden and show a message
        checkNoEvents();
    }
    
    // Check if no events are visible
    function checkNoEvents() {
        const container = document.querySelector('#eventsGrid');
        if (!container) return;
        
        const visibleEvents = container.querySelectorAll('.type-card:not([style*="display: none"])');
        let noEventsMessage = container.querySelector('.no-events-message');
        
        if (visibleEvents.length === 0) {
            if (!noEventsMessage) {
                noEventsMessage = document.createElement('div');
                noEventsMessage.className = 'no-events-message';
                noEventsMessage.innerHTML = '<h3>No upcoming events at the moment</h3><p>Check back soon for new vegan events and festivals!</p>';
                container.appendChild(noEventsMessage);
            }
            noEventsMessage.style.display = 'block';
        } else if (noEventsMessage) {
            noEventsMessage.style.display = 'none';
        }
    }
    
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'white';
                b.style.color = '#4CAF50';
            });
            btn.classList.add('active');
            btn.style.background = '#4CAF50';
            btn.style.color = 'white';
            
            const filter = btn.getAttribute('data-filter');
            const eventCards = document.querySelectorAll('#eventsGrid .type-card');
            const container = document.querySelector('#eventsGrid');
            
            // Remove existing messages
            const existingMessage = container.querySelector('.no-events-message, .marches-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Special handling for marches filter
            if (filter === 'marches') {
                // Hide all event cards
                eventCards.forEach(card => {
                    card.style.display = 'none';
                });
                
                // Show "check back soon" message
                const marchesMessage = document.createElement('div');
                marchesMessage.className = 'marches-message';
                marchesMessage.style.cssText = 'text-align: center; padding: 3rem 1rem; color: var(--text-light, #666);';
                marchesMessage.innerHTML = '<h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--primary-green, #4CAF50);">Check back soon</h3>';
                container.appendChild(marchesMessage);
                return;
            }
            
            // Normal filtering for other categories
            eventCards.forEach(card => {
                // Skip expired events
                if (card.getAttribute('data-expired') === 'true') {
                    card.style.display = 'none';
                    return;
                }
                
                const category = card.getAttribute('data-category') || 'festival';
                
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
            
            checkNoEvents();
        });
    });
    
    // Run the check when page loads
    checkEventDates();
    
    // Also run the check daily (optional - for long-term visitors)
    setInterval(checkEventDates, 24 * 60 * 60 * 1000); // Check every 24 hours
});
