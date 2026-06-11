/*
    🎓 REACT DEMO: App Component
    ==============================
    
    WHAT IS REACT?
    React is a library that makes building interactive UIs easier.
    Instead of manually updating the page with document.getElementById,
    React does it for you automatically!
    
    KEY CONCEPTS:
    - Components: Reusable pieces of UI (like building blocks)
    - State: Data that can change (React re-renders when state changes!)
    - JSX: Write HTML-like code inside JavaScript
    - Props: Pass data from parent to child components
    
    Think of a Component as a FUNCTION that returns HTML!
*/

import { useState } from 'react'

// This is a COMPONENT! It's just a function that returns JSX (HTML-like code)
function App() {
    // useState creates a piece of "state" (data that can change)
    // count = the current value
    // setCount = function to update the value
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')
    const [greeting, setGreeting] = useState('')

    // This function runs when the greet button is clicked
    function handleGreet() {
        if (name) {
            setGreeting(`Hello, ${name}! Welcome to React! 🎉`)
        } else {
            setGreeting('Please type your name first!')
        }
    }

    // Everything inside return() is what shows up on the page
    return (
        <div className="app">
            <header className="header">
                <h1>⚛️ Hello Workshop!</h1>
                <p>This is your first React app!</p>
            </header>

            {/* COUNTER DEMO: Shows how state works */}
            <section className="demo-section">
                <h2>🔢 Counter (useState Demo)</h2>
                <p className="explanation">
                    In React, when "state" changes, the page updates automatically!
                </p>
                <div className="counter">
                    <button onClick={() => setCount(count - 1)}>➖</button>
                    <span className="count-display">{count}</span>
                    <button onClick={() => setCount(count + 1)}>➕</button>
                </div>
                <button className="reset-btn" onClick={() => setCount(0)}>
                    Reset
                </button>
            </section>

            {/* GREETER DEMO: Shows input handling */}
            <section className="demo-section">
                <h2>👋 Greeter (Input Demo)</h2>
                <p className="explanation">
                    React makes it easy to work with form inputs!
                </p>
                <input
                    type="text"
                    placeholder="Type your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="name-input"
                />
                <button onClick={handleGreet} className="greet-btn">
                    Greet Me!
                </button>
                {greeting && <p className="greeting-text">{greeting}</p>}
            </section>

            {/* HOW IT COMPARES */}
            <section className="demo-section comparison">
                <h2>🤔 React vs Plain JavaScript</h2>
                <div className="compare-grid">
                    <div className="compare-box">
                        <h3>Plain JS</h3>
                        <code>
                            document.getElementById("count").textContent = count;
                        </code>
                    </div>
                    <div className="compare-box">
                        <h3>React</h3>
                        <code>
                            {'{count}'}
                        </code>
                    </div>
                </div>
                <p className="note">
                    React automatically updates the page when data changes. 
                    No more manual DOM updates! ✨
                </p>
            </section>

            <footer className="footer">
                <p>Built with React + Vite ⚡</p>
                <p>This is just the beginning — React can build entire apps!</p>
            </footer>
        </div>
    )
}

export default App
