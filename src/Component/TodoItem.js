import React, { Component } from 'react';

class TodoItem extends Component {
  handleToggle = () => {
    const { todo, toggleTodo } = this.props;
    toggleTodo(todo.id);
  };

  render() {
    const { todo } = this.props;

    return (
      <li
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={this.handleToggle}
          style={{ marginRight: '10px' }}
        />
        <span>{todo.text}</span>
      </li>
    );
  }
}

export default TodoItem;
