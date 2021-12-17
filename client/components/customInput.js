import React from 'react';

const CustomInput = ({
  name,
  value,
  onChange = () => {},
  close = () => {}
}) => {
  return (
    <span style={{ position: 'relative' }}>
      <input name={name} value={value} onChange={onChange} />
      {value && (
        <i
          style={{ position: 'absolute', right: 5, top: 0 }}
          className='material-icons'
          onClick={close}
        >
          close
        </i>
      )}
    </span>
  );
};

export default CustomInput;
