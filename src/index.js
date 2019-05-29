import { default as UUID } from 'uuid';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import store from "./store/index";
import { createProject } from "./actions/index";

window.store = store;
window.createProject = createProject;

const root = document.getElementById('root');
if (root == null) throw new Error('App element #root not found');

const PROJECT_IDS = [UUID.v4(), UUID.v4(), UUID.v4(), UUID.v4()];

const LIST_IDS = [UUID.v4(), UUID.v4(), UUID.v4(), UUID.v4()];

const PROJECTS = [
  {
    id: PROJECT_IDS[0],
    title: "Project " + PROJECT_IDS[0],
  },
  {
    id: PROJECT_IDS[1],
    title: "Project " + PROJECT_IDS[1],
  },
  {
    id: PROJECT_IDS[2],
    title: "Project " + PROJECT_IDS[2],
  },
  {
    id: PROJECT_IDS[3],
    title: "Project " + PROJECT_IDS[3],
  }
];

const LISTS = [
  {
    id: LIST_IDS[0],
    projectId: PROJECT_IDS[0],
    title: "List [" + PROJECT_IDS[0] + "]",
  },
  {
    id: LIST_IDS[1],
    projectId: PROJECT_IDS[1],
    title: "List [" + PROJECT_IDS[1] + "]",
  },
  {
    id: LIST_IDS[2],
    projectId: PROJECT_IDS[2],
    title: "List [" + PROJECT_IDS[2] + "]",
  },
  {
    id: LIST_IDS[3],
    projectId: PROJECT_IDS[3],
    title: "List [" + PROJECT_IDS[3] + "]",
  }
];

const TASKS = [
  {
    id: UUID.v4(),
    listId: LIST_IDS[0],
    projectId: PROJECT_IDS[0],
    title: "Task [" + PROJECT_IDS[0] + "] -> [" + LIST_IDS[0] + "]",
  },
  {
    id: UUID.v4(),
    listId: LIST_IDS[1],
    projectId: PROJECT_IDS[1],
    title: "Task [" + PROJECT_IDS[1] + "] -> [" + LIST_IDS[1] + "]",
  },
  {
    id: UUID.v4(),
    listId: LIST_IDS[2],
    projectId: PROJECT_IDS[2],
    title: "Task [" + PROJECT_IDS[2] + "] -> [" + LIST_IDS[2] + "]",
  },
  {
    id: UUID.v4(),
    listId: LIST_IDS[3],
    projectId: PROJECT_IDS[3],
    title: "Task [" + PROJECT_IDS[3] + "] -> [" + LIST_IDS[3] + "]",
  }
];

ReactDOM.render(
<TodoApp
  title="Todo-App"
  projects={PROJECTS}
  lists={LISTS}
  tasks={TASKS}
/>, root);
