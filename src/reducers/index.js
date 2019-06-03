import * as ACTION_TYPES from "../constants/action-types";
import { default as UUID } from 'uuid';

const initialState = generateData(5, 5, 5);

function generateData(projectsCount, listsCount, tasksCount) {
  const projects = [];
  const lists = [];
  const tasks = [];

  for (let i = 1; i <= projectsCount; i++) {
    const project = {
      id: UUID.v4(),
      title: "Project " + i,
    };
    projects.push(project);

    for (let j = 1; j <= listsCount; j++) {
      const list = {
        id: UUID.v4(),
        title: "Project " + i + " - List " + j,
        projectId: project.id,
      }
      lists.push(list);

      for (let k = 1; k <= tasksCount; k++) {
        tasks.push({
          id: UUID.v4(),
          title: "Project " + i + " - List " + j + " - Task " + k,
          listId: list.id,
          projectId: project.id,
          isCompleted: false,
          parentId: "root",
        });
      }
    }
  }

  return {
    projects: projects,
    lists: lists,
    tasks: tasks,
  }
}

function updateTask(state, payload) {
  const { tasks } = state;
  const task = tasks.find(task => task.id === payload.id);

  const newTask = {
    ...task,
    ...payload,
  };

  tasks[tasks.indexOf(task)] = newTask;

  return Object.assign({}, state, {
    tasks: [ ...tasks ],
  });
}

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
      const projectId = action.payload.id;

      return {
        ...state,
        projects: state.projects.filter(project => project.id !== projectId),
        lists: state.lists.filter(list => list.projectId !== projectId),
        tasks: state.tasks.filter(task => task.projectId !== projectId),
      };

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
      const listId = action.payload.id;

      return {
        ...state,
        lists: state.lists.filter(list => list.id !== listId),
        tasks: state.tasks.filter(task => task.listId !== listId),
      };
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
      return updateTask(state, action.payload);
    }

    case ACTION_TYPES.COMPLETE_TASK: {
      return updateTask(state, {
        ...action.payload,
        isCompleted: true,
      });
    }

    case ACTION_TYPES.UNCOMPLETE_TASK: {
      return updateTask(state, {
        ...action.payload,
        isCompleted: false
      });
    }

    case ACTION_TYPES.DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }

  return state;
}

export default rootReducer;
