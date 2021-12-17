import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import fetchSingleSongQuery from '../queries/fetchSingleSongQuery';
import { SONG } from '../types/Songs';
import Loading from './Loading';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

function SongDetails(props) {
  const [item, setItem] = useState(null);
  const [lyricItem, setLyricItem] = useState(null);
  const { loading, error, data, refetch } = useQuery(fetchSingleSongQuery, {
    variables: { [SONG.ID]: props.match.params.id }
  });

  useEffect(() => {
    if (data && data.song) {
      setItem(data.song);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <div>
      <Link to='/'>Back</Link>
      <h3>{item?.title}</h3>

      {item?.lyrics.length > 0 ? (
        <LyricList
          songId={item.id}
          lyrics={item?.lyrics}
          setLyricItem={(value) => {
            setLyricItem(value);
          }}
        />
      ) : null}

      <LyricCreate lyricItem={lyricItem} />
    </div>
  );
}

export default withRouter(SongDetails);
