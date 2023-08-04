import React from "react"
import { Outlet } from "react-router-dom"

export const CreateGame = () => {
  return (
    <div>
      <h2>Create a new game</h2>
      <Outlet />
    </div>
  )
}
