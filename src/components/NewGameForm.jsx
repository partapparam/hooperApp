import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { CREATE_GAME } from "../graphql/mutations"
import { useParams, useSearchParams } from "react-router-dom"

export const NewGameForm = () => {
  const { register } = useForm()
  const { player, first, last, location } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [createGame] = useMutation(CREATE_GAME, {
    onError: (error) => {
      console.log(error)
    },
    onCompleted: () => {
      console.log("mutation is complete")
    },
  })
  useEffect(() => {
    console.log(player, first, last, location)
    console.log(searchParams)
  }, [])

  return <div>New game form</div>
}
