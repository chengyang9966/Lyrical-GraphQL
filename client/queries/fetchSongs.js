import {  gql } from "@apollo/client";


export default gql`
  query Songs {
    songs {
      id
      title
    }
  }
`;