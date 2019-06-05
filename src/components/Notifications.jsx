import React from 'react';
import { connect } from 'react-redux';
import { hideNotification } from '../actions/notification';
import '../styles/styles.css';

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendHideNotification: (payload) => dispatch(hideNotification(payload)),
  };
}

class Notifications extends React.Component {
  render() {
    const { notifications } = this.props;

    return <div className="notifications">
      { notifications.map( (n) =>
        <div className="notification" key={n.id} >
          {n.text}
        </div>) }
    </div>;
  }
}

const ConnectedNotifications = connect(mapStateToProps, mapDispatchToProps)(Notifications);
export default ConnectedNotifications;
