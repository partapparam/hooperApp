import { gql } from "@apollo/client"
import { PLAYER_DETAILS, GAME_DETAILS } from "./fragments"

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($firebaseAuth: String!) {
    CreatePlayer(firebaseAuth: $firebaseAuth) {
      code
      message
      success
      player {
        ...PlayerDetails
      }
    }
  }
  ${PLAYER_DETAILS}
`
export const UPDATE_PLAYER_PHOTO = gql`
  mutation UpdatePlayerPhoto($profilePhoto: String!, $playerId: String!) {
    UpdatePlayerPhoto(profilePhoto: $profilePhoto, playerId: $playerId) {
      code
      message
      success
      player {
        ...PlayerDetails
      }
    }
  }
  ${PLAYER_DETAILS}
`

export const UPDATE_PLAYER_PROFILE = gql`
  mutation UpdatePlayer(
    $username: String!
    $first: String!
    $last: String!
    $location: String!
    $firebaseAuth: String!
  ) {
    UpdatePlayer(
      username: $username
      first: $first
      last: $last
      location: $location
      firebaseAuth: $firebaseAuth
    ) {
      code
      message
      success
      player {
        ...PlayerDetails
      }
    }
  }
  ${PLAYER_DETAILS}
`

export const CREATE_GAME = gql`
  mutation CreateGame(
    $playerCount: Int!
    $awayTeam: [String]!
    $homeTeam: [String]!
    $createdByPlayerId: String!
  ) {
    CreateGame(
      playerCount: $playerCount
      awayTeam: $awayTeam
      homeTeam: $homeTeam
      createdByPlayerId: $createdByPlayerId
    ) {
      code
      message
      success
      game {
        ...GameDetails
      }
    }
  }
  ${GAME_DETAILS}
`
export const UPDATE_GAME = gql`
  mutation UpdateGame($home: Int, $away: Int, $winningTeam: String) {
    UpdateGame(home: $home, away: $away, winningTeam: $winningTeam) {
      code
      message
      success
      game {
        ...GameDetails
      }
    }
  }
  ${GAME_DETAILS}
`

export const DELETE_GAME = gql`
  mutation DeleteGame($gameId: String!, $playerId: String!) {
    DeleteGame(gameId: $gameId, playerId: $playerId) {
      code
      message
      success
    }
  }
`