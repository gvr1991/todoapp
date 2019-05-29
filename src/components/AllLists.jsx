import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import TodoListContent from './TodoListContent';

class AllLists extends React.Component {
  render() {
    console.log(this.props);
    const { match, lists, projects, onListCreate } = this.props;
    const projectId = match.params['projectId'];
    const project = projects.find(project => project.id === projectId);
    let listsInProject = lists ? lists.filter(list => list.projectId === projectId) : [];

    listsInProject = listsInProject.length > 0 ? (listsInProject.map( (list) =>
      <li key={list.id}>
        <Link to={`/project/${list.projectId}/list/${list.id}/tasks`}>
          {list.title}
        </Link>
      </li>
    )) : null;

    return <TodoListContent
      header={project.title}
      onEnter={onListCreate}
      placeholder="Create lists as a todo-list"
      listItems={listsInProject}
      urlParams={match.params}
    />;
  }
}

export default withRouter(AllLists);
