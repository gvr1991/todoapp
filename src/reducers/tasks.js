import * as ACTION_TYPES from '../constants/action-types';

const initialState = []

function updateTask(state, payload) {
  const tasks = state;
  const task = tasks.find(task => task.id === payload.id);

  const updatedTask = {
    ...task,
    ...payload,
  };

  tasks[tasks.indexOf(task)] = updatedTask;

  return [ ...tasks ];
}

function getSelfAndDescendantIds(id, tasks, resultList = []) {
  resultList.push(id);
  const children = tasks.filter(task => task.parentId === id);

  if (children.length === 0) {
    return resultList;
  }

  for (const child of children) {
    getSelfAndDescendantIds(child.id, resultList, tasks);
  }

  return resultList;
}

// Reducer function
export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_TASK: {
      return state.concat({ ...action.payload, isCompleted: false });
    }

    case ACTION_TYPES.UPDATE_TASK: {
      return updateTask(state, action.payload);
    }

    case ACTION_TYPES.COMPLETE_TASK: {
      const newTasks = state;
      const descendantIds = getSelfAndDescendantIds(action.payload.id, newTasks);

      for (const id of descendantIds) {
        newTasks.find(task => task.id === id).isCompleted = true;
      }

      return [ ...newTasks ];
    }

    case ACTION_TYPES.UNCOMPLETE_TASK: {
      return updateTask(state, {
        ...action.payload,
        isCompleted: false,
      });
    }

    case ACTION_TYPES.DELETE_TASK: {
      const descendantIds = getSelfAndDescendantIds(action.payload.id, state);

      return state.filter(task => descendantIds.indexOf(task.id) === -1);
    }

    case ACTION_TYPES.DELETE_LIST: {
      return state.filter(task => task.listId !== action.payload.id);
    }

    case ACTION_TYPES.DELETE_PROJECT: {
      return state.filter(task => task.projectId !== action.payload.id);
    }

    default: {
      return state;
    }
  }
}
