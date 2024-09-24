import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import "./todo.css"
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: 'all', 
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
    const filteredTodos = todos.filter(todo => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'active') return !todo.completed;
      return true;
    });

    return ( 
        <div> <h1>To-Do List</h1>
      <div className="listitem1">
     
        <TodoForm addTodo={this.addTodo} />
        <ul>
          {filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              toggleTodo={this.toggleTodo} 
              deleteTodo={this.deleteTodo} 
            />
          ))}
        </ul>
        <button onClick={this.deleteAll}>Delete All</button>
        <button onClick={() => this.filterTodos('all')}>Show All</button>
        <button onClick={() => this.filterTodos('completed')}>Show Completed</button>
        <button onClick={() => this.filterTodos('active')}>Show Active</button>
      </div></div> 
    );
  }
}

export default TodoList;
