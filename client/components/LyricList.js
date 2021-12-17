import { useMutation } from '@apollo/client';
import React from 'react';
import deleteLyricQuery from '../queries/deleteLyricQuery';
import fetchSingleSongQuery from '../queries/fetchSingleSongQuery';
import likeLyricQuery from '../queries/likeLyricQuery';
import { SONG } from '../types/Songs';
import Loading from './Loading';

const LyricList = ({ lyrics, setLyricItem, songId }) => {
  const [likeLyric, { error }] = useMutation(likeLyricQuery);
  const [deleteLyrics, { loading, error: deleteLyricError }] =
    useMutation(deleteLyricQuery);

  if (loading) return <Loading />;

  if (error || deleteLyricError) return `Submission error! ${error.message}`;

  const clickLiked = (id, likes) => {
    likeLyric({
      variables: { [SONG.ID]: id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          likes: likes + 1,
          __typename: 'LyricType'
        }
      }
    });
  };
  const clickDelete = (id) => {
    deleteLyrics({
      variables: { [SONG.ID]: id },
      refetchQueries: [
        { query: fetchSingleSongQuery, variables: { [SONG.ID]: songId } }
      ]
    });
  };
  const Icon = (name, onclick) => {
    return (
      <i onClick={onclick} className='material-icons'>
        {name}
      </i>
    );
  };
  return (
    <ul className='collection'>
      {lyrics.map(({ content, likes, id }) => {
        return (
          <li key={id} className='collection-item'>
            <h4 onClick={() => setLyricItem({ content, id })}>{content}</h4>
            <div className='vote-box'>
              {Icon('thumb_up', () => clickLiked(id, likes))}
              <p>{likes}</p>
              {Icon('delete', () => clickDelete(id))}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LyricList;
