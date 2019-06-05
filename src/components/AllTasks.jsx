import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createTask, updateTask, completeTask, uncompleteTask, deleteTask } from '../actions/task';
import TodoListContent from './TodoListContent';
import * as CONSTANTS from '../constants/index';
import { orderTasks, getPreviousSibling, getNextSibling, getGrandParentId, getNewPosition } from '../utils/taskPageUtils';

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
  };
}

class ConnectedTasks extends React.Component {
  doIndent(thisTask, orderedTasks, event) {
    const index = orderedTasks.indexOf(thisTask);

    if (index === 0 || index === -1) {
      return;
    }

    const previousSibling = getPreviousSibling(thisTask, orderedTasks);
    if (previousSibling == null) {
      return;
    }

    if (thisTask.parentId !== previousSibling.id) {
      const { sendUpdate } = this.props;

      sendUpdate({
        id: thisTask.id,
        parentId: previousSibling.id,
        position: getNewPosition(previousSibling.id, orderedTasks),
      });

      event.preventDefault();
    }
  }

  doOutdent(thisTask, orderedTasks, event) {
    if (thisTask.parentId === CONSTANTS.LIST_ROOT) {
      return;
    }

    const grandParentId = getGrandParentId(thisTask, orderedTasks);
    if (!grandParentId) {
      return;
    }

    const { sendUpdate } = this.props;

    sendUpdate({
      id: thisTask.id,
      parentId: grandParentId,
      position: getNewPosition(grandParentId, orderedTasks),
    });

    event.preventDefault();
  }

  handleTaskCreate = (params, title) => {
    if (title === '') {
      return;
    }

    const { sendCreate, tasks } = this.props;
    const parentId = CONSTANTS.LIST_ROOT;
    const listTasks = tasks.filter( task => task.listId === params['listId']);
    const position = getNewPosition(parentId, listTasks);

    sendCreate({
      id: UUID.v4(),
      title,
      listId: params['listId'],
      projectId: params['projectId'],
      parentId: parentId,
      position: position,
    });
  }

  handleToggleCompletion = (id, isCompleted) => {
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

  handleIndentAndOutdent = (id, event, indent=true) => {
    let { tasks } = this.props;
    const thisTask = tasks.find(task => task.id === id);
    tasks = tasks.filter(task => task.listId === thisTask.listId);
    tasks = orderTasks(CONSTANTS.LIST_ROOT, [], tasks)

    if (indent) {
      this.doIndent(thisTask, tasks, event);
    } else {
      this.doOutdent(thisTask, tasks, event);
    }
  }

  handleTaskShift = (id, up) => {
    let { tasks } = this.props;
    const thisTask = tasks.find(task => task.id === id);

    if (thisTask == null) {
      return;
    }

    tasks = tasks.filter(task => task.listId === thisTask.listId);
    tasks = orderTasks(CONSTANTS.LIST_ROOT, [], tasks);
    let sibling = null;

    if (up) {
      sibling = getPreviousSibling(thisTask, tasks);
    } else {
      sibling = getNextSibling(thisTask, tasks);
    }

    if (sibling == null) {
      return;
    }

    const { sendUpdate } = this.props;

    sendUpdate({
      id: thisTask.id,
      position: sibling.position,
    });

    sendUpdate({
      id: sibling.id,
      position: thisTask.position,
    });
  }

  handleMoveUp = (id) => {
    this.handleTaskShift(id, true);
  }

  handleMoveDown = (id) => {
    this.handleTaskShift(id, false);
  }

  handleKeyDown = (id, event) => {
    const { tasks } = this.props;
    const task = tasks.find(task => task.id === id);

    if (event.key === 'Backspace') {
      if (task.title === '') {
        this.handleDelete(id);
      }
    } else if (event.key === 'Tab') {
      if (event.shiftKey) {
        this.handleIndentAndOutdent(id, event, false);
      } else {
        this.handleIndentAndOutdent(id, event, true);
      }
      event.preventDefault();
    } else if (event.altKey || event.shiftKey) {
      if (event.key === 'ArrowUp') {
        this.handleMoveUp(id);
      } else if (event.key === 'ArrowDown') {
        this.handleMoveDown(id);
      }
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

    const sidebarElement = (<div>
      <h1>{'Other lists in '}{project.title}</h1>
      <br />
      {linksToOtherLists}
      <br />
    </div>);

    const taskElements = <OrderedTaskElements
      tasks={orderTasks(CONSTANTS.LIST_ROOT, [], tasksInList)}
      onToggleCompletion={this.handleToggleCompletion}
      onChange={this.handleChange}
      onKeyDown={this.handleKeyDown}
      onDelete={this.handleDelete}
    />;

    const headerElement = (
      <div className='horizontally-aligned'>
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
      leftSidebar={sidebarElement}
      contentTitle={list.title}
      onEnter={this.handleTaskCreate}
      placeholder='Create tasks as a todo-list'
      listItems={taskElements}
      urlParams={match.params}
    />;
  }
}

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

const AllTasks = connect(mapStateToProps, mapDispatchToProps)(ConnectedTasks);
export default withRouter(AllTasks);
