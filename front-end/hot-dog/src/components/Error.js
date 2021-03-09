import React from 'react';

const Error = ({ touched, message }) => {
  if (!touched) {
    return <div className="form-message invalid">&nbsp;</div>;
  }
  if (message) {
    return (
      <div
        style={{
          color: 'red',
          fontSize: '0.9em',
          marginLeft: '0.5em',
          marginTop: '0.2em',
        }}
      >
        {message}
      </div>
    );
  }
  return (
    <div
      style={{
        color: 'green',
        fontSize: '0.9em',
        marginLeft: '0.5em',
        marginTop: '0.2em',
      }}
    >
      all good
    </div>
  );
};

export default Error;
