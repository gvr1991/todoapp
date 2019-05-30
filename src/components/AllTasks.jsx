import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { createTask, updateTask, deleteTask } from '../actions/index';
import TodoListContent from './TodoListContent';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    lists: state.lists,
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCreate: (task) => dispatch(createTask(task)),
    sendUpdate: (task) => dispatch(updateTask(task)),
    sendDelete: (task) => dispatch(deleteTask(task)),
  }
}

class ConnectedTasks extends React.Component {
  handleTaskCreate = (params, title) => {
    if (title === "") {
      return;
    }

    this.props.sendCreate({
      id: UUID.v4(),
      title,
      listId: params['listId'],
      projectId: params['projectId'],
    });
  }

  render() {
    const { match, projects, lists, tasks } = this.props;
    const listId = match.params['listId'];
    const projectId = match.params['projectId'];
    let tasksInList = tasks ? tasks.filter(task => task.listId === listId) : [];
    const list = lists.find(list => list.id === listId);
    const project = projects.find(project => project.id === projectId);
    let linksToOtherLists = lists.filter( list => list.projectId === projectId && list.id !== listId );

    linksToOtherLists = linksToOtherLists.length > 0 ? (linksToOtherLists.map( (list) =>
      <div key={list.id}>
        <Link to={`/project/${projectId}/list/${list.id}/tasks`} >
          {list.title}
        </Link>
        <br />
      </div>
    )) : null;

    tasksInList = tasksInList.length > 0 ? (tasksInList.map( (task) =>
      <div className="horizontally-aligned" key={task.id}>
        <section>C</section>
        <input
          id="enter-task-title"
          name="title"
          type="text"
          onChange={(event) => this.onTitleChange(task.id, event)}
          onKeyPress={(event) => this.handleTaskEdit(task.id, event)}
          value={task.title}
        />
        <section>E</section>
        <section>X</section>
      </div>
    )) : null;

    const headerElement = (
      <div className="horizontally-aligned">
        <Link to={`/projects`} >
          {` All Projects `}
        </Link>
        <hr />
        <Link to={`/project/${list.projectId}/lists`}>
          {project.title}
        </Link>
      </div>
    );

    return <TodoListContent
      header={headerElement}
      leftSidebar={linksToOtherLists}
      contentTitle={list.title}
      onEnter={this.handleTaskCreate}
      placeholder="Create tasks as a todo-list"
      listItems={tasksInList}
      urlParams={match.params}
    />;
  }
}

const AllTasks = connect(mapStateToProps, mapDispatchToProps)(ConnectedTasks);
export default withRouter(AllTasks);
