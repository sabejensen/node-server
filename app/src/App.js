import React, { useState, useEffect } from 'react';
import logo from './pokebadge.png';
import './App.css';

import Pokedex from './components/Pokedex/index'
import PokemonWrap from './components/PokemonWrap/index'
import TeamWrap from './components/TeamWrap/index'


function App() {

  const [data, setData] = useState(null)
  const [index, setIndex] = useState(1)
  const [page, setPage] = useState('teams')

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
          style={page === 'teams' ? {color: '#bbb'} : null}
          onClick={() => {setPage('teams')}}
        >
          Teams
        </h3>
        <h3>|</h3>
        <h3 
          className="nav-item" 
          style={page === 'create' ? {color: '#bbb'} : null }
          onClick={() => {setPage('create')}}
        >
          Create
        </h3> 
        <h3>|</h3>
        <h3 
          className="nav-item" 
          style={page === 'pokedex' ? {color: '#bbb'} : null }
          onClick={() => {setPage('pokedex')}}
        >
          Pokédex
        </h3> 
      </nav>
          {page === 'teams' ? <TeamWrap /> : null }
          {page === 'create' ? <PokemonWrap /> : null }
          {page === 'pokedex' ? <Pokedex /> : null }
      </div>
    </div>
  );
}

export default App;
