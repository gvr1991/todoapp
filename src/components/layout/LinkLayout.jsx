import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkLayout = function LinkLayout(props) {
  const {
    linkTo,
    linkText,
  } = props;

  return (
    <React.Fragment>
      <hr />
      <Link to={linkTo}>
        {linkText}
      </Link>
      <hr />
    </React.Fragment>
  );
};

LinkLayout.propTypes = {
  linkTo: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default LinkLayout;
