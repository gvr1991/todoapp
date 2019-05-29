import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { default as UUID } from 'uuid';
import AllProjects from './AllProjects';
import AllLists from './AllLists';
import AllTasks from './AllTasks';

class TodoApp extends React.Component {
  handleProjectCreate = (params, title) => {
    if (title === "") {
      return;
    }

    const projects = this.state.projects;
    const project = {
      id: UUID.v4(),
      title,
    };
    projects.push(project);

    this.setState({
      projects: projects,
    });
  }

  handleListCreate = (params, title) => {
    if (title === "") {
      return;
    }

    const lists = this.state.lists;
    const list = {
      id: UUID.v4(),
      title,
      projectId: params['projectId'],
    };
    lists.push(list);

    this.setState({
      lists: lists,
    });
  }

  handleTaskCreate = (params, title) => {
    if (title === "") {
      return;
    }

    const tasks = this.state.tasks;
    const task = {
      id: UUID.v4(),
      title,
      listId: params['listId'],
      projectId: params['projectId'],
    };
    tasks.push(task);

    this.setState({
      tasks: tasks,
    });
  }

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
