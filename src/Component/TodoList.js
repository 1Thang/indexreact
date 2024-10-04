import React, { useState, useContext } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { ThemeContext } from './ThemeContext';
import './todo.css';

const TodoList = () => {
  const FILTERS = {
    ALL: 'all',
    COMPLETED: 'completed',
    ACTIVE: 'active',
  };

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const updateTodoText = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id); // Lọc bỏ mục có id cần xóa
    setTodos(updatedTodos);
  };

  const deleteAll = () => {
    setTodos([]);
  };

  const filterTodos = (filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === FILTERS.COMPLETED) return todo.completed;
    if (filter === FILTERS.ACTIVE) return !todo.completed;
    return true;
  });

  const { theme, toggleTheme } = useContext(ThemeContext);

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
        <TodoForm addTodo={addTodo} />
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              updateTodoText={updateTodoText}
              deleteTodo={deleteTodo} 
            />
          ))}
        </ul>
        <div style={{ display: 'flex' }}>
          <button onClick={deleteAll}>Delete All</button>
          <button onClick={() => filterTodos(FILTERS.ALL)}>Show All</button>
          <button onClick={() => filterTodos(FILTERS.COMPLETED)}>
            Show Completed
          </button>
          <button onClick={() => filterTodos(FILTERS.ACTIVE)}>Show Active</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
