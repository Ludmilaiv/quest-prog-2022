import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Level1} from './components/level1';
import './style.sass';

export const Level = () => {
  return (
    <div className='level'>
      <Router>
        <Routes>
          <Route path='/fd347' element={<Level1 />}/>
        </Routes>
      </Router>
    </div>
  );
};