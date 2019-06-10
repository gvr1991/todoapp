import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumbsLayout from '../layout/BreadCrumbsLayout';
import LinkLayout from '../layout/LinkLayout';

export default function ListBreadCrumbs(props) {
  const { project } = props;

  return (
    <BreadCrumbsLayout>
      <LinkLayout
        linkTo="/projects"
        linkText="Projects"
      />
      &gt;
      <hr />
      { project.title }
      <hr />
    </BreadCrumbsLayout>
  );
}

ListBreadCrumbs.propTypes = {
  project: PropTypes.instanceOf.isRequired,
};
