import React from 'react';
import '../styles/styles.css';

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
    const { breadCrumbs, placeholder, contentTitle, listItems } = this.props;

    return <div id="content">
      { breadCrumbs ? breadCrumbs : null }
      <h1 id="heading">{contentTitle}</h1>
      <input
        id="enter-title"
        type="text"
        value={this.state.value}
        onChange={this.onChange}
        onKeyPress={this.handleCreate}
        placeholder={placeholder}
      />
      <div id="overflow">
        {listItems}
      </div>
    </div>;
  }
}

export default TodoListContent;