import { gql } from '@apollo/client';

export default gql`
  query Song($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;
