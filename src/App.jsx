// src/App.jsx
import React from 'react';
import CountryList from './component/CountryList';
import './App.css'; // Ensure this imports the updated styles

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <CountryList />
      </header>
    </div>
  );
};

export default App;
