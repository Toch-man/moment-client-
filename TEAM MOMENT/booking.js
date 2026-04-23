document.addEventListener('DOMContentLoaded', () => {
    const sidebarNavLinks = document.querySelectorAll('.sidebar nav ul li a');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle'); // Assuming you'll add a toggle button for mobile
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.content');
    const bookingCards = document.querySelectorAll('.booking-card');
    const statusFilterButtons = document.querySelectorAll('.status-filter-btn'); // For filtering booking requests

    // --- Sidebar Navigation Highlighting ---
    sidebarNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent default if it's a placeholder '#' link
            // event.preventDefault();

            // Remove 'active' class from all links
            sidebarNavLinks.forEach(l => l.classList.remove('active'));

            // Add 'active' class to the clicked link
            this.classList.add('active');

            // Optional: Close mobile menu if it was open
            if (sidebar.classList.contains('menu-open')) {
                closeMobileMenu();
            }
        });
    });

    // --- Mobile Navigation Toggle (Example) ---
    // You'll need to add a button in your HTML for this, e.g.:
    // <button id="mobile-nav-toggle">Menu</button>
    // and some CSS to show/hide it and the sidebar menu.
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            sidebar.classList.toggle('menu-open');
            mainContent.classList.toggle('menu-open'); // To push content slightly or overlay
            // You might want to change the icon of the toggle button as well
        });
    }

    function closeMobileMenu() {
        sidebar.classList.remove('menu-open');
        mainContent.classList.remove('menu-open');
    }

    // --- Filter Booking Requests by Status ---
    // This requires adding filter buttons to your HTML, e.g.:
    // <div class="filter-buttons">
    //     <button class="status-filter-btn" data-status="all">All</button>
    //     <button class="status-filter-btn" data-status="pending">Pending</button>
    //     <button class="status-filter-btn" data-status="accepted">Accepted</button>
    //     <button class="status-filter-btn" data-status="declined">Declined</button>
    // </div>
    if (statusFilterButtons.length > 0) {
        statusFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const status = this.getAttribute('data-status');

                // Highlight the active filter button
                statusFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                bookingCards.forEach(card => {
                    const cardStatus = card.querySelector('.status-tag').textContent.toLowerCase();
                    if (status === 'all' || cardStatus === status) {
                        card.style.display = 'block'; // Or 'flex' depending on your card's display
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Interactive Buttons within Cards ---
    bookingCards.forEach(card => {
        const viewGuidelineBtn = card.querySelector('.btn-secondary');
        const followUpBtn = card.querySelector('.btn-primary');

        if (viewGuidelineBtn) {
            viewGuidelineBtn.addEventListener('click', () => {
                alert('Viewing full guideline for this booking...');
                // In a real app, this would likely open a modal or navigate to a page
            });
        }

        if (followUpBtn) {
            followUpBtn.addEventListener('click', () => {
                alert('Following up on this booking...');
                // Similar to above, could trigger an email, update status, etc.
            });
        }
    });

    // --- Footer Action Buttons ---
    const footerActionButtons = document.querySelectorAll('.footer-actions .action-btn');
    footerActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const actionText = button.textContent.trim();
            const actionIconAlt = button.querySelector('img')?.alt || 'action';

            if (actionText === 'Ask to edit') {
                alert('You have asked to edit the project.');
                // Implement actual edit functionality or modal
            } else {
                alert(`You clicked the "${actionIconAlt}" action button.`);
                // Implement other actions
            }
        });
    });

    // --- Accordion/Expand for Accepted Bookings (Example) ---
    // If you have many accepted bookings, you might want to collapse them
    // This is a simple example; you'd need to structure your HTML accordingly
    // For example, add a toggle icon to accepted-card headers.
    // const acceptedCards = document.querySelectorAll('.accepted-card');
    // acceptedCards.forEach(card => {
    //     card.querySelector('h4').addEventListener('click', () => {
    //         card.classList.toggle('collapsed');
    //     });
    // });

    // --- Tooltip Implementation (Example) ---
    // For elements that need tooltips (e.g., icons)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            // Create and show tooltip
            const tooltipText = el.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);

            // Position tooltip
            const rect = el.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        });

        el.addEventListener('mouseout', () => {
            // Remove tooltip
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    // You'll need to add CSS for the `.tooltip` class for this to work.
});

function elementContainsText(element, text) {
    return element.textContent.includes(text);
}