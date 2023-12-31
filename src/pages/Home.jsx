import React from "react"
import { useQuery } from "@apollo/client"
import { GET_ALL_GAMES, GET_ALL_PLAYERS } from "../graphql/queries"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { GamesList } from "../components/GamesList"
import { HomeBanner } from "../components/HomeBanner"

export const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_GAMES)

  if (loading) {
    return (
      <div>
        <LoadingSpinner message={"loading games"} />
      </div>
    )
  }

  if (error) {
    console.log(error)
    return <div className="bg-red-400 p-10">Error</div>
  }

  if (data) {
    console.log(data)
  }

  return (
    <div>
      <HomeBanner />
      {data && data.GetAllGames && <GamesList games={data.GetAllGames} />}
    </div>
  )
}
