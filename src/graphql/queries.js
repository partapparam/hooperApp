import { gql } from "@apollo/client"

export const PLAYER_DETAILS = gql`
  fragment PlayerDetails on Player {
    id
    name {
      first
      last
    }
    phone
    firebaseAuth
    photoUrl
    location
  }
`

export const GET_ALL_PLAYERS = gql`
  query {
    GetAllPlayers {
      ...PlayerDetails
    }
  }
  ${PLAYER_DETAILS}
`
export const GET_PLAYER_PROFILE_BY_NAME = gql``
