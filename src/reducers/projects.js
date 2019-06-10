import * as ACTION_TYPES from '../constants/action-types';

const initialState = [
  {
    id: '1',
    title: 'Project 1',
  },
  {
    id: '2',
    title: 'Project 2',
  },
  {
    id: '3',
    title: 'Project 3',
  },
];

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_PROJECT: {
      return state.concat(action.payload);
    }

    case ACTION_TYPES.UPDATE_PROJECT: {
      return state;
    }

    case ACTION_TYPES.DELETE_PROJECT: {
      return state.filter(project => project.id !== action.payload.id);
    }

    default: {
      return state;
    }
  }
}
