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
      <li key={task.id}>
        {task.title}
      </li>
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
