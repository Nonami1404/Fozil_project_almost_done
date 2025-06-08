// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const toolsPanel = document.querySelector('.tools-panel');

    menuButton.addEventListener('click', function() {
        toolsPanel.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!toolsPanel.contains(event.target) && !menuButton.contains(event.target)) {
            toolsPanel.classList.remove('active');
        }
    });

    // Close menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.tool-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            toolsPanel.classList.remove('active');
        });
    });

    // Product card functionality
    const productCards = document.querySelectorAll('.product-card');
    const isMobile = window.innerWidth <= 768;
    
    productCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.buy-button');
        
        if (!isMobile) {
            // Desktop behavior
            learnMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other expanded cards
                productCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                    }
                });
                
                // Toggle current card
                card.classList.toggle('expanded');
            });
        } else {
            // Mobile behavior - show details on card click
            card.addEventListener('click', function() {
                const details = card.querySelector('.product-details');
                if (details) {
                    details.style.display = 'block';
                }
            });
        }
    });

    // Close expanded card when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.product-card')) {
            productCards.forEach(card => {
                card.classList.remove('expanded');
                const details = card.querySelector('.product-details');
                if (details) {
                    details.style.display = 'none';
                }
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            location.reload(); // Reload page when switching between mobile and desktop
        }
    });
});

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
            // Close mobile menu after clicking
            document.querySelector('.tools-panel').classList.remove('active');
        }
    });
});