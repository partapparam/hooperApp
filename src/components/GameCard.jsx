import React from "react"

export const GameCard = ({ game }) => {
  return (
    <div className="flex flex-col p-3 my-3 shadow-lg bg-gray-300">
      <h3>Players in the Game: {game.playerCount}</h3>
      <div>
        <h3>Home Team</h3>
        {game.homeTeam.map((player) => {
          return (
            <div key={player.id}>
              <p>{player.firebaseUID}</p>
              <p>{player.phone}</p>
            </div>
          )
        })}
      </div>
      <div>
        <h3>Away Team</h3>
        {game.awayTeam.map((player) => {
          return (
            <div key={player.id}>
              <p>{player.firebaseUID}</p>
              <p>{player.phone}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
