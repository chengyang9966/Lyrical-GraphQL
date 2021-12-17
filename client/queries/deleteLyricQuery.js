import { gql } from '@apollo/client';

export default gql`
  mutation DeleteLyric($id: ID) {
    deleteLyric(id: $id) {
      id
    }
  }
`;
