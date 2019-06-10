import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectsPage from './project/ProjectsPage';
import ListsPage from './list/ListsPage';
import TasksPage from './task/TasksPage';
import ConnectedNotifications from './Notifications';

const TodoApp = () => (
  <div>
    <Router>
      <ConnectedNotifications />
      <Route
        path="/projects"
        component={() => <ProjectsPage />}
      />
      <Route
        path="/project/:projectId/lists"
        component={() => <ListsPage />}
      />
      <Route
        path="/project/:projectId/list/:listId/tasks"
        component={() => <TasksPage />}
      />
    </Router>
  </div>
);

export default TodoApp;
