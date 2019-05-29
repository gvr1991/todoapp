import React from 'react';
import '../styles/oneRing.css';

class TodoListContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  onKeyPressCallback = (event) => {
    const { onEnter, urlParams } = this.props;
    const { value } = this.state;

    if (event.key === 'Enter') {
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

  render() {
    const { placeholder, header, listItems } = this.props;
    const { value } = this.state;

    const topDivision = (
      <div id="todoitem">
        <h1>{header}</h1>

        <input
          id="enter-title"
          name="title"
          type="text"
          value={value}
          onChange={this.onChange}
          onKeyPress={this.onKeyPressCallback}
          placeholder={placeholder}
        />

        {listItems}
      </div>
    );

    return topDivision;
  }
}

export default TodoListContent;
