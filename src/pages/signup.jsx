import React, { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { authentication } from "../firebase/firebase"
import { memo } from "react"
import { useAuth } from "../hooks/useAuth"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

const Signup = () => {
  // const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [OTP, setOTP] = useState("")
  const [expandForm, setExpandForm] = useState(false)
  const { isLoggedIn, user, signout } = useAuth()

  const verifyOTP = (event) => {
    let otp = event.target.value
    setOTP(otp)
    if (otp.length === 6) {
      console.log("OTP is 6", otp)
      // we need to verify the OTP
      let confirmationResult = window.confirmationResult
      confirmationResult
        .confirm(otp)
        .then((result) => {
          console.log("Sent otp to google")
          const user = result.user
          console.log(user)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setExpandForm(false)
        })
    }
  }

  const generateRecaptcha = () => {
    // setting a global verifier for out app
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCATCHA solver
          console.log("Response from auth, ", response)
        },
      },
      authentication
    )
  }

  const requestOTP = (event) => {
    event.preventDefault()
    if (phoneNumber.length >= 10) {
      setExpandForm(true)
      if (!window.recaptchaVerifier) {
        generateRecaptcha()
        console.log("Recaptcha Does not exist so we generate. Request OTP")
      }
      const appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult
        })
        .catch((err) => {
          console.log("Err with phone number signin", err)
        })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setPhoneNumber(event.target.value)
  }

  useEffect(() => {
    if (isLoggedIn) {
      console.log("user exists")
      console.log(user)
    }
  }, [isLoggedIn, user])

  const signOutUser = () => {
    signout()
  }

  return (
    <div>
      <section>
        <div>
          <div>
            <h1> Hooper </h1>
            <form onSubmit={requestOTP}>
              <h1>Sign in with phone Number</h1>
              <div className="m-2">
                <label htmlFor="phoneNumberInput">Phone</label>
                <input
                  type="tel"
                  id="phoneNumberInput"
                  value={phoneNumber}
                  onChange={handleSubmit}
                />
              </div>
              {expandForm === true ? (
                <>
                  <div className="p-2 bg-red-200">
                    <label htmlFor="otpInput">OTP</label>
                    <input
                      type="number"
                      id="otpInput"
                      value={OTP}
                      onChange={verifyOTP}
                    />
                    <div id="otpHelp">Please enter the one time pin</div>
                  </div>
                </>
              ) : null}
              {expandForm === false ? (
                <button type="submit">Request OTP</button>
              ) : null}
              <div id="sign-in-button"></div>
              {/* <button type="submit" onClick={onSubmit}>
                Sign up
              </button> */}
            </form>

            <p>
              <button onClick={signOutUser}>sign out</button>
              Already have an account? <NavLink to="/login">Sign in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(Signup)
