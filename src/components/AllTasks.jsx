import React from 'react';
import { default as UUID } from 'uuid';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { createTask, deleteTask } from '../actions/index';
import TodoListContent from './TodoListContent';

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCreate: (task) => dispatch(createTask(task)),
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
    const { match, lists, tasks } = this.props;
    const listId = match.params['listId'];
    let tasksInList = tasks ? tasks.filter(task => task.listId === listId) : [];
    let list = lists.find(list => list.id === listId);

    tasksInList = tasksInList.length > 0 ? (tasksInList.map( (task) =>
    <div key={task.id}>
      <input
        id="enter-task-title"
        name="title"
        type="text"
        value={task.title}
      />
    </div>
    )) : null;

    return <TodoListContent
      header={list.title}
      onEnter={this.handleTaskCreate}
      placeholder="Create tasks as a todo-list"
      listItems={tasksInList}
      urlParams={match.params}
    />;
  }
}

const AllTasks = connect(mapStateToProps, mapDispatchToProps)(ConnectedTasks);
export default withRouter(AllTasks);
