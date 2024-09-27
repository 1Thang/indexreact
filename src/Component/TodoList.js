import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './todo.css';

class TodoList extends Component {
  FILTERS = {
    ALL: 'all',
    COMPLETED: 'completed',
    ACTIVE: 'active',
  };

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: this.FILTERS.ALL, 
    };
  }

  addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  toggleTodo = (id) => {
    const todos = this.state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.setState({ todos });
  };

  deleteAll = () => {
    this.setState({ todos: [] });
  };

  filterTodos = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todos, filter } = this.state;
    const { ALL, COMPLETED, ACTIVE } = this.FILTERS;

    const filteredTodos = todos.filter((todo) => {
      if (filter === COMPLETED) return todo.completed;
      if (filter === ACTIVE) return !todo.completed;
      return true; 
    });

    return (
      <div>
        <h1>To-Do List</h1>
        <div className="listitem1">
          <TodoForm addTodo={this.addTodo} />
          <ul>
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={this.toggleTodo}
              />
            ))}
          </ul>
          <div style={{ display: 'flex' }}><button onClick={this.deleteAll}>Delete All</button>
            <button onClick={() => this.filterTodos(ALL)}>Show All</button>
            <button onClick={() => this.filterTodos(COMPLETED)}>Show Completed</button>
            <button onClick={() => this.filterTodos(ACTIVE)}>Show Active</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
