/*
MAIN JAVASCRIPT FILE
*/

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initHeaderScroll();        // Header background on scroll
    initCountdown();           // Race countdown timer
    initSmoothScroll();        // Smooth scrolling for anchor links
    initScrollAnimations();    // Animate elements on scroll
    initPartnersSlider();      // Partners infinite scroll
});

/*
RACE COUNTDOWN TIMER
*/
function initCountdown() {

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
SMOOTH SCROLL FOR ANCHOR LINKS
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
SCROLL ANIMATIONS
*/
function initScrollAnimations() {
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
PARTNERS SLIDER DUPLICATION
*/
function initPartnersSlider() {
    // Get the partners track element
    const partnersTrack = document.querySelector('.partners-track');
    if (!partnersTrack) return;

    // Get all partner logos
    const partnerLogos = partnersTrack.querySelectorAll('.partner-logo');

    partnerLogos.forEach(function (logo) {
        const clone = logo.cloneNode(true);
        partnersTrack.appendChild(clone);
    });
}

/*
ADDITIONAL UTILITY FUNCTIONS
*/

/**
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
KEYBOARD NAVIGATION ENHANCEMENT
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

console.log(`
%c🏎️ ORACLE RED BULL RACING
`,
    'color: #CC0000; font-size: 24px; font-weight: bold;',
    'color: #FFD700; font-size: 12px;'
);
