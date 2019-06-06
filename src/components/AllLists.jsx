import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import TodoListContent from './TodoListContent';
import { createList, deleteList } from '../actions/list';
import { showNotificationWithTimeout } from '../actions/notification';
import { connect } from 'react-redux';
import '../styles/styles.css';
import Sidebar from './Sidebar';

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCreate: (payload) => dispatch(createList(payload)),
    sendDelete: (payload) => dispatch(deleteList(payload)),
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

    listsInProject = listsInProject.length > 0 ? (listsInProject.map( (list) =>
      <div className="horizontally-aligned" key={list.id}>
        <li>
          <Link to={`/project/${projectId}/list/${list.id}/tasks`} >
            {list.title}
          </Link>
        </li>
        <button onClick={(event) => this.handleDelete(list.id)} >x</button>
      </div>
    )) : null;

    linksToOtherProjects = linksToOtherProjects.map( (project) =>
      <div key={project.id} >
        <br />
        <Link to={`/project/${project.id}/lists`} >
          {project.title}
        </Link>
        <br />
        <br />
      </div>
    );

    const breadCrumbs = (
      <div id="bread-crumbs" className="horizontally-aligned">
        <Link to={`/projects`} >
          {` All Projects `}
        </Link>
        <hr />
        >
        <hr />
        {project.title}
        <hr />
      </div>
    );

    return <div>
      <div className="horizontally-aligned">
        <Sidebar
          title="Other projects"
          links={linksToOtherProjects}
        />
        <TodoListContent
          breadCrumbs={breadCrumbs}
          contentTitle={project.title}
          onEnter={this.handleListCreate}
          placeholder='Create lists as a todo-list'
          listItems={listsInProject}
          urlParams={match.params}
        />
      </div>
    </div>;
  }
}

const AllLists = connect(mapStateToProps, mapDispatchToProps)(ConnectedLists);
export default withRouter(AllLists);
