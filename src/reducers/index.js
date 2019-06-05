import * as ACTION_TYPES from '../constants/action-types';
import * as CONSTANTS from '../constants/index';

import { default as UUID } from 'uuid';

const initialState = generateData(1, 1, 10);

function generateData(projectsCount, listsCount, tasksCount) {
  const projects = [];
  const lists = [];
  const tasks = [];
  const notifications = [];

  for (let i = 1; i <= projectsCount; i++) {
    const project = {
      id: UUID.v4(),
      title: 'Project ' + i,
    };
    projects.push(project);

    for (let j = 1; j <= listsCount; j++) {
      const list = {
        id: UUID.v4(),
        title: 'Project ' + i + ' - List ' + j,
        projectId: project.id,
      }
      lists.push(list);

      for (let k = 1; k <= tasksCount; k++) {
        tasks.push({
          id: UUID.v4(),
          title: 'Project ' + i + ' - List ' + j + ' - Task ' + k,
          listId: list.id,
          projectId: project.id,
          isCompleted: false,
          parentId: CONSTANTS.LIST_ROOT,
          position: k,
        });
      }
    }
  }

  return {
    projects: projects,
    lists: lists,
    tasks: tasks,
    notifications: notifications,
  }
}

function updateTask(state, payload) {
  const { tasks } = state;
  const task = tasks.find(task => task.id === payload.id);

  const newTask = {
    ...task,
    ...payload,
  };

  tasks[tasks.indexOf(task)] = newTask;

  return Object.assign({}, state, {
    tasks: [ ...tasks ],
  });
}

function getDescendantIds(id, result = [], tasks) {
  const children = tasks.filter(task => task.parentId === id);
  result.push(id);

  if (children.length === 0) {
    return result;
  }

  for (const child of children) {
    getDescendantIds(child.id, result, tasks);
  }

  return result;
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_PROJECT: {
      return Object.assign({}, state, {
        projects: state.projects.concat(action.payload),
      });
    }

    case ACTION_TYPES.UPDATE_PROJECT: {
      break;
    }

    case ACTION_TYPES.DELETE_PROJECT: {
      const projectId = action.payload.id;

      return {
        ...state,
        projects: state.projects.filter(project => project.id !== projectId),
        lists: state.lists.filter(list => list.projectId !== projectId),
        tasks: state.tasks.filter(task => task.projectId !== projectId),
      };

    }

    case ACTION_TYPES.CREATE_LIST: {
      return Object.assign({}, state, {
        lists: state.lists.concat(action.payload),
      });
    }

    case ACTION_TYPES.UPDATE_LIST: {
      break;
    }

    case ACTION_TYPES.DELETE_LIST: {
      const listId = action.payload.id;

      return {
        ...state,
        lists: state.lists.filter(list => list.id !== listId),
        tasks: state.tasks.filter(task => task.listId !== listId),
      };
    }

    case ACTION_TYPES.CREATE_TASK: {
      return Object.assign({}, state, {
        tasks: state.tasks.concat({
          ...action.payload,
          isCompleted: false,
        }),
      });
    }

    case ACTION_TYPES.UPDATE_TASK: {
      return updateTask(state, action.payload);
    }

    case ACTION_TYPES.COMPLETE_TASK: {
      const newTasks = state.tasks;
      const descendantIds = getDescendantIds(action.payload.id, [], state.tasks);

      for (const id of descendantIds) {
        newTasks.find(task => task.id === id).isCompleted = true;
      }

      return Object.assign({}, state, {
        tasks: [ ...newTasks ],
      });
    }

    case ACTION_TYPES.UNCOMPLETE_TASK: {
      return updateTask(state, {
        ...action.payload,
        isCompleted: false
      });
    }

    case ACTION_TYPES.DELETE_TASK: {
      const descendantIds = getDescendantIds(action.payload.id, [], state.tasks);

      return {
        ...state,
        tasks: state.tasks.filter(task => descendantIds.indexOf(task.id) === -1),
      };
    }

    case ACTION_TYPES.SHOW_NOTIFICATION: {
      return {
        ...state,
        notifications: [ ...state.notifications, { ...action.payload }],
      };
    }

    case ACTION_TYPES.HIDE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }
}

export default rootReducer;
