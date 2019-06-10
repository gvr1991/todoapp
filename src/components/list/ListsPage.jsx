import React from 'react';
import UUID from 'uuid';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainPageLayout from '../layout/MainPageLayout';
import ListSidebar from './ListSidebar';
import ListBreadCrumbs from './ListBreadCrumbs';
import TodoListContent from '../TodoListContent';
import TodoListInput from '../TodoListInput';
import { createList, deleteList } from '../../actions/list';
import { showNotificationWithTimeout } from '../../actions/notification';

const mapStateToProps = state => ({
  lists: state.lists,
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  sendCreate: payload => dispatch(createList(payload)),
  sendDelete: payload => dispatch(deleteList(payload)),
  sendNotification: text => dispatch(showNotificationWithTimeout(text)),
});

class ConnectedLists extends React.Component {
  static propTypes = {
    lists: PropTypes.node.isRequired,
    projects: PropTypes.node.isRequired,
    match: PropTypes.symbol.isRequired,
    sendCreate: PropTypes.func.isRequired,
    sendDelete: PropTypes.func.isRequired,
    sendNotification: PropTypes.func.isRequired,
  };

  handleListCreate = (params, title) => {
    if (title === '') {
      return;
    }

    const {
      projects,
      sendCreate,
      sendNotification,
    } = this.props;

    const project = projects.find(p => p.id === params.projectId);

    sendCreate({
      id: UUID.v4(),
      title,
      projectId: params.projectId,
    });

    sendNotification(`${title} created successfully in project "${project.title}"`);
  }

  handleDelete = (id) => {
    const {
      lists,
      projects,
      sendDelete,
      sendNotification,
    } = this.props;

    const list = lists.find(l => l.id === id);
    const project = projects.find(p => p.id === list.projectId);

    sendDelete({
      id,
    });

    sendNotification(`${list.title} deleted successfully from project "${project.title}"`);
  }

  render() {
    const {
      match,
      lists,
      projects,
    } = this.props;

    const {
      projectId,
    } = match.params;

    const project = projects.find(p => p.id === projectId);

    const breadCrumbs = (
      <ListBreadCrumbs project={project} />
    );

    const todoListInput = (
      <TodoListInput
        onEnter={this.handleListCreate}
        placeholder="Create lists as a todo-list"
        urlParams={match.params}
      />
    );

    const collection = lists.filter(list => list.projectId === projectId).map(list => (
      <div className="horizontally-aligned" key={list.id}>
        <li>
          <Link to={`/project/${projectId}/list/${list.id}/tasks`}>
            {list.title}
          </Link>
        </li>
        <button type="submit" onClick={() => this.handleDelete(list.id)}>X</button>
      </div>
    ));

    return (
      <MainPageLayout>
        <ListSidebar projectId={projectId} />

        <TodoListContent
          breadCrumbs={breadCrumbs}
          title={project.title}
          input={todoListInput}
          collection={collection}
        />
      </MainPageLayout>
    );
  }
}

const ListsPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedLists);
export default withRouter(ListsPage);
