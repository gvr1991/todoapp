import React from 'react';
import BreadCrumbsLayout from '../layout/BreadCrumbsLayout';
import LinkLayout from '../layout/LinkLayout';

class TaskBreadCrumbs extends React.Component {
  render() {
    const { list, project } = this.props;

    return (
      <BreadCrumbsLayout>
        <LinkLayout
          linkTo={`/projects`}
          linkText={"Projects"} />
        >
        <LinkLayout
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
