import { default as UUID } from 'uuid';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';

const root = document.getElementById('root');
if (root == null) throw new Error('App element #root not found');

const PROJECT_IDS = [UUID.v4(), UUID.v4(), UUID.v4(), UUID.v4()];

const LIST_IDS = [UUID.v4(), UUID.v4(), UUID.v4(), UUID.v4()];

const PROJECTS = [
  {
    id: PROJECT_IDS[0],
    title: "Project 1",
  },
  {
    id: PROJECT_IDS[1],
    title: "Project 2",
  },
  {
    id: PROJECT_IDS[2],
    title: "Project 3",
  },
  {
    id: PROJECT_IDS[3],
    title: "Project 4",
  }
];

const LISTS = [
  {
    id: LIST_IDS[0],
    projectId: PROJECT_IDS[0],
    title: "List 1",
  },
  {
    id: LIST_IDS[1],
    projectId: PROJECT_IDS[1],
    title: "List 2",
  },
  {
    id: LIST_IDS[2],
    projectId: PROJECT_IDS[2],
    title: "List 3",
  },
  {
    id: LIST_IDS[3],
    projectId: PROJECT_IDS[3],
    title: "List 4",
  }
];

const TASKS = [
  {
    id: UUID.v4(),
    listId: LIST_IDS[0],
    projectId: PROJECT_IDS[0],
    title: "Task 1",
  },
  {
    id: UUID.v4(),
    listId: LIST_IDS[1],
    projectId: PROJECT_IDS[1],
    title: "Task 2",
  },
  {
    id: UUID.v4(),
    listId: LIST_IDS[2],
    projectId: PROJECT_IDS[2],
    title: "Task 3",
  },
  {
    id: UUID.v4(),
    listId: LIST_IDS[3],
    projectId: PROJECT_IDS[3],
    title: "Task 4",
  }
];

ReactDOM.render(
<TodoApp
  title="Todo-App"
  projects={PROJECTS}
  lists={LISTS}
  tasks={TASKS}
/>, root);
