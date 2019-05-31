import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { createTask, updateTask, completeTask, uncompleteTask, deleteTask } from '../actions/index';
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
    sendCreate: (payload) => dispatch(createTask(payload)),
    sendUpdate: (payload) => dispatch(updateTask(payload)),
    sendComplete: (payload) => dispatch(completeTask(payload)),
    sendUncomplete: (payload) => dispatch(uncompleteTask(payload)),
    sendDelete: (payload) => dispatch(deleteTask(payload)),
  }
}

class ConnectedTasks extends React.Component {
  handleTaskCreate = (params, title) => {
    if (title === "") {
      return;
    }

    const { sendCreate } = this.props;

    sendCreate({
      id: UUID.v4(),
      title,
      listId: params['listId'],
      projectId: params['projectId'],
      parent: params['parentId'],
    });
  }

  toggleCompletion = (id, isCompleted) => {
    const { sendComplete, sendUncomplete } = this.props;

    if (isCompleted) {
      sendUncomplete({ id })
    } else {
      sendComplete({ id })
    }
  }

  handleChange = (id, title) => {
    const { sendUpdate } = this.props;

    sendUpdate({
      id,
      title,
    });
  }

  handleDelete = (id) => {
    const { sendDelete } = this.props;

    sendDelete({ id });
  }

  handleKeyDown = (id, event) => {
    const task = this.props.tasks.find(task => task.id === id);

    if (event.key === 'Backspace') {
      if (task.title === "") {
        this.handleDelete(id);
      }
    } else if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Outdent if applicable
      } else {
        // Indent if applicable
      }
      event.preventDefault();
    }
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
        <input
          name="toggle-completion"
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => this.toggleCompletion(task.id, task.isCompleted)}
        />
        <input
          name="title"
          type="text"
          onChange={(event) => this.handleChange(task.id, event.target.value)}
          onKeyDown={(event) => this.handleKeyDown(task.id, event)}
          value={task.title}
        />
        <button onClick={() => this.handleDelete(task.id)} >X</button>
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
