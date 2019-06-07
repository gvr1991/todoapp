import React from 'react';
import '../styles/styles.css';

class TodoListContent extends React.Component {
  render() {
    const { breadCrumbs, title, input, collection } = this.props;

    return (
      <div id="content">
        { breadCrumbs ? breadCrumbs : null }
        <h1 id="heading">{title}</h1>
        { input }
        <div id="overflow">
          { collection }
        </div>
      </div>
    );
  }
}

export default TodoListContent;
