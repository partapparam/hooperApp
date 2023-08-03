import React from "react"
import { useAuth } from "../hooks/useAuth"
import { useQuery } from "@apollo/client"
import { GET_PLAYER_PROFILE_BY_AUTH } from "../graphql/queries"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"

export const PlayerProfile = () => {
  const { firebaseUser } = useAuth()
  console.log(firebaseUser)
  const { loading, error, data } = useQuery(GET_PLAYER_PROFILE_BY_AUTH, {
    variables: { firebaseUID: firebaseUser },
  })
  let response = null

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <ErrorMessage message={"Could not Load"} status={"404"} />
  }

  if (data) {
    console.log(data)
    response = data.GetPlayerProfileByAuth
  }

  return (
    <>
      {response && (
        <div>
          <h1>Profile Page</h1>
          <h2>{response.firebaseUID}</h2>
          <p>{response.phone}</p>
        </div>
      )}
    </>
  )
}
