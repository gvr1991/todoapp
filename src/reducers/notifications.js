import * as ACTION_TYPES from '../constants/action-types';

const initialState = []

export function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.SHOW_NOTIFICATION: {
      return state.concat(action.payload);
    }

    case ACTION_TYPES.HIDE_NOTIFICATION: {
      return state.filter( (n) => n.id !== action.payload.id );
    }

    default: {
      return state;
    }
  }
}
