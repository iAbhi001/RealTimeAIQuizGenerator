import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // Ensure your server matches this port
  }),
  cache: new InMemoryCache(),
});