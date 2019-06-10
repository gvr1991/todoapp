import UUID from 'uuid';
import * as ACTION_TYPES from '../constants/action-types';

function showNotification(payload) {
  return {
    type: ACTION_TYPES.SHOW_NOTIFICATION,
    payload,
  };
}

export function hideNotification(payload) {
  return {
    type: ACTION_TYPES.HIDE_NOTIFICATION,
    payload,
  };
}

export function showNotificationWithTimeout(text, timeout = 5000) {
  return function notifyWithTimeout(dispatch) {
    const id = UUID.v4();
    dispatch(
      showNotification({
        id,
        text,
      }),
    );
    setTimeout(() => {
      dispatch(
        hideNotification({ id }),
      );
    }, timeout);
  };
}
