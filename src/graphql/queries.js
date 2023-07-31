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

export const GET_ALL_PLAYERS = gql`
  query GetAllPlayers {
    GetAllPlayers {
      ...PlayerDetails
    }
  }
  ${PLAYER_DETAILS}
`
export const GET_PLAYER_PROFILE_BY_NAME = gql`
  query GetPlayerProfileByName($name: String) {
    GetPlayerProfileByName(name: $name) {
      ...PlayerDetails
    }
  }
  ${PLAYER_DETAILS}
`

export const SEARCH_PLAYERS = gql`
  query SearchPlayers($searchTerm: String) {
    SearchPlayers(searchTerm: $searchTerm) {
      ...PlayerDetails
    }
  }
  ${PLAYER_DETAILS}
`

export const GET_ALL_GAMES = gql`
  query GetAllGames {
    GetAllGames {
      awayTeam {
        ...PlayerDetails
      }
      homeTeam {
        ...PlayerDetails
      }
      playerCount
      id
    }
  }
  ${PLAYER_DETAILS}
`

export const GET_GAME_BY_ID = gql`
  query GetGameById($gameId: String) {
    GetGameById(gameId: $gameId) {
      awayTeam {
        id
        username
      }
      homeTeam {
        username
        id
      }
      id
      playerCount
    }
  }
`
