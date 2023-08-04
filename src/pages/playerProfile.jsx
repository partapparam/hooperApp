import React from "react"
import { useAuth } from "../hooks/useAuth"
import { useQuery } from "@apollo/client"
import { GET_PLAYER_PROFILE_BY_AUTH } from "../graphql/queries"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"
import { Link } from "react-router-dom"

export const PlayerProfile = () => {
  const { firebaseUser } = useAuth()
  const { loading, error, data } = useQuery(GET_PLAYER_PROFILE_BY_AUTH, {
    variables: { firebaseUID: firebaseUser },
  })
  let playerProfileData = null

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
    playerProfileData = data.GetPlayerProfileByAuth
  }

  return (
    <>
      {playerProfileData && (
        <div>
          <h1>Profile Page</h1>
          <h2>
            {playerProfileData.name.first} {playerProfileData.name.last}
          </h2>
          <p>{playerProfileData.phone}</p>
          {playerProfileData.firebaseUID === firebaseUser ? (
            <button className="btn-secondary">
              <Link to="/profile/edit">Edit Profile</Link>
            </button>
          ) : null}
        </div>
      )}
    </>
  )
}
