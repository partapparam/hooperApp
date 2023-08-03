import React from "react"
import { UserContext } from "../providers/UserProvider"
import { useContext, useEffect } from "react"

export const useAuth = () => {
  const { isLoggedIn, firebaseUser, signout } = useContext(UserContext)
  return { isLoggedIn, firebaseUser, signout }
}
