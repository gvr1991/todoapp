import * as ACTION_TYPES from '../constants/action-types';

export function createList(payload) {
  return {
    type: ACTION_TYPES.CREATE_LIST,
    payload,
  }
};

export function updateList(payload) {
  return {
    type: ACTION_TYPES.UPDATE_LIST,
    payload,
  }
};

export function deleteList(payload) {
  return {
    type: ACTION_TYPES.DELETE_LIST,
    payload,
  }
};
