import React from 'react';
import { withRouter } from "react-router";
import TodoListContent from './TodoListContent';

class AllTasks extends React.Component {
  render() {
    const { match, tasks, lists, onTaskCreate } = this.props;
    const listId = match.params['listId'];
    let tasksInList = tasks ? tasks.filter(task => task.listId === listId) : [];
    let list = lists.find(list => list.id === listId);

    tasksInList = tasksInList.length > 0 ? (tasksInList.map( (task) =>
    <div key={task.id}>
      <div
        id="toggle-completion"
        name="toggle-completion"
      />

      <input
        id="enter-task-title"
        name="title"
        type="text"
        value={task.title}
      />

      <div
        id="toggle-editable"
        name="toggle-editable"
      />

      <div
        id="delete-item"
        name="delete-item"
      />
    </div>
    )) : null;

    return <TodoListContent
      header={list.title}
      onEnter={onTaskCreate}
      placeholder="Create tasks as a todo-list"
      listItems={tasksInList}
      urlParams={match.params}
    />;
  }
}

export default withRouter(AllTasks);
