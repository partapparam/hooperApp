import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"
import { useQuery } from "@apollo/client"
import { GET_PLAYER_PROFILE_BY_AUTH } from "../graphql/queries"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { ErrorMessage } from "../components/ErrorMessage"

export const EditProfile = () => {
  const { firebaseUser } = useAuth()
  console.log(firebaseUser)
  let response = null
  const { loading, error, data } = useQuery(GET_PLAYER_PROFILE_BY_AUTH, {
    variables: { firebaseUID: firebaseUser },
  })
  if (data) {
    response = data.GetPlayerProfileByAuth
    console.log(response)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({})

  const onSubmit = async (data) => {
    console.log(data)
  }

  const handleReset = () => {
    reset()
  }

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }
  if (error) {
    return <ErrorMessage message={"Could not Load"} status={"404"} />
  }

  return (
    <>
      <h1>Edit Profile</h1>
      {response && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6 mb-6 md:grid-cols-2"
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
        </form>
      )}
      {!response && <ErrorMessage status={"No"} message={"nonon"} />}
    </>
  )
}
