import React from 'react';
import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert';

const Error = ({ message }) => {
  return (
    <Alert variant="danger">
      {message}
    </Alert>
  )
};

//
// Types
//
Error.propTypes = {
  message: PropTypes.string
};

export default Error;
