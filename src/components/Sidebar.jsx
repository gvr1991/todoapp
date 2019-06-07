import React from 'react';

class Sidebar extends React.Component {
  render() {
    const { title, children } = this.props;

    return (
      <div id="left-sidebar">
        <h1 id="heading">{ title }</h1>
        <br />
        { children }
      </div>
    );
  }
}

export default Sidebar;
