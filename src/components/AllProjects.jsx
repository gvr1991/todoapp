import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { createProject, deleteProject } from '../actions/index';
import TodoListContent from './TodoListContent';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCreate: (project) => dispatch(createProject(project)),
    sendDelete: (project) => dispatch(deleteProject(project)),
  }
}

class ConnectedProjects extends React.Component {
  handleProjectCreate = (params, title) => {
    if (title === "") {
      return;
    }

    this.props.sendCreate({
      id: UUID.v4(),
      title,
    });
  }

  render() {
    const { match, projects } = this.props;

    const allProjects = projects ? (projects.map( (project) =>
      <li key={project.id}>
        <Link to={`/project/${project.id}/lists`}>
          {project.title}
        </Link>
      </li>
    )) : null;

    return <TodoListContent
      header="All Projects"
      onEnter={this.handleProjectCreate}
      placeholder="Create projects as a todo-list"
      listItems={allProjects}
      urlParams={match.params}
    />;
  }
}

const AllProjects = connect(mapStateToProps, mapDispatchToProps)(ConnectedProjects);
export default withRouter(AllProjects);
