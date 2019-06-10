import { combineReducers } from 'redux';
import tasksReducer from './tasks';
import listsReducer from './lists';
import projectsReducer from './projects';
import notificationsReducer from './notifications';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  lists: listsReducer,
  projects: projectsReducer,
  notifications: notificationsReducer,
});

export default rootReducer;
