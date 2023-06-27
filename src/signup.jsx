import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth"
import { auth } from "./firebase"
import firebase from "firebase"

const Signup = () => {
  const navigate = useNavigate()
  let verify = new firebase.auth.RecaptchaVerifier("sign-in-button")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()

    await signInWithPhoneNumber(auth, "3462738722", verify)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      })

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        // navigate("/login")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        alert(errorMessage)
        // ..
      })
  }

  return (
    <div>
      <section>
        <div>
          <div>
            <h1> Hooper </h1>
            <form>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <button type="submit" onClick={onSubmit}>
                Sign up
              </button>
            </form>

            <p>
              Already have an account? <NavLink to="/login">Sign in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup
