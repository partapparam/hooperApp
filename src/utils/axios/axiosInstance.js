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

axiosClient.defaults.headers.common["Authorization"] = "test"
axiosClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default axiosClient
