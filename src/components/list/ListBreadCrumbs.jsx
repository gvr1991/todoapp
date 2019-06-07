import React from 'react';
import BreadCrumbsLayout from '../layout/BreadCrumbsLayout';
import AbstractLink from '../layout/AbstractLink';

class ListBreadCrumbs extends React.Component {
  render() {
    const { project } = this.props;

    return (
      <BreadCrumbsLayout>
        <AbstractLink
          linkTo={`/projects`}
          linkText={"Projects"} />
        >
        <hr />
        { project.title }
        <hr />
      </BreadCrumbsLayout>
    );
  }
}

export default ListBreadCrumbs;
