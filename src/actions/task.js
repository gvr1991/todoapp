import * as ACTION_TYPES from '../constants/action-types';

export function createTask(payload) {
  return {
    type: ACTION_TYPES.CREATE_TASK,
    payload,
  }
};

export function updateTask(payload) {
  return {
    type: ACTION_TYPES.UPDATE_TASK,
    payload,
  }
};

export function completeTask(payload) {
  return {
    type: ACTION_TYPES.COMPLETE_TASK,
    payload,
  }
};

export function uncompleteTask(payload) {
  return {
    type: ACTION_TYPES.UNCOMPLETE_TASK,
    payload,
  }
};

export function deleteTask(payload) {
  return {
    type: ACTION_TYPES.DELETE_TASK,
    payload,
  }
};
