import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllProjects from './AllProjects';
import AllLists from './AllLists';
import AllTasks from './AllTasks';

class TodoApp extends React.Component {
  render() {
    return (
      <Router>
        <div>
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
        </div>
      </Router>
    );
  }
}

export default TodoApp;
