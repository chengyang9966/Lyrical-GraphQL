import { gql } from '@apollo/client';

export default gql`
  mutation updateLyrics($id: ID, $content: String) {
    updateLyric(id: $id, content: $content) {
      id
      content
    }
  }
`;
