const playerOne = {
  id: 1,
  name: {
    first: "Param",
    last: "Singh",
  },
  phone: "1234556789",
  username: "BallerOne",
  firebaseUID: "dfjslkfjsdfkl33234",
  profilePhoto: "test",
  location: "Los Angeles Ca",
  createdAt: "01/01/01",
  updatedAt: "01/01/01",
}

const playerTwo = {
  id: 2,
  name: {
    first: "Paul",
    last: "Smith",
  },
  phone: "235435432523",
  username: "Two Ballers",
  firebaseUID: "4523425",
  profilePhoto: "test",
  location: "SanFran Ca",
  createdAt: "01/01/01",
  updatedAt: "01/01/01",
}

const offGame = {
  id: 1,
  playerCount: 2,
  createdAt: "01/01/01",
  createdByPlayerId: 1,
  score: {
    away: 45,
    home: 34,
  },
  updatedAt: "02/02/02",
  winningTeam: "home",
  awayTeam: {
    players: [playerOne],
  },
  homeTeam: {
    players: [playerTwo],
  },
}

export const offline = { offGame, playerOne, playerTwo }
