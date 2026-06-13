/*
    🎓 REACT DEMO: Entry Point
    ============================
    
    This file is the starting point of our React app.
    It connects React to the HTML page (the #root div).
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// This tells React: "Put the <App /> component inside the #root div"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
