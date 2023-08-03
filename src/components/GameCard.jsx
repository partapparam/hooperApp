import React from "react"

export const GameCard = ({ game }) => {
  return (
    <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row p-3 my-3 shadow-lg items-center	justify-center text-center bg-gray-300 ">
      <div className="p-2">
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
      <div className="p-2">
        <h3>vs.</h3>
      </div>
      <div className="p-2">
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
