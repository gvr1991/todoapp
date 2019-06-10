import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.css';

export default function MainPageLayout(props) {
  const { children } = props;

  return (
    <div className="horizontally-aligned">
      { children }
    </div>
  );
}

MainPageLayout.propTypes = {
  children: PropTypes.instanceOf.isRequired,
};
