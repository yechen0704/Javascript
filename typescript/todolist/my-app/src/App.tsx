import React from 'react';
import './App.css';
import ReduxTodolist from './components/Todolist';

const App: React.FC = () => {
  return (
    <div style={{ margin: '100px' }}>
      <ReduxTodolist />
    </div>
  );
}

export default App;