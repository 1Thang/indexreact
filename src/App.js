
import './App.css';

// App.js
import React from 'react';
import { ThemeProvider } from '../src/Component/ThemeContext'; 
import TodoList from '../src/Component/TodoList';

function App() {
  return (
    <ThemeProvider>
      <TodoList />
    </ThemeProvider>
  );
}

export default App;

