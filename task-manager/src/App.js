
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <h1>Task Tracker</h1>
        </header>
        <main className="app-main">
          <Dashboard />
        </main>
      </div>
    </Provider>
  );
}

export default App;
