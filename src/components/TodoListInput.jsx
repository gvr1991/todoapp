import React from 'react';

class TodoListInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleKeyPress = (event) => {
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

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;

    return (
      <input
        style={{ "margin-left": "10px" }}
        type="text"
        onChange={this.onChange}
        onKeyPress={this.handleKeyPress}
        placeholder={placeholder}
        value={value} />
    );
  }
}

export default TodoListInput;
