import { gql } from '@apollo/client';    //It is used to create queries

//created a query getClients in which i have fetched all clients data
const GET_CLIENTS = gql `
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS };