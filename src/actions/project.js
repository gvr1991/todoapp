import * as ACTION_TYPES from '../constants/action-types';

export function createProject(payload) {
  return {
    type: ACTION_TYPES.CREATE_PROJECT,
    payload,
  }
};

export function updateProject(payload) {
  return {
    type: ACTION_TYPES.UPDATE_PROJECT,
    payload,
  }
};

export function deleteProject(payload) {
  return {
    type: ACTION_TYPES.DELETE_PROJECT,
    payload,
  }
};
