import * as ACTION_TYPES from '../constants/action-types';

const initialState = []

export function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_PROJECT: {
      return state.concat(action.payload);
    }

    case ACTION_TYPES.UPDATE_PROJECT: {
      return state;
    }

    case ACTION_TYPES.DELETE_PROJECT: {
      return  state.filter(project => project.id !== action.payload.id);
    }

    default: {
      return state;
    }
  }
}
