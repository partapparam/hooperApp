import React from "react"
import { useAuth } from "../hooks/useAuth"

export const PlayerProfile = () => {
  const user = useAuth()
  console.log(user)

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{user && user.user}</h2>
    </div>
  )
}
