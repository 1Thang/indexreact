import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editText: this.props.todo.text,
    };
  }

  handleToggle = () => {
    const { todo, toggleTodo } = this.props;
    toggleTodo(todo.id);
  };

  handleEditClick = () => {
    this.setState({ isEditing: true });
  };

  handleChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  handleBlur = () => {
    this.finishEditing();
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.finishEditing();
    }
  };

  finishEditing = () => {
    const { editText } = this.state;
    const { todo, updateTodoText } = this.props;

    if (editText.trim()) {
      updateTodoText(todo.id, editText); 
    }
    this.setState({ isEditing: false });
  };

  handleDelete = () => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id); 
  };

  render() {
    const { todo } = this.props;
    const { isEditing, editText } = this.state;

    return (
      <li
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={this.handleToggle}
          style={{ marginRight: '10px' }}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            autoFocus
            style={{ flex: 1 }}
          />
        ) : (
          <span style={{ flex: 1 }}>
            {todo.text}
          </span>
        )}
        {!isEditing && (
          <button onClick={this.handleEditClick} style={{ marginLeft: '10px' }}>
            Sửa
          </button>
        )}
        <button onClick={this.handleDelete} style={{ marginLeft: '10px' }}>
          Xóa
        </button>
      </li>
    );
  }
}

export default TodoItem;
