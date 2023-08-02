import React from "react"
import { useQuery } from "@apollo/client"
import { GET_ALL_GAMES } from "../graphql/queries"
import { LoadingSpinner } from "../components/LoadingSpinner"

export const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_GAMES)

  if (loading) {
    return (
      <div className="bg-green-300 p-10">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-400 p-10">Error</div>
  }

  return (
    <div>
      {data &&
        data.games &&
        data.games.map((game) => {
          return <div key={game.gameId}>{game.gameId}</div>
        })}
      {data && !data.games && <div>Nothing to Show</div>}
    </div>
  )
}
