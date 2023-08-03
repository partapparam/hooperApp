import React from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"

export const EditProfile = () => {
  const { user } = useAuth()
  console.log(user)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit Profile</h1>
        <div>
          <label htmlFor="first">First Name</label>
          <input
            type="text"
            value={user.name.first}
            {...register("first", { required: "Please enter a first name" })}
          />
          {errors.first?.type === "required" && (
            <p className="form-input-error" role="alert">
              {errors.first?.message}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
