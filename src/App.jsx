import React, { useState, useEffect } from "react"
// import Home from "./page/Home"
import Signup from "./pages/signup"
// import Login from "./page/Login"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            {" "}
            <Route path="/" element={<Signup />} />
            {/* <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> */}
          </Routes>
        </section>
      </div>
    </Router>
  )
}

export default App
