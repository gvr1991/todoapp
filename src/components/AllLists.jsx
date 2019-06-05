import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import TodoListContent from './TodoListContent';
import { createList, deleteList } from '../actions/list';
import { showNotificationWithTimeout } from '../actions/notification';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCreate: (list) => dispatch(createList(list)),
    sendDelete: (list) => dispatch(deleteList(list)),
    sendNotification: (text) => dispatch(showNotificationWithTimeout(text)),
  }
}

class ConnectedLists extends React.Component {
  handleListCreate = (params, title) => {
    if (title === "") {
      return;
    }

    const { projects, sendCreate, sendNotification } = this.props;
    const project = projects.find(project => project.id === params['projectId']);

    sendCreate({
      id: UUID.v4(),
      title,
      projectId: params['projectId'],
    });

    sendNotification(title + " created successfully in project \"" + project.title + "\"");
  }

  handleDelete = (id) => {
    const { lists, projects, sendDelete, sendNotification } = this.props;
    const list = lists.find(list => list.id === id);
    const project = projects.find(project => project.id === list.projectId);

    sendDelete({ id });

    sendNotification(list.title + " deleted successfully from project \"" + project.title + "\"");
  }

  render() {
    const { match, lists, projects } = this.props;
    const projectId = match.params['projectId'];
    const project = projects.find(project => project.id === projectId);
    let listsInProject = lists ? lists.filter(list => list.projectId === projectId) : [];
    let linksToOtherProjects = projects.filter(project => project.id !== projectId);

    linksToOtherProjects = linksToOtherProjects.length > 0 ? (linksToOtherProjects.map( (project) =>
      <div key={project.id} >
        <Link to={`/project/${project.id}/lists`} >
          {project.title}
        </Link>
        <br />
      </div>
    )) : null;

    const sidebarElement = (<div>
      <h1>{"Other projects"}</h1>
      <br />
      {linksToOtherProjects}
      <br />
    </div>);

    listsInProject = listsInProject.length > 0 ? (listsInProject.map( (list) =>
      <div className="horizontally-aligned" key={list.id}>
        <li>
          <Link to={`/project/${projectId}/list/${list.id}/tasks`} >
            {list.title}
          </Link>
        </li>
        <button onClick={() => this.handleDelete(list.id)} >X</button>
      </div>
    )) : null;

    const headerElement = (
      <div className="horizontally-aligned">
        <Link to={`/projects`} >
          {` All Projects `}
        </Link>
      </div>
    );

    return <TodoListContent
      header={headerElement}
      leftSidebar={sidebarElement}
      contentTitle={project.title}
      onEnter={this.handleListCreate}
      placeholder="Create lists as a todo-list"
      listItems={listsInProject}
      urlParams={match.params}
    />;
  }
}

const AllLists = connect(mapStateToProps, mapDispatchToProps)(ConnectedLists);
export default withRouter(AllLists);
