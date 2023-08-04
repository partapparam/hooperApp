import React from "react"

export const GameCard = ({ game }) => {
  return (
    <div className="flex flex-col sm:flex-row p-3 my-5 shadow-xl items-center	justify-center text-center bg-slate-100 text-black">
      <div className="p-2">
        <h3>Home Team</h3>
        <p>Score: {game.score.home}</p>
        <div>
          <p className="underline font-bold">Players</p>
          {game.homeTeam.map((player) => {
            return (
              <div key={player.id}>
                <p>
                  {player.name.first} {player.name.last}
                </p>
                <p>{player.phone}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className="p-2">
        <h3>vs.</h3>
      </div>
      <div className="p-2">
        <h3>Away Team</h3>
        <p>Score: {game.score.away}</p>
        <div>
          <p className="text-underline text-bold">Players</p>
          {game.awayTeam.map((player) => {
            return (
              <div key={player.id}>
                <p>
                  {player.name.first} {player.name.last}
                </p>
                <p>{player.phone}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
