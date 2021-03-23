import React, { useState, useEffect } from 'react';
import './styles.css';
import PokemonSelect from '../PokemonSelect/index'


function PokemonWrap() {
    let newTeamArray = ['Pokéawesome', 'PETA\'s Nightmare', 'Frightning Fellows', 'Green Team', 'Deadly Alliance', 'Attack Squadron', 'Violent Crew', 'Friendly Foes', 'The Brady Bunch', 'Bird is the Word']

    const [name, setName] = useState(newTeamArray[Math.floor(Math.random() * 10)])
    const [submitted, setSubmitted] = useState(false)

    const rng = () => Math.floor(Math.random() * 151) + 1

    const [index1, setIndex1] = useState(rng)
    const [index2, setIndex2] = useState(rng)
    const [index3, setIndex3] = useState(rng)
    const [index4, setIndex4] = useState(rng)
    const [index5, setIndex5] = useState(rng)
    const [index6, setIndex6] = useState(rng)

  return (
    <div className="select-wrapper">
    <h2>{name.length < 1 ? '(unnamed)' : name}</h2>
        <div className="select-container">
            <PokemonSelect index={index1} setIndex={setIndex1}/>
            <PokemonSelect index={index2} setIndex={setIndex2}/>
            <PokemonSelect index={index3} setIndex={setIndex3}/>
            <PokemonSelect index={index4} setIndex={setIndex4}/>
            <PokemonSelect index={index5} setIndex={setIndex5}/>
            <PokemonSelect index={index6} setIndex={setIndex6}/>
        </div>
        <form className="team-form" action="/add-team" method="POST">
            <input style={{display: 'none'}} type="hidden" type="text" name="team" value={[index1, index2, index3, index4, index5, index6]} readOnly />
            <input className="team-input" type="text" name="title" value={name} onChange={(e) => {setName(e.target.value)}}/>
            <button className="team-button" type="submit">Add Team</button>
        </form>
    </div>
  );
}

export default PokemonWrap;