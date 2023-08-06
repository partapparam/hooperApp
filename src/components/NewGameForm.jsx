import React, { useEffect, useState } from "react"
import { set, useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { CREATE_GAME } from "../graphql/mutations"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useToast } from "../hooks/useToast"

export const NewGameForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const playerId = searchParams.get("player")
  const navigate = useNavigate()
  const toast = useToast()
  const { firebaseUser } = useAuth()
  const user = localStorage.getItem("user")
  const first = searchParams.get("first")
  const last = searchParams.get("last")
  const [createGame] = useMutation(CREATE_GAME, {
    onError: (error) => {
      console.log(error)
    },
    onCompleted: (data) => {
      console.log("mutation is complete")
      console.log("mutaiton data", data)
      toast.open("Game created", "success")
      navigate("/")
    },
  })
  useEffect(() => {
    console.log("id = ", playerId)
  }, [])

  const handleSubmit = () => {
    createGame({
      variables: {
        playerCount: 2,
        awayTeam: [playerId],
        homeTeam: [user],
        createdByPlayerId: user,
      },
    })
  }

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="btn-secondary hover:bg-green-100"
      >
        Challenge {first && first} {last && last} to a game
      </button>
    </div>
  )
}
