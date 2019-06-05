import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllProjects from './AllProjects';
import AllLists from './AllLists';
import AllTasks from './AllTasks';
import ConnectedNotifications from './Notifications';

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <ConnectedNotifications />
          <Route
            path="/projects"
            component={ () => <AllProjects /> }
          />
          <Route
            path="/project/:projectId/lists"
            component={ () => <AllLists /> }
          />
          <Route
            path="/project/:projectId/list/:listId/tasks"
            component={ () => <AllTasks /> }
          />
        </Router>
      </div>
    );
  }
}

export default TodoApp;
