import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { ThemeContext } from './ThemeContext';
import './todo.css';

class TodoList extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: 'all',
      visibleTodos: 5, 
    };
  }

  addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  toggleTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  updateTodoText = (id, newText) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    }));
  };

  deleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));
  };

  deleteAll = () => {
    this.setState({ todos: [] });
  };

  filterTodos = (filter) => {
    this.setState({ filter });
  };

  filteredTodos = () => {
    const { todos, filter } = this.state;
    if (filter === 'completed') return todos.filter((todo) => todo.completed);
    if (filter === 'active') return todos.filter((todo) => !todo.completed);
    return todos;
  };

  loadMoreTodos = () => {
    this.setState((prevState) => ({
      visibleTodos: prevState.visibleTodos + 5,
    }));
  };

  handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      this.loadMoreTodos();
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { visibleTodos } = this.state;
    const filteredTodos = this.filteredTodos();

    const { theme, toggleTheme } = this.context;

    const themeStyle = {
      backgroundColor: theme === 'light' ? 'white' : 'black',
      color: theme === 'light' ? 'black' : 'white',
      minHeight: '100vh',
      padding: '20px',
    };

    return (
      <div style={themeStyle}>
        <h1>To-Do List</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <div className="listitem1">
          <TodoForm addTodo={this.addTodo} />
          <ul>
            {filteredTodos.slice(0, visibleTodos).map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={this.toggleTodo}
                updateTodoText={this.updateTodoText}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
          {visibleTodos < filteredTodos.length && (
            <div>Loading more items...</div>
          )}
          <div style={{ display: 'flex' }}>
            <button onClick={this.deleteAll}>Delete All</button>
            <button onClick={() => this.filterTodos('all')}>Show All</button>
            <button onClick={() => this.filterTodos('completed')}>
              Show Completed
            </button>
            <button onClick={() => this.filterTodos('active')}>
              Show Active
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
