import React from "react"
import { Outlet } from "react-router-dom"

export const CreateGame = () => {
  return (
    <div>
      <h1 className="py-5">Create a new game</h1>
      <Outlet />
    </div>
  )
}
