import React from "react"
import Signup from "./pages/signup"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { UserProvider } from "./providers/UserProvider"

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {" "}
          <Route path="/" element={<Signup />} />
          {/* <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> */}
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
