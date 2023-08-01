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

// the app must have an Http connection as well as WS Connection to our Graphql server
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_APP_API_URL}`,
})
const wsLink = new GraphQLWsLink(
  createClient({ url: `${import.meta.env.VITE_APP_API_WS_URL}` })
)

// Define Context Header object so that possible token from Firebase is set to the header auth for each request to server
const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem('firebase')
  const token = "token"
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
