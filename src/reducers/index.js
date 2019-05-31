import * as ACTION_TYPES from "../constants/action-types";

const initialState = {
  projects: [
    {
      id: "1",
      title: "Project 1",
    },
  ],
  lists: [
    {
      id: "2",
      title: "Project 1 List 1",
      projectId: "1",
    },
  ],
  tasks: [
    {
      id: "3",
      title: "Project 1 List 1 Task 1",
      listId: "2",
      projectId: "1",
      parent: 'root',
      position: 1,
      isCompleted: false,
    },
  ],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_PROJECT: {
      return Object.assign({}, state, {
        projects: state.projects.concat(action.payload),
      });
    }

    case ACTION_TYPES.UPDATE_PROJECT: {
      break;
    }

    case ACTION_TYPES.DELETE_PROJECT: {
      const projects = state.projects;

      return Object.assign({}, state, {
        projects: projects.filter(project => project.id !== action.payload.id),
      });
    }

    case ACTION_TYPES.CREATE_LIST: {
      return Object.assign({}, state, {
        lists: state.lists.concat(action.payload),
      });
    }

    case ACTION_TYPES.UPDATE_LIST: {
      break;
    }

    case ACTION_TYPES.DELETE_LIST: {
      break;
    }

    case ACTION_TYPES.CREATE_TASK: {
      return Object.assign({}, state, {
        tasks: state.tasks.concat({
          ...action.payload,
          isCompleted: false,
        }),
      });
    }

    case ACTION_TYPES.UPDATE_TASK: {
      const newState = { ...state };
      const { tasks } = newState;
      const oldTask = tasks.find(task => task.id === action.payload.id);
      const tasksWithoutOldtask = tasks.filter(el => el.id !== oldTask.id);
      const newTask = {
        ...oldTask,
        ...action.payload,
      }

      return {
        ...newState,
        tasks: [...tasksWithoutOldtask, newTask],
      };
    }

    case ACTION_TYPES.COMPLETE_TASK: {
      const taskId = action.payload.id;
      const unchangedTasks = state.tasks.filter(task => task.id !== taskId);
      let changedTask = state.tasks.find(task => task.id === taskId);
      changedTask.isCompleted = true;

      return Object.assign({}, state, {
        tasks: [ ...unchangedTasks,  changedTask],
      });
    }

    case ACTION_TYPES.UNCOMPLETE_TASK: {
      const taskId = action.payload.id;
      const unchangedTasks = state.tasks.filter(task => task.id !== taskId);
      const changedTask = state.tasks.find(task => task.id === taskId);
      changedTask.isCompleted = false;

      return Object.assign({}, state, {
        tasks: [ ...unchangedTasks,  changedTask],
      });
    }

    case ACTION_TYPES.DELETE_TASK: {
      const newState = { ...state };

      return {
        ...newState,
        tasks: newState.tasks.filter(task => task.id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }

  return state;
}

export default rootReducer;
