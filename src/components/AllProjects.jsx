import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { createProject, deleteProject } from '../actions/project';
import { showNotificationWithTimeout } from '../actions/notification';
import TodoListContent from './TodoListContent';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCreate: (payload) => dispatch(createProject(payload)),
    sendDelete: (payload) => dispatch(deleteProject(payload)),
    sendNotification: (text) => dispatch(showNotificationWithTimeout(text)),
  }
}

class ConnectedProjects extends React.Component {
  handleProjectCreate = (params, title) => {
    if (title === "") {
      return;
    }

    const { sendCreate, sendNotification } = this.props;

    sendCreate({
      id: UUID.v4(),
      title,
    });

    sendNotification("Project \"" + title + "\" created successfully.");
  }

  handleDelete = (id) => {
    const { projects, sendDelete, sendNotification } = this.props;
    const project = projects.find(project => project.id === id);

    sendDelete({ id });
    sendNotification("Project \"" + project.title + "\" deleted successfully.");
  }

  render() {
    const { match, projects } = this.props;

    const allProjects = projects ? (projects.map( (project) =>
      <div className="horizontally-aligned" key={project.id}>
        <li>
          <Link to={`/project/${project.id}/lists`}>
            {project.title}
          </Link>
        </li>
        <button onClick={() => this.handleDelete(project.id)} >X</button>
      </div>
    )) : null;

    return <TodoListContent
      contentTitle="All Projects"
      onEnter={this.handleProjectCreate}
      onDelete={this.handleProjectDelete}
      placeholder="Create projects as a todo-list"
      listItems={allProjects}
      urlParams={match.params}
    />;
  }
}

const AllProjects = connect(mapStateToProps, mapDispatchToProps)(ConnectedProjects);
export default withRouter(AllProjects);
