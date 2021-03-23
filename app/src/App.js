import React, { useState, useEffect } from 'react';
import logo from './pokebadge.png';
import './App.css';

import PokemonWrap from './components/PokemonWrap/index'
import TeamWrap from './components/TeamWrap/index'


function App() {

  const [data, setData] = useState(null)
  const [index, setIndex] = useState(1)
  const [create, setCreate] = useState(true)

  useEffect(() => {
    fetch("/api" + index.toString())
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [index]);

  return (
    <div className="App">
      <div className="App-body">
      <div className="App-title">
        <h1>PokéApp</h1><img src={logo} />
      </div>
      <nav className="App-nav">
        <h3 
          className="nav-item" 
          style={create ? {color: '#bbb'} : null}
          onClick={() => {setCreate(true)}}
        >
          Teams
        </h3>
        <h3>|</h3>
        <h3 
          className="nav-item" 
          style={create ? null : {color: '#bbb'}}
          onClick={() => {setCreate(false)}}
        >
          Create
          </h3> 
      </nav>
          {create ? <TeamWrap /> : <PokemonWrap />}
      </div>
    </div>
  );
}

export default App;
