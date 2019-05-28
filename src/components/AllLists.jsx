import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import TodoListContent from './TodoListContent'

class AllLists extends React.Component {
  render() {
    const { projects, match, refNewList, onListCreate } = this.props;
    const projectId = match.params['projectId'];
    const project = projects.find(project => project.id === projectId);
    console.log(project);
    let lists = this.props.lists ? this.props.lists.filter(list => list.projectId === projectId) : [];

    lists = lists.length > 0 ? (lists.map( (list) =>
      <li key={list.id}>
        <Link to={`/project/${projectId}/list/${list.id}/tasks`}>
          {list.title}
        </Link>
      </li>
    )) : null;

    return <TodoListContent
      header={project.title}
      reference={refNewList}
      onKeyPressCallback={onListCreate}
      placeholder="Create lists as a todo-list"
      listItems={lists}
      urlParams={match.params}
    />;
  }
}

export default withRouter(AllLists);
