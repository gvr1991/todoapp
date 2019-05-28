import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import TodoListContent from './TodoListContent'

class AllProjects extends React.Component {
  render() {
    const { match, refNewProject, onProjectCreate } = this.props;
    const projects = this.props.projects ? (this.props.projects.map( (project) =>
      <li key={project.id}>
        <Link to={`/project/${project.id}/lists`}>
          {project.title}
        </Link>
      </li>
    )) : null;

    return <TodoListContent
      header="All Projects"
      reference={refNewProject}
      onKeyPressCallback={onProjectCreate}
      placeholder="Create projects as a todo-list"
      listItems={projects}
      urlParams={match.params}
    />;
  }
}

export default withRouter(AllProjects);
