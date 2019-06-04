import React from 'react';
import * as CONSTANTS from '../constants/index';

class OrderedTaskElements extends React.Component {
  renderTasks(parentId) {
    const { tasks, onToggleCompletion, onChange, onKeyDown, onDelete } = this.props;
    const siblings = tasks.filter(task => task.parentId === parentId);

    const taskElements = siblings.length > 0 ? siblings.map( (task) =>
      <li id='task' key={task.id}>
        <div className='horizontally-aligned'>
          <input
            name='toggle-completion'
            type='checkbox'
            checked={task.isCompleted}
            onChange={() => onToggleCompletion(task.id, task.isCompleted)}
          />
          <input
            name='title'
            type='text'
            onChange={(event) => onChange(task.id, event.target.value)}
            onKeyDown={(event) => onKeyDown(task.id, event)}
            value={task.title}
          />
          <button onClick={() => onDelete(task.id)} >X</button>
        </div>
        <ul>
        { this.renderTasks(task.id) }
        </ul>
      </li>) : null;

    return taskElements;
  }

  render() {
    return this.renderTasks(CONSTANTS.LIST_ROOT);
  }
}

export default OrderedTaskElements;
