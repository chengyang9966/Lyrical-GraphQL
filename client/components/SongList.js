import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Loading from './Loading';
import { Link, withRouter } from 'react-router-dom';
import fetchSongs from '../queries/fetchSongs';
import deleteSongQuery from '../queries/deleteSongQuery';
import { SONG } from '../types/Songs';

const SongList = (props) => {
  const { loading, error, data, refetch } = useQuery(fetchSongs);
  const [
    deleteSong,
    { loading: DeleteLoading, error: DeleteError, data: DeleteData }
  ] = useMutation(deleteSongQuery, {});

  if (loading || DeleteLoading) {
    return <Loading />;
  }
  if (error || DeleteError) return `Submission error! ${error.message}`;

  const DeleteQuery = (id) => {
    deleteSong({
      variables: { [SONG.ID]: id }
    }).then(() => refetch());
  };

  const Details = (id) => {
    props.history.push(`/songs/${id}`);
  };
  return (
    <>
      <h3>List of Songs </h3>
      <ul className='collection'>
        {data.songs.map(({ id, title }, index) => {
          return (
            <li
              onClick={() => Details(id)}
              className='collection-item'
              key={id}
            >
              {title}
              <i onClick={() => DeleteQuery(id)} className='material-icons'>
                delete
              </i>
            </li>
          );
        })}
      </ul>
      <Link to='/songs/new' className='btn-floating btn-large red right'>
        <i className='material-icons'>add</i>
      </Link>
    </>
  );
};

export default withRouter(SongList);
