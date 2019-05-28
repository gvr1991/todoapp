import React from 'react';
import '../styles/oneRing.css';

class TodoListContent extends React.Component {
  render() {
    const {
      placeholder,
      header,
      reference,
      onKeyPressCallback,
      listItems,
      urlParams
    } = this.props;

    const topDivision = (
      <div id="todoitem">
        <h1>{header}</h1>

        <input
          id="enter-title"
          name="title"
          type="text"
          ref={reference}
          onKeyPress={(event) => onKeyPressCallback(urlParams, event)}
          placeholder={placeholder}
        />

        {listItems}
      </div>
    );
  
    return topDivision;
  }
}

export default TodoListContent;
