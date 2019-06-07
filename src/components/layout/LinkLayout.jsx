import React from 'react';
import { Link } from 'react-router-dom';

class LinkLayout extends React.Component {
  render() {
    const { linkTo, linkText } = this.props;

    return (
      <React.Fragment>
        <hr />
        <Link to={linkTo} >
          { linkText }
        </Link>
        <hr />
      </React.Fragment>
    );
  }
}

export default LinkLayout;
