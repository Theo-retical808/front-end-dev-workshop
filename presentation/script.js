/*
    PRESENTATION CONTROLLER
    ========================
    Handles slide navigation, keyboard controls, and progress bar.
*/

// Get all slides
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 0;

// UI elements
const counter = document.getElementById('slide-counter');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const keyboardHint = document.getElementById('keyboard-hint');

// Show a specific slide
function showSlide(index) {
    // Bounds check
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show the target slide
    slides[index].classList.add('active');
    currentSlide = index;
    
    // Update counter
    counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    
    // Update progress bar
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update button states
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Navigation functions
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':  // Spacebar
        case 'PageDown':
            event.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
            event.preventDefault();
            prevSlide();
            break;
        case 'Home':
            event.preventDefault();
            showSlide(0);
            break;
        case 'End':
            event.preventDefault();
            showSlide(totalSlides - 1);
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
        case 'Escape':
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            break;
    }
});

// Fullscreen toggle
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            document.body.classList.add('fullscreen');
        });
    } else {
        document.exitFullscreen().then(() => {
            document.body.classList.remove('fullscreen');
        });
    }
}

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        document.body.classList.remove('fullscreen');
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const threshold = 50; // minimum swipe distance
    const diff = touchStartX - touchEndX;
    
    if (diff > threshold) {
        nextSlide(); // Swipe left → next
    } else if (diff < -threshold) {
        prevSlide(); // Swipe right → previous
    }
}

// Hide keyboard hint after first interaction
let hintVisible = true;
document.addEventListener('keydown', function() {
    if (hintVisible) {
        keyboardHint.style.opacity = '0';
        setTimeout(() => { keyboardHint.style.display = 'none'; }, 500);
        hintVisible = false;
    }
}, { once: true });

// Initialize
showSlide(0);

// Preload: remove any loading states
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});
