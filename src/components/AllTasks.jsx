import React from 'react';
import { withRouter } from "react-router";
import TodoListContent from './TodoListContent'

class AllTasks extends React.Component {
  render() {
    const { lists, match, refNewTask, onTaskCreate } = this.props;
    const listId = match.params['listId'];
    let tasks = this.props.tasks ? this.props.tasks.filter(task => task.listId === listId) : [];
    let list = lists.find(list => list.id === listId);

    tasks = tasks.length > 0 ? (tasks.map( (task) =>
      <li key={task.id}>
        {task.title}
      </li>
    )) : null;

    return <TodoListContent
      header={list.title}
      reference={refNewTask}
      onKeyPressCallback={onTaskCreate}
      placeholder="Create tasks as a todo-list"
      listItems={tasks}
      urlParams={match.params}
    />;
  }
}

export default withRouter(AllTasks);
