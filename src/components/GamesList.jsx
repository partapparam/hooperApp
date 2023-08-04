import React from "react"
import { GameCard } from "./GameCard"
import { Link } from "react-router-dom"

export const GamesList = ({ games }) => {
  console.log(games)
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-white">Games</h1>
        <button className="btn-secondary">
          <Link to="/game/create">New</Link>
        </button>
      </div>
      {games &&
        games.map((game) => {
          return <GameCard key={game.id} game={game} />
        })}
    </div>
  )
}
