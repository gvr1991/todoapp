import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import '../styles/styles.css';

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

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
    const { notifications, header, leftSidebar, placeholder, contentTitle, listItems } = this.props;
    const { value } = this.state;

    const topDivision = (
      <div>
        <div className="notification_container">
          { notifications.map( (n) =>
            <div className="notification_element" key={n.id} >
              {n.text}
            </div>) }
        </div>

        <div id="header">
          {header}
        </div>

        <div className="horizontally-aligned">
          <div id="left-sidebar">
            {leftSidebar}
            <br />
          </div>
          <div id="content">
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

const ConnectedTodoList = connect(mapStateToProps)(TodoListContent);
export default withRouter(ConnectedTodoList);
