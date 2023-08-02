import React from "react"
import { useState, createContext } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { authentication } from "../firebase/firebase"

// create the context
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        console.log(user)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid
        // ...
        console.log("uid", uid)
        setIsLoggedIn(true)
        setUser(uid)
      } else {
        // User is signed out
        // TODO - Handle with RequiredAuth
        console.log("No user is logged in")
      }
    })
  })

  const logout = () => {
    signOut(authentication)
      .then(() => {
        console.log("Logged out")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, user, logout }}>
      {children}
    </UserContext.Provider>
  )
}
