import React from 'react';
import { default as UUID } from 'uuid';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createTask, updateTask, completeTask, uncompleteTask, deleteTask } from '../actions/index';
import TodoListContent from './TodoListContent';
import OrderedTaskElements from './OrderedTaskElements';
import * as CONSTANTS from '../constants/index';

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
  // Util methods begin here

  compare(taskA, taskB) {
    if (taskA.position < taskB.position) {
      return -1;
    }
    if (taskA.position > taskB.position) {
      return 1;
    }
    return 0;
  }

  orderTasks(parentId, resultList, tasks) {
    const theseTasks = tasks.filter(task => task.parentId === parentId);

    if (theseTasks.length === 0) {
      return resultList;
    }

    theseTasks.sort(this.compare);

    for (const task of theseTasks) {
      resultList.push(task);
      this.orderTasks(task.id, resultList, tasks);
    }

    return resultList;
  }

  getPreviousSiblingId(thisTask, orderedTasks) {
    const siblings = orderedTasks.filter(task => task.parentId === thisTask.parentId);
    const index = siblings.indexOf(thisTask);

    if (index === 0 || index === -1) {
      return null;
    }

    const previousSibling = siblings[index - 1];

    return previousSibling.id;
  }

  getGrandParentId(thisTask, orderedTasks) {
    const parent = orderedTasks.find(task => task.id === thisTask.parentId);

    if (!parent) {
      return CONSTANTS.LIST_ROOT;
    }

    if (parent.parentId === CONSTANTS.LIST_ROOT) {
      return CONSTANTS.LIST_ROOT;
    }
    return orderedTasks.find(task => task.id === parent.parentId).id;
  }

  getNewPosition(parentId, tasks) {
    return tasks.filter(task => task.parentId === parentId).length + 1;
  }

  // Util methods end here

  doIndent(thisTask, orderedTasks, event) {
    const index = orderedTasks.indexOf(thisTask);

    if (index === 0 || index === -1) {
      return;
    }

    const previousSiblingId = this.getPreviousSiblingId(thisTask, orderedTasks);

    if (!previousSiblingId) {
      return;
    }

    if (thisTask.parentId !== previousSiblingId) {
      const { sendUpdate } = this.props;

      sendUpdate({
        id: thisTask.id,
        parentId: previousSiblingId,
        position: this.getNewPosition(previousSiblingId, orderedTasks),
      });

      event.preventDefault();
    }
  }

  doOutdent(thisTask, orderedTasks, event) {
    if (thisTask.parentId === CONSTANTS.LIST_ROOT) {
      return;
    }

    const grandParentId = this.getGrandParentId(thisTask, orderedTasks);
    const { sendUpdate } = this.props;

    sendUpdate({
      id: thisTask.id,
      parentId: grandParentId,
      position: this.getNewPosition(grandParentId, orderedTasks),
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
    const position = this.getNewPosition(parentId, listTasks);

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

  handleIndent = (id, event) => {
    let { tasks } = this.props;
    const thisTask = tasks.find(task => task.id === id);

    if (!thisTask) {
      return;
    }

    tasks = tasks.filter(task => task.listId === thisTask.listId);
    tasks = this.orderTasks(CONSTANTS.LIST_ROOT, [], tasks)

    this.doIndent(thisTask, tasks, event);
  }

  handleOutdent = (id, event) => {
    let { tasks } = this.props;
    const thisTask = tasks.find(task => task.id === id);

    if (!thisTask) {
      return;
    }

    tasks = tasks.filter(task => task.listId === thisTask.listId);
    tasks = this.orderTasks(CONSTANTS.LIST_ROOT, [], tasks)

    this.doOutdent(thisTask, tasks, event);
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
        this.handleOutdent(id, event);
      } else {
        this.handleIndent(id, event);
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

    const sidebarElement = (<div>
      <h1>{'Other lists in '}{project.title}</h1>
      <br />
      {linksToOtherLists}
      <br />
    </div>);

    const taskElements = <OrderedTaskElements
      tasks={tasksInList}
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

const AllTasks = connect(mapStateToProps, mapDispatchToProps)(ConnectedTasks);
export default withRouter(AllTasks);
