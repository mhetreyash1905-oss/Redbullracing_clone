/*
=====================================================
ORACLE RED BULL RACING - WEBSITE CLONE
MAIN JAVASCRIPT FILE
=====================================================
This JavaScript file handles all interactive functionality
for the Red Bull Racing website clone, including:
- Mobile navigation menu toggle
- Header scroll effects
- Countdown timer for next race
- Newsletter form validation
- Smooth scrolling
- Back to top button
- Animation triggers on scroll
*/

/*
=====================================================
DOM CONTENT LOADED EVENT
=====================================================
Wait for the DOM to be fully loaded before running scripts.
This ensures all elements are available for manipulation.
*/
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initMobileMenu();          // Mobile hamburger menu
    initHeaderScroll();        // Header background on scroll
    initCountdown();           // Race countdown timer
    initNewsletterForm();      // Newsletter form validation
    initSmoothScroll();        // Smooth scrolling for anchor links
    initScrollAnimations();    // Animate elements on scroll
    initPartnersSlider();      // Partners infinite scroll
});

/*
=====================================================
MOBILE NAVIGATION MENU
=====================================================
Handles the hamburger menu toggle for mobile devices.
Includes body scroll lock when menu is open.
*/
function initMobileMenu() {
    // Get DOM elements
    const hamburger = document.getElementById('hamburger');  // Hamburger button
    const navMenu = document.getElementById('nav-menu');     // Navigation menu
    const navLinks = document.querySelectorAll('.nav-link'); // All nav links

    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function () {
        // Toggle 'active' class on hamburger (for X animation)
        hamburger.classList.toggle('active');

        // Toggle 'active' class on nav menu (slide in/out)
        navMenu.classList.toggle('active');

        // Toggle body scroll lock
        // Prevents background scrolling when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            // Remove active class from hamburger and menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Re-enable body scrolling
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside (on overlay area)
    navMenu.addEventListener('click', function (event) {
        // Only close if clicking directly on the menu (overlay)
        // not on a nav item
        if (event.target === navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key press
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/*
=====================================================
HEADER SCROLL EFFECT
=====================================================
Adds a 'scrolled' class to the header when the user
scrolls down, changing its background and adding shadow.
*/
function initHeaderScroll() {
    // Get header element
    const header = document.getElementById('header');

    // Scroll threshold in pixels
    const scrollThreshold = 100;

    // Function to check scroll position and update header
    function updateHeader() {
        // Check if page is scrolled past threshold
        if (window.scrollY > scrollThreshold) {
            // Add scrolled class for solid background
            header.classList.add('scrolled');
        } else {
            // Remove scrolled class for transparent background
            header.classList.remove('scrolled');
        }
    }

    // Listen for scroll events
    // Using passive: true for better scroll performance
    window.addEventListener('scroll', updateHeader, { passive: true });

    // Run once on page load in case page is already scrolled
    updateHeader();
}

/*
=====================================================
RACE COUNTDOWN TIMER
=====================================================
Displays a countdown to the next race date.
Updates every second to show days, hours, minutes, seconds.
*/
function initCountdown() {
    // Set the target date for the next race
    // Australian Grand Prix 2026: March 6, 2026
    const raceDate = new Date('March 6, 2026 14:00:00').getTime();

    // Get countdown display elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Function to update the countdown display
    function updateCountdown() {
        // Get current date/time
        const now = new Date().getTime();

        // Calculate the difference in milliseconds
        const difference = raceDate - now;

        // If the race has passed, show zeros
        if (difference < 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }

        // Calculate time units
        // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        // Hours remaining after days are calculated
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        // Minutes remaining after hours are calculated
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        // Seconds remaining after minutes are calculated
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update the display with zero-padded values
        // padStart(2, '0') ensures single digits are displayed as '01', '02', etc.
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    // Update countdown immediately on page load
    updateCountdown();

    // Update countdown every second (1000 milliseconds)
    setInterval(updateCountdown, 1000);
}

/*
=====================================================
NEWSLETTER FORM VALIDATION
=====================================================
Handles newsletter form submission with validation.
Provides user feedback for success/error states.
*/
function initNewsletterForm() {
    // Get form element
    const form = document.getElementById('newsletter-form');

    // If form doesn't exist, exit
    if (!form) return;

    // Handle form submission
    form.addEventListener('submit', function (event) {
        // Prevent default form submission (page refresh)
        event.preventDefault();

        // Get email input
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();

        // Validate email format using regex
        // This pattern checks for: something@something.something
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            // Invalid email - show error
            showFormMessage('Please enter a valid email address.', 'error');

            // Add error styling to input
            emailInput.classList.add('error');

            // Focus the input for correction
            emailInput.focus();
            return;
        }

        // Valid email - simulate form submission
        // In a real application, this would send data to a server

        // Remove any error styling
        emailInput.classList.remove('error');

        // Show success message
        showFormMessage('Thank you for subscribing! Welcome to The Paddock.', 'success');

        // Clear the input
        emailInput.value = '';

        // Log to console (for development/demo purposes)
        console.log('Newsletter subscription:', email);
    });

    // Remove error styling when user starts typing
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function () {
        this.classList.remove('error');
        // Remove any existing message
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    });
}

/*
=====================================================
FORM MESSAGE HELPER
=====================================================
Displays success or error messages below the form.
*/
function showFormMessage(message, type) {
    // Get form element
    const form = document.getElementById('newsletter-form');

    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('p');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;

    // Style the message based on type
    messageElement.style.marginTop = '1rem';
    messageElement.style.fontSize = '0.875rem';
    messageElement.style.fontWeight = '600';

    if (type === 'error') {
        messageElement.style.color = '#CC0000';  // Red Bull red
    } else if (type === 'success') {
        messageElement.style.color = '#00CC00';  // Green
    }

    // Append message to form
    form.appendChild(messageElement);

    // Auto-remove success message after 5 seconds
    if (type === 'success') {
        setTimeout(function () {
            messageElement.remove();
        }, 5000);
    }
}

/*
=====================================================
SMOOTH SCROLL FOR ANCHOR LINKS
=====================================================
Enables smooth scrolling when clicking internal links.
Accounts for fixed header height.
*/
function initSmoothScroll() {
    // Get all anchor links that point to sections on the page
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            // Get the target element ID from href
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" (no target)
            if (targetId === '#') return;

            // Get the target element
            const targetElement = document.querySelector(targetId);

            // If target exists, scroll to it
            if (targetElement) {
                // Prevent default anchor behavior
                event.preventDefault();

                // Get header height for offset
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;

                // Calculate scroll position (element position minus header height)
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                // Smooth scroll to position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


/*
=====================================================
SCROLL ANIMATIONS (INTERSECTION OBSERVER)
=====================================================
Triggers animations when elements come into view.
Uses Intersection Observer API for performance.
*/
function initScrollAnimations() {
    // Select elements to animate
    // These elements will fade in when they enter the viewport
    const animatedElements = document.querySelectorAll(
        '.story-card, .team-card, .product-card, .section-header'
    );

    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        // Create the observer
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                // Check if element is in viewport
                if (entry.isIntersecting) {
                    // Add animation class
                    entry.target.classList.add('animate-in');

                    // Stop observing this element (animation only triggers once)
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // Options
            root: null,           // Use viewport as root
            rootMargin: '0px',    // No margin
            threshold: 0.1        // Trigger when 10% visible
        });

        // Add initial styles and observe each element
        animatedElements.forEach(function (element) {
            // Set initial state (hidden)
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            // Start observing
            observer.observe(element);
        });

        // Add CSS for animated state
        // This adds a style element to handle the animation end state
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);

    } else {
        // Fallback for browsers without Intersection Observer
        // Just show all elements immediately
        animatedElements.forEach(function (element) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

/*
=====================================================
PARTNERS SLIDER DUPLICATION
=====================================================
Duplicates partner logos for infinite scroll effect.
CSS handles the actual animation.
*/
function initPartnersSlider() {
    // Get the partners track element
    const partnersTrack = document.querySelector('.partners-track');

    // If track doesn't exist, exit
    if (!partnersTrack) return;

    // Get all partner logos
    const partnerLogos = partnersTrack.querySelectorAll('.partner-logo');

    // Clone all logos and append them to create seamless loop
    // This creates a duplicate set that makes the scroll appear infinite
    partnerLogos.forEach(function (logo) {
        const clone = logo.cloneNode(true);
        partnersTrack.appendChild(clone);
    });
}

/*
=====================================================
ADDITIONAL UTILITY FUNCTIONS
=====================================================
Helper functions for various tasks.
*/

/**
 * Debounce function - limits how often a function can fire
 * Useful for scroll and resize event handlers
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        // Function to execute after delay
        const later = function () {
            // Clear timeout
            timeout = null;
            // Execute the function
            func.apply(this, args);
        };

        // Clear existing timeout
        clearTimeout(timeout);

        // Set new timeout
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - limits function calls to once per interval
 * Useful for continuous events like scroll
 * @param {Function} func - The function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
    let inThrottle;

    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(function () {
                inThrottle = false;
            }, limit);
        }
    };
}

/*
=====================================================
ERROR HANDLING
=====================================================
Global error handler for debugging.
*/
window.addEventListener('error', function (event) {
    // Log errors to console (in production, this would send to a logging service)
    console.error('An error occurred:', event.message);
});

/*
=====================================================
KEYBOARD NAVIGATION ENHANCEMENT
=====================================================
Improves accessibility for keyboard users.
*/
document.addEventListener('keydown', function (event) {
    // Add keyboard navigation hints
    if (event.key === 'Tab') {
        // Add a class to body to show focus outlines
        document.body.classList.add('keyboard-nav');
    }
});

// Remove keyboard nav class when using mouse
document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-nav');
});

/*
=====================================================
PERFORMANCE OPTIMIZATION
=====================================================
Lazy loading and performance improvements.
*/

// Preload critical resources
function preloadCriticalResources() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'style';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700;900&display=swap';
    document.head.appendChild(fontLink);
}

// Run preload on page load
preloadCriticalResources();

/*
=====================================================
CONSOLE WELCOME MESSAGE
=====================================================
Fun message for developers who open the console.
*/
console.log(`
%c🏎️ ORACLE RED BULL RACING
%c
Welcome to the Oracle Red Bull Racing website clone!

This is a front-end demonstration created for educational purposes.
Built with HTML, CSS, and vanilla JavaScript.

Happy coding! 🏁
`,
    'color: #CC0000; font-size: 24px; font-weight: bold;',
    'color: #FFD700; font-size: 12px;'
);
