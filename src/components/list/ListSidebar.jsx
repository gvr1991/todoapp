import React from 'react';
import { connect } from 'react-redux';

import LinkToProject from './LinkToProject';
import SidebarLayout from '../layout/SidebarLayout';

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

class ThisSidebar extends React.Component {
  render() {
    const { projectId, projects } = this.props;

    const links = projects.filter(project => project.id !== projectId).map( (project) =>
      <div key={project.id} >
        <LinkToProject project={project} />
      </div>
    );

    return (
      <SidebarLayout>
        <h1>{"Other Projects"}</h1>
        <br />
        { links }
      </SidebarLayout>
    );
  }
}

const ListSidebar = connect(mapStateToProps)(ThisSidebar);
export default ListSidebar;
