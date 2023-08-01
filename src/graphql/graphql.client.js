import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { getMainDefinition } from "@apollo/client/utilities"
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import { createClient } from "graphql-ws"
import { authentication } from "../firebase/firebase"

// the app must have an Http connection as well as WS Connection to our Graphql server
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_APP_API_URL}`,
})
const wsLink = new GraphQLWsLink(
  createClient({ url: `${import.meta.env.VITE_APP_API_WS_URL}` })
)

// Define Context Header object so that possible token from Firebase is set to the header auth for each request to server
const authLink = setContext(async (_, { headers }) => {
  const user = authentication.currentUser
  const token = user && (await user.getIdToken())
  console.log("here is token from firebase", token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  connectToDevTools: true,
})
