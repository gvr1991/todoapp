import React from 'react';
import '../../styles/styles.css';

class BreadCrumbsLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div id="bread-crumbs" className="horizontally-aligned">
        { children }
      </div>
    );
  }
}

export default BreadCrumbsLayout;
