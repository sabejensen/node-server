import React, { useState, useEffect } from 'react';
import './styles.css';
import TeamSprite from './TeamSprite/index'


function TeamListing(props) {

    const [edit, setEdit] = useState(false)

    const [index, setIndex] = useState({
        one: props.team[0],
        two: props.team[1],
        three: props.team[2],
        four: props.team[3],
        five: props.team[4], 
        six: props.team[5]
    })
    const [currentName, setCurrentName] = useState(props.name)

    let a
    let b
    let c
    let d
    let e
    let f
    let name

    const editReset = () => {
        setIndex({
            one: props.team[0],
            two: props.team[1],
            three: props.team[2],
            four: props.team[3],
            five: props.team[4], 
            six: props.team[5]
        })
        setCurrentName(props.name)
    }

  return (
    <div className="select-wrapper">
        <h3>{props.name}</h3>
        <div className="team-container">
            <TeamSprite index={props.team[0]} />
            <TeamSprite index={props.team[1]} />
            <TeamSprite index={props.team[2]} />
            <TeamSprite index={props.team[3]} />
            <TeamSprite index={props.team[4]} />
            <TeamSprite index={props.team[5]} />
        </div>
        <div className="control-panel">
            <button className="team-button control-button" onClick={() => {
                editReset()
                setEdit(!edit)
            }}>Edit</button>
            <button className="team-button control-button" onClick={() => {
                fetch('/delete-team', {
                    method: 'delete',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: props.id
                    })
                })
                window.location.reload(false)
            }}>
            Delete
            </button>
        </div>
        {edit ? <div className="edit-panel">
            <div>
                <p>Team Name: </p>
                <input className="new-team-input" type="text" name="title" value={name} onChange={(name) => {setCurrentName(name.target.value)}}/>
            </div>
            <div>
                <p>Pokémon Indexes: </p>
                <input type="number" id="quantity" name="quantity" min="1" max="151" value={a} onChange={(a) => {setIndex({...index, one: a.target.value})}}/>
                <input type="number" id="quantity" name="quantity" min="1" max="151" value={b} onChange={(b) => {setIndex({...index, two: b.target.value})}}/>
                <input type="number" id="quantity" name="quantity" min="1" max="151" value={c} onChange={(c) => {setIndex({...index, three: c.target.value})}}/>
                <input type="number" id="quantity" name="quantity" min="1" max="151" value={d} onChange={(d) => {setIndex({...index, four: d.target.value})}}/>
                <input type="number" id="quantity" name="quantity" min="1" max="151" value={e} onChange={(e) => {setIndex({...index, five: e.target.value})}}/>
                <input type="number" id="quantity" name="quantity" min="1" max="151" value={f} onChange={(f) => {setIndex({...index, six: f.target.value})}}/>
            </div>
            <button
                className="team-button control-button"
                onClick={() => {
                    let newArray = [index.one, index.two, index.three, index.four, index.five, index.six]
                    console.log(newArray, currentName)
                    fetch('/edit-team', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: props.id,
                            name: currentName,
                            team: newArray
                        })
                    })
                    window.location.reload(false)

                }}
            >
                Save
            </button>
        </div> : null}
    </div>
  );
}

export default TeamListing;