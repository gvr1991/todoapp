import React from 'react';

class Sidebar extends React.Component {
  render() {
    const { links, title } = this.props;

    return (
      <div id="left-sidebar">
        <h1>{ title }</h1>
        <br />
        { links }
      </div>
    );
  }
}

export default Sidebar;
