import React from 'react';
import { connect } from 'react-redux';

import LinkToList from './LinkToList';
import SidebarLayout from '../layout/SidebarLayout';

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
  };
};

class ThisSidebar extends React.Component {
  render() {
    const { urlParams, lists, title } = this.props;
    const { listId, projectId } = urlParams;
    const otherLists = lists.filter(list => list.projectId === projectId && list.id !== listId)

    const links = otherLists.map( (list) =>
      <div key={list.id}>
        <LinkToList list={list} />
      </div>
    );

    return (
      <SidebarLayout>
        <h1>{ title }</h1>
        <br />
        { links }
      </SidebarLayout>
    );
  }
}

const TaskSidebar = connect(mapStateToProps)(ThisSidebar);
export default TaskSidebar;
