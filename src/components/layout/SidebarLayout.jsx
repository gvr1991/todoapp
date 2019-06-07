import React from 'react';
import '../../styles/styles.css';

class SidebarLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div id="left-sidebar">
        { children }
      </div>
    );
  }
}

export default SidebarLayout;
