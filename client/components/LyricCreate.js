import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import addLyricsQuery from '../queries/addLyricsQuery';
import { SONG } from '../types/Songs';
import { withRouter } from 'react-router';
import Loading from './Loading';
import CustomInput from './customInput';
import updateLyricsQuery from '../queries/updateLyricsQuery';

const LyricCreate = ({ lyricItem, ...props }) => {
  const defaultContent = '';
  const [content, setContent] = useState(defaultContent);
  const [addLyricToSong, { loading, error }] = useMutation(addLyricsQuery);
  const [updateLyric, { error: LyricError }] = useMutation(updateLyricsQuery);

  const onchange = (e) => {
    let { value } = e.target;
    setContent(value);
  };
  useEffect(() => {
    lyricItem && lyricItem.content && setContent(lyricItem.content);
  }, [lyricItem]);
  if (loading) return <Loading />;
  if (error || LyricError) return `Submission error! ${error.message}`;
  const onSubmit = (e) => {
    e.preventDefault();
    let variables = {
      [SONG.SONG_ID]: props.match.params.id,
      [SONG.CONTENT]: content
    };
    if (lyricItem) {
      variables[SONG.ID] = lyricItem.id;
      updateLyric({
        variables,
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            id: lyricItem.id,
            content: content,
            __typename: 'LyricType'
          }
        }
      }).then(() => {
        setContent(defaultContent);
      });
    } else {
      addLyricToSong({
        variables
      }).then(() => {
        setContent(defaultContent);
      });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <label>{lyricItem && content ? 'Edit' : 'Add'} Lyrics</label>
      <CustomInput
        name={SONG.CONTENT}
        onChange={onchange}
        value={content}
        close={() => onchange({ target: { value: '' } })}
      />
      {/* <input name={SONG.CONTENT} onChange={onchange} value={content} /> */}
    </form>
  );
};

export default withRouter(LyricCreate);
