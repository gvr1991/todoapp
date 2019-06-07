import React from 'react';
import '../../styles/styles.css';

class MainPageLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="horizontally-aligned">
        { children }
      </div>
    );
  }
}

export default MainPageLayout;
