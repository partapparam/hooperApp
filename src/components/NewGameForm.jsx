import React from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { CREATE_GAME } from "../graphql/mutations"

export const NewGameForm = () => {
  const { register } = useForm()
  const [createGame] = useMutation(CREATE_GAME, {
    onError: (error) => {
      console.log(error)
    },
    onCompleted: () => {
      console.log("mutation is complete")
    },
  })

  return <div>New game form</div>
}
