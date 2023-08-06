import React from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { CREATE_GAME } from "../graphql/mutations"
import { GET_ALL_GAMES } from "../graphql/queries"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useToast } from "../hooks/useToast"

export const NewGameForm = () => {
  const [searchParams] = useSearchParams()
  const playerId = searchParams.get("player")
  const navigate = useNavigate()
  const toast = useToast()
  const user = localStorage.getItem("user")
  const first = searchParams.get("first")
  const last = searchParams.get("last")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [createGame] = useMutation(CREATE_GAME, {
    onError: (error) => {
      console.log(error)
    },
    // update: (cache, response) => {
    //   cache.updateQuery({ query: GET_ALL_GAMES }, ({ GetAllGames }) => {
    //     console.log("trying to update the game")
    //     console.log(response)
    //     return {
    //       GetAllGames: GetAllGames.concat(response.data.game),
    //     }
    //   })
    // },
    onCompleted: (data) => {
      console.log("mutaiton is complete", data)
      toast.open("Game created", "success")
      navigate("/")
    },
  })

  const formSubmit = (data) => {
    if (data.home > data.away) {
      data.winningTeam = "home"
    } else if (data.home < data.away) {
      data.winningTeam = "away"
    } else {
      data.winningTeam = "tie"
    }
    console.log(data)

    createGame({
      variables: {
        playerCount: 2,
        awayTeam: [playerId],
        homeTeam: [user],
        createdByPlayerId: user,
        home: parseInt(data.home),
        away: parseInt(data.away),
        winningTeam: data.winningTeam,
      },
    })
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="grid gap-6 mb-6 w-3/4 sm:w-1/2"
      >
        <div>
          <label htmlFor="home">Your Score</label>
          <input
            type="number"
            {...register("home", { required: "Please enter a score" })}
          />
          {errors.first?.type === "required" && (
            <p className="form-input-error" role="alert">
              {errors.home?.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="away">{first} Score</label>
          <input
            type="number"
            {...register("away", { required: "Please enter a score" })}
          />
          {errors.first?.type === "required" && (
            <p className="form-input-error" role="alert">
              {errors.away?.message}
            </p>
          )}
        </div>
        <button type="submit" className="btn-secondary hover:bg-green-100">
          Add a game with {first && first} {last && last}
        </button>
      </form>
    </div>
  )
}
