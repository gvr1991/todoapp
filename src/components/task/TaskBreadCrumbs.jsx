import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumbsLayout from '../layout/BreadCrumbsLayout';
import LinkLayout from '../layout/LinkLayout';

export default function TaskBreadCrumbs(props) {
  const { list, project } = props;

  return (
    <BreadCrumbsLayout>
      <LinkLayout
        linkTo="/projects"
        linkText="Projects"
      />
      &gt;
      <LinkLayout
        linkTo={`/project/${project.id}/lists`}
        linkText={project.title}
      />
      &gt;
      <hr />
      { list.title }
      <hr />
    </BreadCrumbsLayout>
  );
}

TaskBreadCrumbs.propTypes = {
  list: PropTypes.element.isRequired,
  project: PropTypes.element.isRequired,
};
