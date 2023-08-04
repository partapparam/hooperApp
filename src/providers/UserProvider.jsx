import React, { useEffect } from "react"
import { useState, createContext } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { authentication } from "../firebase/firebase"

// create the context
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [firebaseUser, setFirebaseUser] = useState(() => {
    return localStorage.getItem("firebaseUser")
  })

  useEffect(() => {
    const authorize = async () => {
      await onAuthStateChanged(authentication, (user) => {
        if (user) {
          // console.log(user)
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid
          // ...
          setIsLoggedIn(true)
          setFirebaseUser(user.uid)
          localStorage.setItem("firebaseUser", uid)
        } else {
          // User is signed out
          // TODO - Handle with RequiredAuth
          console.log("No user is logged in")
        }
      })
    }

    authorize()
  }, [])

  const logout = () => {
    signOut(authentication)
      .then(() => {
        console.log("Logged out")
        localStorage.removeItem("firebaseUser")
        setIsLoggedIn(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, firebaseUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}
