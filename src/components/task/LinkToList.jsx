import React from 'react';
import { Link } from 'react-router-dom';

class LinkToList extends React.Component {
  render() {
    const { list } = this.props;

    return (
      <React.Fragment>
        <br />
        <Link to={`/project/${list.projectId}/list/${list.id}/tasks`} >
          {list.title}
        </Link>
        <br />
      </React.Fragment>
    );
  }
}

export default LinkToList;
