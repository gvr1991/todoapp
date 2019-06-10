import React from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.css';

export default function TodoListContent(props) {
  const {
    breadCrumbs,
    title,
    input,
    collection,
  } = props;

  return (
    <div id="content">
      { breadCrumbs }
      <h1 id="heading">{ title }</h1>
      { input }
      <div id="overflow">
        { collection }
      </div>
    </div>
  );
}

TodoListContent.propTypes = {
  breadCrumbs: PropTypes.node,
  title: PropTypes.node.isRequired,
  input: PropTypes.node.isRequired,
  collection: PropTypes.node.isRequired,
};

TodoListContent.defaultProps = {
  breadCrumbs: '',
};
