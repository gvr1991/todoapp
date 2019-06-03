import React from 'react';
import * as CONSTANTS from '../constants/index';

class OrderedTaskElements extends React.Component {

  compare(taskA, taskB) {
    if (taskA.position < taskB.position) {
      return -1;
    } else if (taskA.position > taskB.position) {
      return 1;
    } else {
      return 0;
    }
  }

  renderTasks(parentId) {
    const { tasks, onToggleCompletion, onChange, onKeyDown, onDelete } = this.props;
    const siblings = tasks.filter(task => task.parentId === parentId);

    if (siblings.length === 0) {
      return null;
    }

    return siblings.sort(this.compare).map(task => <li key={task.id}>
      <div className='horizontally-aligned'>
        <input
          name='toggle-completion'
          type='checkbox'
          checked={task.isCompleted}
          onChange={(e) => onToggleCompletion(task.id, task.isCompleted)}
        />

        <input
          name='title'
          type='text'
          onChange={(e) => onChange(task.id, e.target.value)}
          onKeyDown={(e) => onKeyDown(task.id, e)}
          value={task.title}
        />

        <button onClick={onDelete(task.id)}>X</button>
      </div>
      {/* { this.renderTasks(task.id) } */}
    </li>);
  }

  renderTasks2(parentId) {
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
        { this.renderTasks2(task.id) }
        </ul>
      </li>) : null;

    return taskElements;
  }

  render() {
    return this.renderTasks2(CONSTANTS.LIST_ROOT);
  }
}

export default OrderedTaskElements;
