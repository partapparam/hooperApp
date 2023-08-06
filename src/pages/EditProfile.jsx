import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"
import { useQuery, useMutation } from "@apollo/client"
import { GET_PLAYER_PROFILE_BY_AUTH } from "../graphql/queries"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"
import { UPDATE_PLAYER_PROFILE } from "../graphql/mutations"
import { useNavigate } from "react-router-dom"

let renderCount = 0

export const EditProfile = () => {
  const { firebaseUser } = useAuth()
  const navigate = useNavigate()
  const [updatePlayer] = useMutation(UPDATE_PLAYER_PROFILE, {
    onError: (error) => {
      const message = error.graphQLErrors[0].message
      console.log(message)
    },
    onCompleted: () => {
      console.log("Mutation is complete, so we navigate")
      handleReset()
    },
  })
  let response = null
  const { loading, error, data } = useQuery(GET_PLAYER_PROFILE_BY_AUTH, {
    variables: { firebaseUID: firebaseUser },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      first: "",
      last: "",
      location: "",
      username: "",
    },
  })

  useEffect(() => {
    let defaultValues = {}
    if (response && response.name.first && response.name.last) {
      defaultValues.first = response.name.first
      defaultValues.last = response.name.last
      defaultValues.location = response.location
      defaultValues.username = response.username
      reset({ ...defaultValues })
    }
  }, [response, reset])

  const onSubmit = async (data) => {
    console.log("onsubmit called")
    updatePlayer({
      variables: {
        first: data.first,
        last: data.last,
        location: data.location,
        username: data.username,
        firebaseUID: firebaseUser,
      },
    })
  }

  const handleReset = () => {
    console.log("calling reset")
    reset()
    navigate("/profile")
  }

  if (loading) {
    console.log("loading called")
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }
  if (error) {
    console.log("error called")
    return <ErrorMessage message={"Could not Load"} status={"404"} />
  }
  if (data) {
    console.log("setting data")
    response = data.GetPlayerProfileByAuth
  }

  renderCount++

  return (
    <>
      <h1>Edit Profile</h1>
      <p className="p-3 bg-red-500">{renderCount}</p>
      {response && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 mb-6 w-3/4 sm:w-1/2"
        >
          <div>
            <label htmlFor="first">First Name</label>
            <input
              type="text"
              {...register("first", { required: "Please enter a first name" })}
            />
            {errors.first?.type === "required" && (
              <p className="form-input-error" role="alert">
                {errors.first?.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="last">Last Name</label>
            <input
              type="text"
              {...register("last", { required: "Please enter a last name" })}
            />
            {errors.last?.type === "required" && (
              <p className="form-input-error" role="alert">
                {errors.last?.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              {...register("username", { required: "Please enter a username" })}
            />
            {errors.last?.type === "required" && (
              <p className="form-input-error" role="alert">
                {errors.username?.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              placeholder="City, State"
              {...register("location", {
                required: "Please enter a City and State",
              })}
            />
            {errors.last?.type === "required" && (
              <p className="form-input-error" role="alert">
                {errors.location?.message}
              </p>
            )}
          </div>
          <div>
            <input type="submit" className="btn-primary" />
            <button
              type="button"
              className="btn-secondary"
              onClick={handleReset}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {!response && <ErrorMessage status={"No"} message={"nonon"} />}
    </>
  )
}
