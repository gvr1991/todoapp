import React from 'react';
import '../styles/styles.css';

class TodoListContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleCreate = (event) => {
    if (event.key === 'Enter') {
      const { onEnter, urlParams } = this.props;
      const { value } = this.state;

      onEnter(urlParams, value);

      this.setState({
        value: '',
      });
    }
  }

  onChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleEdit = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { breadCrumbs, leftSidebar, placeholder, contentTitle, listItems } = this.props;
    const { value } = this.state;

    let sidebarElement = leftSidebar ?
      <div id="left-sidebar">
        {leftSidebar}
        <br />
      </div> : null;

    let breadCrumbsEl = breadCrumbs ?
      <div id="bread-crumbs">
        {breadCrumbs}
      </div> : null;

    const topDivision = (
      <div>
        <div className="horizontally-aligned">
          {sidebarElement}
          <div id="content">
            {breadCrumbsEl}
            <h1>{contentTitle}</h1>

            <input
              id="enter-title"
              name="title"
              type="text"
              value={value}
              onChange={this.onChange}
              onKeyPress={this.handleCreate}
              placeholder={placeholder}
            />
            <br />
            {listItems}
          </div>
        </div>
      </div>
    );

    return topDivision;
  }
}

export default TodoListContent;