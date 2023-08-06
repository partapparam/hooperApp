import React from "react"
import { PlayerProfile } from "./pages/PlayerProfile"
import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { UserProvider } from "./providers/UserProvider"
import { NavBar } from "./components/NavigationBar"
import Signin from "./pages/Signin"
import { Home } from "./pages/Home"
import { EditProfile } from "./pages/EditProfile"
import { CreateGame } from "./pages/CreateGame"
import { SearchPlayers } from "./components/SearchPlayer"
import { NewGameForm } from "./components/NewGameForm"
import { ToastProvider } from "./providers/ToastProvider"

function App() {
  return (
    <Router>
      <ToastProvider>
        <UserProvider>
          <NavBar />
          <div className="m-3 bg-purple-800 p-3">
            <Routes>
              {" "}
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<PlayerProfile />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/profile/edit" element={<EditProfile />}></Route>
              <Route path="/game/create" element={<CreateGame />}>
                <Route path="form" element={<NewGameForm />} />
                <Route index element={<SearchPlayers />} />
              </Route>
            </Routes>
          </div>
        </UserProvider>
      </ToastProvider>
    </Router>
  )
}

export default App
