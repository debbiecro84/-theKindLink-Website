// Index Page Events Auto-Update
// Uses shared events data from events-data.js to show previews from the main events page
document.addEventListener('DOMContentLoaded', () => {
    // Function to automatically update events based on current date
    function updateIndexEvents() {
        // Get today's date normalized to start of day (midnight) for accurate comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const eventsContainer = document.querySelector('.events-preview');
        
        if (!eventsContainer) return;
        
        // Check if EVENTS_DATA is available (from events-data.js)
        if (typeof EVENTS_DATA === 'undefined') {
            console.error('EVENTS_DATA not found. Make sure events-data.js is loaded before index-events.js');
            return;
        }
        
        // Process events from shared data source
        const upcomingEvents = EVENTS_DATA
            .map(event => {
                // Normalize event date to start of day for accurate comparison
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                
                // Format date for display
                const dateInfo = formatEventDate(event.date);
                
                return {
                    ...event,
                    date: eventDate,
                    month: dateInfo.month,
                    day: dateInfo.day
                };
            })
            .filter(event => event.date >= today)
            .sort((a, b) => a.date - b.date)
            .slice(0, 3);
        
        // Clear current events
        eventsContainer.innerHTML = '';
        
        // Add upcoming events
        upcomingEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'preview-event-card';
            eventCard.innerHTML = `
                <div class="preview-event-date">
                    <span class="month">${event.month}</span>
                    <span class="day">${event.day}</span>
                </div>
                <div class="preview-event-details">
                    <h3>${event.title}</h3>
                    <p>${event.location}</p>
                    <span class="preview-event-type">${event.type}</span>
                </div>
            `;
            eventsContainer.appendChild(eventCard);
        });
        
        // If no upcoming events, show a message
        if (upcomingEvents.length === 0) {
            eventsContainer.innerHTML = `
                <div class="no-events-message" style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
                    <h3>No upcoming events scheduled</h3>
                    <p>Check back soon for new vegan events and festivals!</p>
                </div>
            `;
        }
    }
    
    // Run the update when page loads
    updateIndexEvents();
    
    // Update every hour to catch date changes
    setInterval(updateIndexEvents, 60 * 60 * 1000);
});
