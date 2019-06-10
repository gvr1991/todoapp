import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.css';

export default function SidebarLayout(props) {
  const { children } = props;

  return (
    <div id="left-sidebar">
      { children }
    </div>
  );
}

SidebarLayout.propTypes = {
  children: PropTypes.instanceOf.isRequired,
};
