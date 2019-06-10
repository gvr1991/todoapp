import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinkToProject from './LinkToProject';
import SidebarLayout from '../layout/SidebarLayout';

const mapStateToProps = state => ({
  projects: state.projects,
});

const ThisSidebar = function ThisSidebar(props) {
  const { projectId, projects } = props;

  const links = projects.filter(project => project.id !== projectId).map(project => (
    <div key={project.id}>
      <LinkToProject project={project} />
    </div>
  ));

  return (
    <SidebarLayout>
      <h1>Other Projects</h1>
      <br />
      { links }
    </SidebarLayout>
  );
};

ThisSidebar.propTypes = {
  projectId: PropTypes.string.isRequired,
  projects: PropTypes.instanceOf.isRequired,
};

const ListSidebar = connect(mapStateToProps)(ThisSidebar);
export default ListSidebar;
