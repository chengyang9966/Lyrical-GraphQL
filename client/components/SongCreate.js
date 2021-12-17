import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Loading from './Loading';
import { Link, withRouter } from 'react-router-dom';
import addSongQuery from '../queries/addSongQuery';
import fetchSongs from '../queries/fetchSongs';
import { SONG } from '../types/Songs';
const SongCreate = (props) => {
  const defaultSong = {
    title: ''
  };

  const [addSong, { loading, error }] = useMutation(addSongQuery);

  const [song, setSong] = useState(defaultSong);
  const onchange = (e) => {
    setSong({ [e.target.name]: e.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    addSong({
      variables: { [SONG.TITLE]: song[SONG.TITLE] },
      refetchQueries: [{ query: fetchSongs }]
    }).then((res) => {
      props.history.push('/');
    });
  };
  if (loading) return <Loading />;
  if (error) return `Submission error! ${error.message}`;
  return (
    <div>
      <Link to='/'>Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title:</label>
        <input name={SONG.TITLE} value={song[SONG.TITLE]} onChange={onchange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default withRouter(SongCreate);
