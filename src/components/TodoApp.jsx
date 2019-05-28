import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { default as UUID } from 'uuid';
import AllProjects from './AllProjects';
import AllLists from './AllLists';
import AllTasks from './AllTasks';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    const { projects, lists, tasks } = this.props;

    this.state = {
      projects: (projects || []),
      lists: (lists || []),
      tasks: (tasks || []),
    };

    this.refNewProject = React.createRef();
    this.refNewList = React.createRef();
    this.refNewTask = React.createRef();
  }

  handleProjectCreate = (params, event) => {
    if (event.key === 'Enter') {
      const title = event.target.value;
      if (title === "") {
        return;
      }

      const projects = this.state.projects;
      const project = {
        id: UUID.v4(),
        title: event.target.value,
      };
      projects.push(project);

      this.setState({
        projects: projects,
      });

      this.refNewProject.current.value = "";
      event.preventDefault();
    }
  }

  handleListCreate = (params, event) => {
    if (event.key === 'Enter') {
      const title = event.target.value;
      if (title === "") {
        return;
      }

      const lists = this.state.lists;
      const list = {
        id: UUID.v4(),
        title: event.target.value,
        projectId: params['projectId'],
      };
      lists.push(list);

      this.setState({
        lists: lists,
      });

      this.refNewList.current.value = "";
      event.preventDefault();
    }
  }

  handleTaskCreate = (params, event) => {
    if (event.key === 'Enter') {
      const title = event.target.value;
      if (title === "") {
        return;
      }

      const tasks = this.state.tasks;
      const task = {
        id: UUID.v4(),
        title: event.target.value,
        listId: params['listId'],
        projectId: params['projectId'],
      };
      tasks.push(task);

      this.setState({
        tasks: tasks,
      });

      this.refNewTask.current.value = "";
      event.preventDefault();
    }
  }

  render() {
    let { tasks, lists, projects } = this.props;
    tasks = tasks || [];
    lists = lists || [];
    projects = projects || [];

    return (
      <Router>
        <div>
          <Route
            path="/projects"
            component={() => 
              <AllProjects
                projects={projects}
                onProjectCreate={this.handleProjectCreate}
                refNewProject={this.refNewProject}
              />
            }
          />

          <Route
            path="/project/:projectId/lists"
            component={() =>
              <AllLists
                projects={projects}
                lists={lists}
                onListCreate={this.handleListCreate}
                refNewList={this.refNewList}
              />
            }
          />

          <Route
            path="/project/:projectId/list/:listId/tasks"
            component={() =>
              <AllTasks
                lists={lists}
                tasks={tasks}
                onTaskCreate={this.handleTaskCreate}
                refNewTask={this.refNewTask}
              />
            }
          />
        </div>
      </Router>
    );
  }
}

export default TodoApp;
