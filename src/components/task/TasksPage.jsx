import React from 'react';
import UUID from 'uuid';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LIST_ROOT from '../../constants/index';
import MainPageLayout from '../layout/MainPageLayout';
import TaskSidebar from './TaskSidebar';
import TaskBreadCrumbs from './TaskBreadCrumbs';
import TodoListInput from '../TodoListInput';
import TodoListContent from '../TodoListContent';
import OrderedTasks from './OrderedTasks';

import {
  createTask,
  updateTask,
  completeTask,
  uncompleteTask,
  deleteTask,
} from '../../actions/task';

import {
  orderTasks,
  getPreviousSibling,
  getNextSibling,
  getGrandParentId,
  getNewPositionForTask,
} from '../../utils/taskPageUtils';

import '../../styles/styles.css';

const mapStateToProps = state => ({
  projects: state.projects,
  lists: state.lists,
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  sendCreate: payload => dispatch(createTask(payload)),
  sendUpdate: payload => dispatch(updateTask(payload)),
  sendComplete: payload => dispatch(completeTask(payload)),
  sendUncomplete: payload => dispatch(uncompleteTask(payload)),
  sendDelete: payload => dispatch(deleteTask(payload)),
});

class ConnectedTasks extends React.Component {
  static propTypes = {
    lists: PropTypes.node.isRequired,
    tasks: PropTypes.node.isRequired,
    projects: PropTypes.node.isRequired,
    match: PropTypes.symbol.isRequired,

    sendCreate: PropTypes.func.isRequired,
    sendUpdate: PropTypes.func.isRequired,
    sendComplete: PropTypes.func.isRequired,
    sendUncomplete: PropTypes.func.isRequired,
    sendDelete: PropTypes.func.isRequired,
  };

  handleTaskCreate = (params, title) => {
    if (title === '') {
      return;
    }

    const {
      sendCreate,
      tasks,
    } = this.props;

    const listTasks = tasks.filter(task => task.listId === params.listId);

    sendCreate({
      id: UUID.v4(),
      title,
      listId: params.listId,
      projectId: params.projectId,
      parentId: LIST_ROOT,
      position: getNewPositionForTask(LIST_ROOT, listTasks),
    });
  }

  handleToggleCompletion = (id, isCompleted) => {
    const {
      sendComplete,
      sendUncomplete,
    } = this.props;

    if (isCompleted) {
      sendUncomplete({
        id,
      });
    } else {
      sendComplete({
        id,
      });
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

    sendDelete({
      id,
    });
  }

  handleIndentAndOutdent = (id, event, indent = true) => {
    let { tasks } = this.props;
    const thisTask = tasks.find(task => task.id === id);
    tasks = tasks.filter(task => task.listId === thisTask.listId);
    tasks = orderTasks(LIST_ROOT, tasks);

    if (indent) {
      this.doIndent(thisTask, tasks, event);
    } else {
      this.doOutdent(thisTask, tasks, event);
    }
  }

  handleTaskShift = (event, id, up) => {
    let { tasks } = this.props;
    const thisTask = tasks.find(task => task.id === id);

    if (thisTask == null) {
      return;
    }

    tasks = tasks.filter(task => task.listId === thisTask.listId);
    tasks = orderTasks(LIST_ROOT, tasks);
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

  handleMoveUp = (event, id) => {
    this.handleTaskShift(event, id, true);
  }

  handleMoveDown = (event, id) => {
    this.handleTaskShift(event, id, false);
  }

  handleKeyDown = (id, event) => {
    const { tasks } = this.props;
    const task = tasks.find(t => t.id === id);

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
    } else if (event.altKey) {
      if (event.key === 'ArrowUp') {
        this.handleMoveUp(event, id);
      } else if (event.key === 'ArrowDown') {
        this.handleMoveDown(event, id);
      }
    }
  }

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
        isCompleted: previousSibling.isCompleted,
        position: getNewPositionForTask(previousSibling.id, orderedTasks),
      });

      event.preventDefault();
    }
  }

  doOutdent(thisTask, orderedTasks, event) {
    if (thisTask.parentId === LIST_ROOT) {
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
      position: getNewPositionForTask(grandParentId, orderedTasks),
    });

    event.preventDefault();
  }

  render() {
    const {
      match,
      projects,
      lists,
      tasks,
    } = this.props;

    const { listId } = match.params;
    const { projectId } = match.params;
    const tasksInList = tasks.filter(task => task.listId === listId);
    const list = lists.find(l => l.id === listId);
    const project = projects.find(p => p.id === projectId);

    const breadCrumbs = (
      <TaskBreadCrumbs project={project} list={list} />
    );

    const todoListInput = (
      <TodoListInput
        onEnter={this.handleTaskCreate}
        placeholder="Create tasks as a todo-list"
        urlParams={match.params}
      />
    );

    const collection = (
      <OrderedTasks
        tasks={orderTasks(LIST_ROOT, tasksInList)}
        onToggleCompletion={this.handleToggleCompletion}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onDelete={this.handleDelete}
      />
    );

    return (
      <MainPageLayout>
        <TaskSidebar title={project.title} urlParams={match.params} />

        <TodoListContent
          breadCrumbs={breadCrumbs}
          title={list.title}
          input={todoListInput}
          collection={collection}
        />
      </MainPageLayout>
    );
  }
}

const TasksPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedTasks);
export default withRouter(TasksPage);
