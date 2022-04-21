import React from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams} from 'react-router-dom';
import {Level1} from './components/level1';
import {LevelJump} from './components/level-jump';
import {LevelMaze2} from './components/level-maze2';
import './style.sass';

function CangeLevel() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get('level');
  return (
    <div className="App">
      {level === 'fd347' ? <Level1 /> : 
        level === '78vcn' ? <LevelJump /> : 
          level === '4f7tr' ? <LevelMaze2 /> : 'Error 404. Page not found'}
    </div>
  );
}

export const Level = () => {
  return (
    <div className='level'>
      <Router>
        <Routes>
          <Route path='/' element={<CangeLevel />}/>
        </Routes>
      </Router>
    </div>
  );
};