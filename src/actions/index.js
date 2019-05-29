import * as ACTION_TYPES from '../constants/action-types';

// Project actions
export function createProject(payload) {
  return { type: ACTION_TYPES.CREATE_PROJECT, payload }
};

export function updateProject(payload) {
  return { type: ACTION_TYPES.UPDATE_PROJECT, payload }
};

export function deleteProject(payload) {
  return { type: ACTION_TYPES.DELETE_PROJECT, payload }
};

// List actions
export function createList(payload) {
  return { type: ACTION_TYPES.CREATE_LIST, payload }
};

export function updateList(payload) {
  return { type: ACTION_TYPES.UPDATE_LIST, payload }
};

export function deleteList(payload) {
  return { type: ACTION_TYPES.DELETE_LIST, payload }
};


// Task actions
export function createTask(payload) {
  return { type: ACTION_TYPES.CREATE_TASK, payload }
};

export function updateTask(payload) {
  return { type: ACTION_TYPES.UPDATE_TASK, payload }
};

export function completeTask(payload) {
  return {
    type: ACTION_TYPES.COMPLETE_TASK,
    payload: {
      id: payload.id,
      isCompleted: true,
    }
  }
};

export function uncompleteTask(payload) {
  return {
    type: ACTION_TYPES.COMPLETE_TASK,
    payload: {
      id: payload.id,
      isCompleted: false,
    }
  }
};

export function deleteTask(payload) {
  return { type: ACTION_TYPES.DELETE_TASK, payload }
};
