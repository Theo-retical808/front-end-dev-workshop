/*
    PRESENTATION CONTROLLER
    ========================
    Navigate with Arrow Keys:
      → or ↓  = Next slide
      ← or ↑  = Previous slide
      Home     = First slide
      End      = Last slide
      F        = Fullscreen
*/

// Get all slides
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 0;

// UI elements
const counter = document.getElementById('slide-counter');
const progressFill = document.getElementById('progress-fill');
const keyboardHint = document.getElementById('keyboard-hint');
const keyIcons = document.querySelectorAll('.key-icon');

// Show a specific slide
function showSlide(index) {
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

// Visual feedback on key press
function flashKey(direction) {
    // direction: 0 = left, 1 = right
    const icon = keyIcons[direction];
    if (icon) {
        icon.classList.add('pressed');
        setTimeout(() => icon.classList.remove('pressed'), 150);
    }
}

// ===== KEYBOARD NAVIGATION (Primary Control) =====
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            event.preventDefault();
            flashKey(1);
            nextSlide();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            event.preventDefault();
            flashKey(0);
            prevSlide();
            break;
        case ' ':  // Spacebar also advances
            event.preventDefault();
            flashKey(1);
            nextSlide();
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

// ===== FULLSCREEN =====
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

document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        document.body.classList.remove('fullscreen');
    }
});

// ===== TOUCH/SWIPE (Mobile Fallback) =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (diff > 50) {
        nextSlide();
    } else if (diff < -50) {
        prevSlide();
    }
}, { passive: true });

// ===== HIDE HINT AFTER FIRST KEY PRESS =====
document.addEventListener('keydown', function() {
    if (keyboardHint) {
        keyboardHint.style.opacity = '0';
        setTimeout(() => { keyboardHint.style.display = 'none'; }, 500);
    }
}, { once: true });

// Initialize first slide
showSlide(0);
