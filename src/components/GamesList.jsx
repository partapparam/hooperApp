import React from "react"
import { GameCard } from "./GameCard"
import { Link } from "react-router-dom"

export const GamesList = ({ games }) => {
  console.log(games)
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h1 className="text-white">Games</h1>

        <Link to="/game/create">
          <button className="btn-secondary">New</button>
        </Link>
      </div>
      {games &&
        games.map((game) => {
          return <GameCard key={game.id} game={game} />
        })}
    </div>
  )
}
