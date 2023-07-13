import React from "react"
import { UserContext } from "../providers/UserProvider"
import { useContext, useEffect } from "react"

export const useAuth = () => {
  const { isLoggedIn, user, signout } = useContext(UserContext)
  return { isLoggedIn, user, signout }
}