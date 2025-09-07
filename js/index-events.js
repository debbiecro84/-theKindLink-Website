// Index Page Events Auto-Update
document.addEventListener('DOMContentLoaded', () => {
    // Function to automatically update events based on current date
    function updateIndexEvents() {
        const today = new Date();
        const eventsContainer = document.querySelector('.events-preview');
        
        if (!eventsContainer) return;
        
        // Define all available events with their dates
        const allEvents = [
            {
                month: 'SEP',
                day: '13',
                title: 'Leicester Vegan Festival 2025',
                location: 'Leicester, England',
                type: 'Festival',
                date: new Date('2025-09-13')
            },
            {
                month: 'SEP',
                day: '20',
                title: 'Portsmouth Vegan Festival 2025',
                location: 'Portsmouth, England',
                type: 'Festival',
                date: new Date('2025-09-20')
            },
            {
                month: 'OCT',
                day: '05',
                title: 'Bournemouth Vegan Festival 2025',
                location: 'Bournemouth, England',
                type: 'Festival',
                date: new Date('2025-10-05')
            },
            {
                month: 'OCT',
                day: '12',
                title: 'Essex Vegan Festival 2025',
                location: 'Essex, England',
                type: 'Festival',
                date: new Date('2025-10-12')
            },
            {
                month: 'NOV',
                day: '02',
                title: 'Sheffield Vegan Festival 2025',
                location: 'Sheffield, England',
                type: 'Festival',
                date: new Date('2025-11-02')
            },
            {
                month: 'NOV',
                day: '16',
                title: 'Glasgow Vegan Festival 2025',
                location: 'Glasgow, Scotland',
                type: 'Festival',
                date: new Date('2025-11-16')
            },
            {
                month: 'DEC',
                day: '07',
                title: 'Northern Vegan Christmas Festival 2025',
                location: 'Manchester, England',
                type: 'Festival',
                date: new Date('2025-12-07')
            },
            {
                month: 'DEC',
                day: '14',
                title: 'Newcastle Vegan Festival 2025',
                location: 'Newcastle, England',
                type: 'Festival',
                date: new Date('2025-12-14')
            }
        ];
        
        // Filter out past events and get next 3 upcoming events
        const upcomingEvents = allEvents
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
