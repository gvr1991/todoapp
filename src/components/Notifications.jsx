import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideNotification } from '../actions/notification';
import '../styles/styles.css';

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  sendHideNotification: payload => dispatch(hideNotification(payload)),
});

class Notifications extends React.Component {
  static propTypes = {
    sendHideNotification: PropTypes.func.isRequired,
    notifications: PropTypes.node.isRequired,
  };

  handleDelete = (id) => {
    const { sendHideNotification } = this.props;

    sendHideNotification({
      id,
    });
  }

  render() {
    const { notifications } = this.props;

    return (
      <div className="notifications">
        {
          notifications.map(n => (
            <div className="notification" key={n.id}>
              { n.text }
              <span
                role="presentation"
                onClick={() => this.handleDelete(n.id)}
              >
                X
              </span>
            </div>
          ))
        }
      </div>
    );
  }
}

const ConnectedNotifications = connect(mapStateToProps, mapDispatchToProps)(Notifications);
export default ConnectedNotifications;
