import React from 'react';
import BreadCrumbsLayout from '../layout/BreadCrumbsLayout';
import LinkLayout from '../layout/LinkLayout';

class ListBreadCrumbs extends React.Component {
  render() {
    const { project } = this.props;

    return (
      <BreadCrumbsLayout>
        <LinkLayout
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
