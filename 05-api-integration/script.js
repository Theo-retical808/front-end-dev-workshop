/*
    🎓 MODULE 5: API INTEGRATION
    ==============================
    
    KEY CONCEPTS:
    
    1. fetch(url) — Makes a request to a URL and returns a "Promise"
    2. async/await — A clean way to wait for data to arrive
    3. response.json() — Converts the raw response into usable JavaScript data
    4. try/catch — Handles errors gracefully (like no internet)
    
    HOW IT WORKS:
    
    async function getData() {
        try {
            const response = await fetch("https://api.example.com/data");
            const data = await response.json();
            // Do something with data!
        } catch (error) {
            // Handle errors (no internet, API down, etc.)
        }
    }
*/

// ===== EXAMPLE 1: RANDOM JOKE =====
const jokeButton = document.getElementById("joke-button");
const jokeDisplay = document.getElementById("joke-display");

// "async" means this function can WAIT for data
async function fetchJoke() {
    // Show loading state
    jokeDisplay.innerHTML = "<p>Loading joke... 🤔</p>";
    jokeButton.disabled = true;
    
    try {
        // fetch() sends a request to the API
        // "await" means: wait here until we get a response
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode");
        
        // Convert the response to JSON (JavaScript-readable data)
        const data = await response.json();
        
        // The API returns different formats for different joke types
        if (data.type === "single") {
            jokeDisplay.innerHTML = `<p>😂 ${data.joke}</p>`;
        } else {
            // Two-part joke (setup + delivery)
            jokeDisplay.innerHTML = `
                <p><strong>😄 ${data.setup}</strong></p>
                <p>🤣 ${data.delivery}</p>
            `;
        }
    } catch (error) {
        // This runs if something goes wrong (no internet, API error, etc.)
        jokeDisplay.innerHTML = `<p class="error">❌ Oops! Couldn't fetch a joke. Check your internet connection!</p>`;
        console.error("Error fetching joke:", error);
    }
    
    // Re-enable the button
    jokeButton.disabled = false;
}

// When the button is clicked, fetch a joke
jokeButton.addEventListener("click", fetchJoke);


// ===== EXAMPLE 2: RANDOM ACTIVITY =====
const activityButton = document.getElementById("activity-button");
const activityDisplay = document.getElementById("activity-display");

async function fetchActivity() {
    activityDisplay.innerHTML = "<p>Thinking... 🤔</p>";
    activityButton.disabled = true;
    
    try {
        const response = await fetch("https://bored-api.appbrewery.com/random");
        const data = await response.json();
        
        activityDisplay.innerHTML = `
            <p><strong>💡 Suggestion:</strong> ${data.activity}</p>
            <p><strong>Type:</strong> ${data.type}</p>
            <p><strong>Participants:</strong> ${data.participants}</p>
        `;
    } catch (error) {
        activityDisplay.innerHTML = `<p class="error">❌ Couldn't get an activity. Try again later!</p>`;
        console.error("Error fetching activity:", error);
    }
    
    activityButton.disabled = false;
}

activityButton.addEventListener("click", fetchActivity);


// ===== EXAMPLE 3: RANDOM DOG IMAGE =====
const dogButton = document.getElementById("dog-button");
const dogDisplay = document.getElementById("dog-display");

async function fetchDog() {
    dogDisplay.innerHTML = "<p>Fetching a good boy... 🐕</p>";
    dogButton.disabled = true;
    
    try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        
        // This API returns an image URL in data.message
        dogDisplay.innerHTML = `
            <img src="${data.message}" alt="A random dog photo">
            <p>🐾 Woof!</p>
        `;
    } catch (error) {
        dogDisplay.innerHTML = `<p class="error">❌ Couldn't fetch a dog photo. Are you online?</p>`;
        console.error("Error fetching dog:", error);
    }
    
    dogButton.disabled = false;
}

dogButton.addEventListener("click", fetchDog);


// ===== EXAMPLE 4: NUMBER FACTS =====
const factButton = document.getElementById("fact-button");
const factDisplay = document.getElementById("fact-display");
const numberInput = document.getElementById("number-input");

async function fetchNumberFact() {
    const number = numberInput.value;
    
    if (!number) {
        factDisplay.innerHTML = "<p>Please enter a number first! 🔢</p>";
        return;
    }
    
    factDisplay.innerHTML = "<p>Looking up that number... 🔍</p>";
    factButton.disabled = true;
    
    try {
        // We put the number right in the URL!
        const response = await fetch(`http://numbersapi.com/${number}/trivia`);
        const text = await response.text();  // This API returns plain text, not JSON
        
        factDisplay.innerHTML = `<p>🧠 <strong>${text}</strong></p>`;
    } catch (error) {
        factDisplay.innerHTML = `<p class="error">❌ Couldn't fetch fact. Try again!</p>`;
        console.error("Error fetching fact:", error);
    }
    
    factButton.disabled = false;
}

factButton.addEventListener("click", fetchNumberFact);

/*
    💡 WHAT IS AN API RESPONSE?
    
    When you fetch data, you get back something like this:
    
    {
        "type": "single",
        "joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
        "id": 232
    }
    
    This is called JSON (JavaScript Object Notation).
    It's just a way of organizing data that JavaScript can easily read.
    
    You access the data with dot notation:
    data.joke → "Why do programmers prefer dark mode?..."
    data.type → "single"
    data.id → 232
*/
