import { ApolloClient, InMemoryCache } from '@apollo/client'

const createApolloClient = () => {
    return new ApolloClient({
      uri: "http://localhost:5000/graphql",
      cache: new InMemoryCache()
    });
}

export { createApolloClient };