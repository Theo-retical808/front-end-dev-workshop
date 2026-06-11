/*
    🎓 MODULE 3: JAVASCRIPT INTERACTION
    ====================================
    
    This file makes our page interactive!
    
    Key concepts:
    - VARIABLES: Store data (let count = 0)
    - FUNCTIONS: Reusable blocks of code
    - EVENTS: Things that happen (clicks, typing, etc.)
    - DOM: How JavaScript talks to HTML elements
    
    document.getElementById("id") = finds an HTML element by its ID
    element.textContent = changes the text inside an element
    element.addEventListener("click", function) = runs code when clicked
*/

// ===== EXAMPLE 1: CLICK COUNTER =====
// Variables store data. "let" means the value can change.
let count = 0;

// Get references to our HTML elements
const countDisplay = document.getElementById("count");
const countButton = document.getElementById("count-button");

// Add a "click" event listener — runs our code when the button is clicked
countButton.addEventListener("click", function() {
    // Increase count by 1
    count = count + 1;
    
    // Update what's shown on the page
    countDisplay.textContent = count;
});


// ===== EXAMPLE 2: TEXT CHANGER =====
const messages = [
    "JavaScript is awesome! 🚀",
    "You're learning to code! 💪",
    "Keep clicking for more! 🎯",
    "Almost there... 😄",
    "You're a natural! ⭐",
    "One more? 🤔",
    "Okay, last one! 😂",
    "JK, there's always more! 🎉"
];

let messageIndex = 0;
const changingText = document.getElementById("changing-text");
const textButton = document.getElementById("text-button");

textButton.addEventListener("click", function() {
    // Update the text with the next message
    changingText.textContent = messages[messageIndex];
    
    // Move to next message (loop back to start if we reach the end)
    messageIndex = messageIndex + 1;
    if (messageIndex >= messages.length) {
        messageIndex = 0;
    }
});


// ===== EXAMPLE 3: COLOR CHANGER =====
const colorBox = document.getElementById("color-box");
const colorButton = document.getElementById("color-button");

// Function to generate a random color
function getRandomColor() {
    // Colors in computers are made of Red, Green, Blue (0-255 each)
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    
    // This creates a color string like "rgb(123, 45, 200)"
    return `rgb(${red}, ${green}, ${blue})`;
}

colorButton.addEventListener("click", function() {
    const newColor = getRandomColor();
    colorBox.style.backgroundColor = newColor;
    colorBox.textContent = newColor;
});


// ===== EXAMPLE 4: TOGGLE VISIBILITY =====
const hiddenMessage = document.getElementById("hidden-message");
const toggleButton = document.getElementById("toggle-button");

toggleButton.addEventListener("click", function() {
    // .classList.toggle() adds a class if missing, removes it if present
    hiddenMessage.classList.toggle("visible");
});


// ===== EXAMPLE 5: MINI CALCULATOR =====
const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const addButton = document.getElementById("add-button");
const resultDisplay = document.getElementById("result");

addButton.addEventListener("click", function() {
    // Get values from inputs and convert text to numbers
    const number1 = Number(num1Input.value);
    const number2 = Number(num2Input.value);
    
    // Check if they actually entered numbers
    if (isNaN(number1) || isNaN(number2)) {
        resultDisplay.textContent = "Please enter valid numbers!";
        return;
    }
    
    // Calculate and display
    const sum = number1 + number2;
    resultDisplay.textContent = sum;
});


// ===== EXAMPLE 6: PERSONAL GREETER =====
const nameInput = document.getElementById("name-input");
const greetButton = document.getElementById("greet-button");
const greetingDisplay = document.getElementById("greeting");

greetButton.addEventListener("click", function() {
    const name = nameInput.value;
    
    // Check if they typed a name
    if (name === "") {
        greetingDisplay.textContent = "Please type your name first! 😊";
        return;
    }
    
    // Get the current hour to personalize the greeting
    const hour = new Date().getHours();
    let timeGreeting;
    
    if (hour < 12) {
        timeGreeting = "Good morning";
    } else if (hour < 18) {
        timeGreeting = "Good afternoon";
    } else {
        timeGreeting = "Good evening";
    }
    
    greetingDisplay.textContent = `${timeGreeting}, ${name}! Welcome to the workshop! 🎉`;
});

/*
    💡 CONSOLE TIP:
    Press F12 in your browser to open Developer Tools.
    Click the "Console" tab.
    You can type JavaScript directly there to test things!
    
    Try typing:
    - alert("Hello!")
    - console.log("Testing 1 2 3")
    - document.body.style.backgroundColor = "pink"
*/
