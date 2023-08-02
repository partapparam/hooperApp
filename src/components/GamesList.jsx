import React from "react"
import { GameCard } from "./GameCard"

export const GamesList = ({ games }) => {
  console.log(games)
  return (
    <div className="bg-white text-black p-5">
      {games &&
        games.map((game) => {
          return <GameCard key={game.id} game={game} />
        })}
    </div>
  )
}
