import React from 'react';
import Favicon from 'react-favicon';
import './App.scss';
import { Level } from './components/level';

function App() {
  return (
    <div className="App">
      <Favicon url='/favicon.png' />
      <Level />
    </div>
  );
}

export default App;
