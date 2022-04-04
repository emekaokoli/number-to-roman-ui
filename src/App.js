import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Search from './container/search';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Search />
    </div>
  );
}

export default App;
