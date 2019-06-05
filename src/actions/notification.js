import * as ACTION_TYPES from '../constants/action-types';
import { default as UUID } from 'uuid';

function showNotification(payload) {
  return {
    type: ACTION_TYPES.SHOW_NOTIFICATION,
    payload,
  }
};

function hideNotification(payload) {
  return {
    type: ACTION_TYPES.HIDE_NOTIFICATION,
    payload,
  }
};

export function showNotificationWithTimeout(text, timeout = 5000) {
  // Thunk middleware automagically passes dispatch object to the below function

  return function(dispatch) {
    const id = UUID.v4();
    dispatch( showNotification({ id, text }) );
    setTimeout(() => { dispatch( hideNotification({ id }) ) }, timeout);
  }
}
