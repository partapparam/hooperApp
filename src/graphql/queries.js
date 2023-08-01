import { gql } from "@apollo/client"
import { GAME_DETAILS, PLAYER_DETAILS } from "./fragments"

export const GET_ALL_PLAYERS = gql`
  query GetAllPlayers {
    GetAllPlayers {
      ...PlayerDetails
    }
  }
  ${PLAYER_DETAILS}
`

export const GET_PLAYER_PROFILE_AUTH = gql`
  query GetPlayerProfileByAuth($firebaseAuth: String) {
    GetPlayerProfileByAuth(firebaseAuth: $firebaseAuth) {
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
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`

export const GET_GAME_BY_ID = gql`
  query GetGameById($gameId: String) {
    GetGameById(gameId: $gameId) {
      ...GameDetails
    }
  }
  ${GAME_DETAILS}
`
