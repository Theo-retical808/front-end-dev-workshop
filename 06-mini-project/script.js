/*
    🎓 MODULE 6: MINI PROJECT JAVASCRIPT
    ======================================
    All our skills combined! This makes the portfolio interactive.
*/

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById("theme-toggle");
let isDarkMode = false;

themeToggle.addEventListener("click", function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode");
    
    if (isDarkMode) {
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
});


// ===== JOKE FETCHER =====
const jokeBtn = document.getElementById("joke-btn");
const jokeText = document.getElementById("joke-text");

async function getJoke() {
    jokeText.textContent = "Loading... 🤔";
    
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode&type=single");
        const data = await response.json();
        jokeText.textContent = data.joke;
    } catch (error) {
        jokeText.textContent = "Couldn't get a joke. Try again!";
    }
}

jokeBtn.addEventListener("click", getJoke);


// ===== CLICK COUNTER =====
const clickBtn = document.getElementById("click-btn");
const clickCount = document.getElementById("click-count");
let clicks = 0;

clickBtn.addEventListener("click", function() {
    clicks++;
    clickCount.textContent = clicks;
    
    // Fun milestone messages!
    if (clicks === 10) clickBtn.textContent = "Nice! 🎉";
    if (clicks === 25) clickBtn.textContent = "Wow! 🔥";
    if (clicks === 50) clickBtn.textContent = "Unstoppable! 🚀";
    if (clicks === 100) clickBtn.textContent = "Legend! 👑";
});


// ===== COLOR CHANGER =====
const colorBtn = document.getElementById("color-btn");
const colorFunBox = document.getElementById("color-fun-box");

function getRandomColor() {
    const colors = [
        "#fed7d7", "#feebc8", "#fefcbf", "#c6f6d5", 
        "#bee3f8", "#e9d8fd", "#fed7e2", "#b2f5ea"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

colorBtn.addEventListener("click", function() {
    colorFunBox.style.backgroundColor = getRandomColor();
});


// ===== FOOTER YEAR =====
const footerYear = document.querySelector(".footer-year");
footerYear.textContent = `© ${new Date().getFullYear()} - My First Portfolio`;


// ===== SMOOTH SCROLL FOR NAVIGATION =====
// Makes clicking nav links scroll smoothly to the section
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});
