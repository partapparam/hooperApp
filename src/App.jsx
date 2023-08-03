import React from "react"
import { PlayerProfile } from "./pages/PlayerProfile"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { UserProvider } from "./providers/UserProvider"
import { NavBar } from "./components/NavigationBar"
import Signin from "./pages/Signin"
import { Home } from "./pages/Home"
import { EditProfile } from "./pages/EditProfile"

function App() {
  return (
    <Router>
      <UserProvider>
        <NavBar />
        <div className="m-3 bg-purple-500 p-3">
          <Routes>
            {" "}
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<PlayerProfile />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/profile/edit" element={<EditProfile />}></Route>
          </Routes>
        </div>
      </UserProvider>
    </Router>
  )
}

export default App
