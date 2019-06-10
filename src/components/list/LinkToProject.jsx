import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function LinkToProject(props) {
  const { project } = props;

  return (
    <React.Fragment>
      <br />
      <Link to={`/project/${project.id}/lists`}>
        {project.title}
      </Link>
      <br />
    </React.Fragment>
  );
}

LinkToProject.propTypes = {
  project: PropTypes.instanceOf.isRequired,
};
