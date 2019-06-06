import * as ACTION_TYPES from '../constants/action-types';

const initialState = []

export function listsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_LIST: {
      return state.concat(action.payload);
    }

    case ACTION_TYPES.UPDATE_LIST: {
      return state;
    }

    case ACTION_TYPES.DELETE_LIST: {
      return state.filter(list => list.id !== action.payload.id);
    }

    case ACTION_TYPES.DELETE_PROJECT: {
      return state.filter(list => list.projectId !== action.payload.id);
    }

    default: {
      return state;
    }
  }
}
