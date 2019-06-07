import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import {
  createProject,
  deleteProject
} from '../../actions/project';

import { showNotificationWithTimeout } from '../../actions/notification';
import TodoListContent from '../TodoListContent';
import TodoListInput from '../TodoListInput';
import '../../styles/styles.css';

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

    const ProjectsPage = projects.map( (project) =>
      <div className="horizontally-aligned" key={project.id}>
        <li>
          <Link to={`/project/${project.id}/lists`}>
            {project.title}
          </Link>
        </li>
        <button onClick={(event) => this.handleDelete(project.id)} >x</button>
      </div>
    );

    const realEstate = (
      <div style={{ width: "13%" }} />
    );

    const todoListInput = (
      <TodoListInput
        onEnter={this.handleProjectCreate}
        placeholder={"Create projects as a todo-list"}
        urlParams={match.params} />
    );

    return (
      <div className="horizontally-aligned">
        { realEstate }
        <TodoListContent
          title="Projects"
          input={todoListInput}
          collection={ProjectsPage} />
        { realEstate }
      </div>
    );
  }
}

const ProjectsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedProjects);
export default withRouter(ProjectsPage);
