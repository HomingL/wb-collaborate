import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'


const httpLink = createHttpLink({ 
    uri: process.env.NEXT_PUBLIC_BACK_END_ORIGIN, 
    credentials: 'include', }
);

const authLink = setContext((_, { headers }) => {

  const token = Cookies.get('token')
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

const createApolloClient = () => {
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
}

export { createApolloClient };