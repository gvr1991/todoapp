import * as ACTION_TYPES from "../constants/action-types";

const initialState = {
  projects: [],
  lists: [],
  tasks: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_PROJECT:
      return Object.assign({}, state, {
        projects: state.projects.concat(action.payload),
      });

    case ACTION_TYPES.UPDATE_PROJECT:
      break;

    case ACTION_TYPES.DELETE_PROJECT:
      const projects = state.projects;

      return Object.assign({}, state, {
        projects: projects.filter(project => project.id !== action.payload.id),
      });

    case ACTION_TYPES.CREATE_LIST:
      return Object.assign({}, state, {
        lists: state.lists.concat(action.payload),
      });

    case ACTION_TYPES.UPDATE_LIST:
      break;

    case ACTION_TYPES.DELETE_LIST:
      break;

    case ACTION_TYPES.CREATE_TASK:
      return Object.assign({}, state, {
        tasks: state.tasks.concat(action.payload),
      });
  
    case ACTION_TYPES.UPDATE_TASK:
      break;

    case ACTION_TYPES.COMPLETE_TASK:
      break;

    case ACTION_TYPES.DELETE_TASK:
      break;

    default:
      return state;
  }

  return state;
}

export default rootReducer;
