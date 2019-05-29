import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import store from "./store/index";
import { Provider } from "react-redux";

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <TodoApp title="Todo-App" />
  </Provider>, document.getElementById('root')
);
