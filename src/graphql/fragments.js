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

export const GAME_DETAILS = gql`
  fragment GameDetails on Game {
    id
    playerCount
    createdAt
    createdByPlayerId
    score {
      away
      home
    }
    updatedAt
    winningTeam
    awayTeam {
      ...PlayerDetails
    }
    homeTeam {
      ...PlayerDetails
    }
  }
  ${PLAYER_DETAILS}
`
