import React from 'react';
import PropTypes from 'prop-types';
import LIST_ROOT from '../../constants/index';
import '../../styles/styles.css';

class OrderedTasks extends React.Component {
  renderTasks(parentId) {
    const {
      tasks,
      onToggleCompletion,
      onChange,
      onKeyDown,
      onDelete,
    } = this.props;

    const taskElements = tasks.filter(task => task.parentId === parentId).map(task => (
      <li id="task-entry" key={task.id}>
        <div className="horizontally-aligned">
          <input
            id="toggle-task-completion"
            name="toggle-task-completion"
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggleCompletion(task.id, task.isCompleted)}
          />

          <input
            style={
              task.isCompleted ? {
                textDecoration: 'line-through',
                backgroundColor: '#777777',
                opacity: 0.9,
              } : null
            }
            id="task-title"
            name="task-title"
            type="text"
            onChange={event => onChange(task.id, event.target.value)}
            onKeyDown={event => onKeyDown(task.id, event)}
            value={task.title}
          />

          <button
            type="submit"
            onClick={() => onDelete(task.id)}
          >
            x
          </button>
        </div>
        <ul id="subtasks">
          {this.renderTasks(task.id)}
        </ul>
      </li>
    ));

    return taskElements;
  }

  render() {
    return this.renderTasks(LIST_ROOT);
  }
}

OrderedTasks.propTypes = {
  tasks: PropTypes.element.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OrderedTasks;
