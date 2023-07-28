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
