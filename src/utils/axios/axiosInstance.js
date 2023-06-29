import axios from "axios"
import firebase from "firebase/app"

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
})

const token = firebase
  .auth()
  .currentUser.getIdToken(/* forceRefresh */ true)
  .then(function (idToken) {
    // Send token to your backend via HTTPS
    // ...
    console.log("Axios interceptor", idToken)
    return idToken
  })
  .catch(function (error) {
    // Handle error
    console.log(error)
  })

axiosClient.interceptors.request.use(
  (config) => {
    // Get user from Firebase
    const user = ""
    console.log("logging token in interceptor", token)
    if (user) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosClient
