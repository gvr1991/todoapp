import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/styles.css';

export default function BreadCrumbsLayout(props) {
  const { children } = props;

  return (
    <div id="bread-crumbs" className="horizontally-aligned">
      { children }
    </div>
  );
}

BreadCrumbsLayout.propTypes = {
  children: PropTypes.instanceOf.isRequired,
};
