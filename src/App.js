/**
 * This is the master JS file which renders the application.
 *
 * Right now, it basically just renders a TaskList.
 */

import React from 'react';
import './App.css';
import TaskList from './TaskList';

const App = () => {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
};

export default App;
