import React from "react"
import { useAuth } from "../hooks/useAuth"
import { useQuery } from "@apollo/client"
import { GET_PLAYER_PROFILE_BY_AUTH } from "../graphql/queries"

export const PlayerProfile = () => {
  const { user } = useAuth()
  console.log(user)
  const { loading, error, data } = useQuery(GET_PLAYER_PROFILE_BY_AUTH, {
    variables: { user },
  })
  console.log(loading, error, data)
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{user && user.user}</h2>
    </div>
  )
}
