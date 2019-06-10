import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LinkToList(props) {
  const { list } = props;

  return (
    <React.Fragment>
      <br />
      <Link to={`/project/${list.projectId}/list/${list.id}/tasks`}>
        {list.title}
      </Link>
      <br />
    </React.Fragment>
  );
}

LinkToList.propTypes = {
  list: PropTypes.node.isRequired,
};
