import React from 'react';
import BreadCrumbsLayout from '../layout/BreadCrumbsLayout';
import AbstractLink from '../layout/AbstractLink';

class TaskBreadCrumbs extends React.Component {
  render() {
    const { list, project } = this.props;

    return (
      <BreadCrumbsLayout>
        <AbstractLink
          linkTo={`/projects`}
          linkText={"Projects"} />
        >
        <AbstractLink
          linkTo={`/project/${project.id}/lists`}
          linkText={project.title} />
        >
        <hr />
        { list.title }
        <hr />
      </BreadCrumbsLayout>
    );
  }
}

export default TaskBreadCrumbs;
