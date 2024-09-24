import React from 'react';

const TodoItem = ({ todo, toggleTodo }) => {
  return (
    <li style={{ display: 'flex', alignItems: 'center', textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleTodo(todo.id)} 
        style={{ marginRight: '10px' }} 
      />
      <span>{todo.text}</span>
    </li>
  );
};

export default TodoItem;
