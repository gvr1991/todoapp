import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LinkToList from './LinkToList';
import SidebarLayout from '../layout/SidebarLayout';

const mapStateToProps = state => ({
  lists: state.lists,
});

const ThisSidebar = function ThisSidebar(props) {
  const { urlParams, lists, title } = props;
  const { listId, projectId } = urlParams;
  const otherLists = lists.filter(list => list.projectId === projectId && list.id !== listId);

  const links = otherLists.map(list => (
    <div key={list.id}>
      <LinkToList list={list} />
    </div>
  ));

  return (
    <SidebarLayout>
      <h1>
        {'Other lists in '}
        {title}
      </h1>
      <br />
      { links }
    </SidebarLayout>
  );
};

ThisSidebar.propTypes = {
  title: PropTypes.string.isRequired,
  urlParams: PropTypes.shape.isRequired,
  lists: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const TaskSidebar = connect(mapStateToProps)(ThisSidebar);
export default TaskSidebar;
