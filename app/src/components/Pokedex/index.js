import React, { useState, useEffect } from 'react';
import './styles.css';

import { useQuery, useMutation, gql } from '@apollo/client';

const PK_QUERY = gql`
  {
    firstPokemon {
      autoId
      id
      name
      classification
      sprite
    }
  }
`

const ADD_PK = gql`
      mutation (
          $name: String!
          $classification: String!
          $sprite: String!
          $id: String!
      ) {
        addPokemon(name: $name, classification: $classification, sprite: $sprite, id: $id) {
            autoId
            name
            id
            classification
            sprite
        }
      }
`;

const DELETE_PK = gql`
      mutation (
          $id: String!
          $autoId: String!
      ) {
        deletePokemon(id: $id, autoId: $autoId) {
            autoId
            name
            id
            classification
            sprite
        }
      }
`;

const UPDATE_PK = gql`
      mutation (
          $name: String!
          $classification: String!
          $autoId: String!
      ) {
        updatePokemon(name: $name, classification: $classification, autoId: $autoId) {
            autoId
            name
            id
            classification
            sprite
        }
      }
`

function Pokedex() {
    const { loading, data } = useQuery(PK_QUERY)

    let name
    let tag
    let newName
    let newTag

    const [addPk] = useMutation(ADD_PK)
    const [deletePk] = useMutation(DELETE_PK)
    const [updatePk] = useMutation(UPDATE_PK)

    const [pkName, setPkName] = useState('')
    const [pkTag, setPkTag] = useState('')
    const [edit, setEdit] = useState(false)
    const [pkNewName, setPkNewName] = useState('')
    const [pkNewTag, setPkNewTag] = useState('')

    const [pkval, setPkval] = useState(1)
    const [pkalt, setPkalt] = useState(0)

    const urlArr = ['https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/']

    const idFun = () => {
        if(data.firstPokemon.id) {
            let currentId = (parseInt(data.firstPokemon.id) + 1).toString()
            if(currentId.length == 1) {
                return('00' + currentId)
            } else if(currentId.length == 2) {
                return('0' + currentId)
            } else {
                return currentId
            }
        } else {
            return '001'
        }
    }

    const nameFun = () => {
        if(pkNewName.length < 1) {
            return data.firstPokemon.name
        } else {
            return pkNewName
        }
    }

    const tagFun = () => {
        if(pkNewTag.length < 1) {
            return data.firstPokemon.classification
        } else {
            return pkNewTag
        }
    }
    

  return (
    <div className="wrapper">
    <h2>Create Your Pokemon</h2>
        <div className="sprite-select">
        <div 
            className="arrow"
            style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10,}}
            onClick={() => {
                if(pkval > 1) {
                    setPkval(pkval - 1)
                }
            }}
        ><p>&#8249;</p></div>
        <img src={urlArr[pkalt] + pkval.toString() + '.png'} />
        <div 
            className="arrow"
            style={{borderTopRightRadius: 10, borderBottomRightRadius: 10,}}
            onClick={() => {
                if(pkval < 898) {
                    setPkval(pkval + 1)
                }
            }}
        ><p>&#8250;</p></div>
        </div>
        <button
            className="alt-button"
            onClick={() => {
                if(pkalt == 1) {
                    setPkalt(0)
                } else {
                    setPkalt(1)
                }
            }}
        >Color Swap</button>
        <div className="form-field">
            <p>Name: </p>
            <input type='text' className="pk-input" name="title" value={name} onChange={(name) => {setPkName(name.target.value)}}></input>
        </div>
        <div className="form-field">
            <p>Tagline: </p>
            <input type='text' className="pk-input" name="tagline" value={tag} onChange={(tag) => {setPkTag(tag.target.value)}}></input>
        </div>
        <button
            className="team-button"
            style={{width: '100px'}}
            onClick={() => {
                addPk({
                    variables: {
                      name: pkName,
                      classification: pkTag,
                      id: idFun(),
                      sprite: urlArr[pkalt] + pkval.toString() + '.png'
                    }
                  })
                window.location.reload(false)
            }}
        >Submit</button>

    <div>
        <h2>Latest Entry</h2>
        {data ? 
        <div className="pk-entry" style={edit ? {width: '90%'} : {width: '80%'}}>
            <img src={data.firstPokemon.sprite}></img>
            {edit ? 
            <div>
                <div className="form-field">
                    <p>Name: </p>
                    <input type='text' className="pk-input" name="new-name" value={newName} onChange={(newName) => {setPkNewName(newName.target.value)}}></input>
                </div>
                <div className="form-field">
                    <p>Tagline: </p>
                    <input type='text' className="pk-input" name="new-tag" value={newTag} onChange={(newTag) => {setPkNewTag(newTag.target.value)}}></input>
                </div>
            </div> : 
            <div style={{color: '#000'}}>
                <h3>{data.firstPokemon.id}: {data.firstPokemon.name}</h3>
                <p>{data.firstPokemon.classification}</p>
            </div>}
            <div className="pk-panel">
                <button
                    className="alt-button"
                    onClick={() => {
                        if(!edit) {
                            setEdit(true)
                        } else {
                            updatePk({
                                variables: {
                                  name: nameFun(),
                                  classification: tagFun(),
                                  autoId: data.firstPokemon.autoId,
                                }
                              })
                            window.location.reload(false)
                        }
                    }}
                >{edit ? "Save" : "Edit"}</button>
                <button
                    className="alt-button"
                    onClick={() => {
                        deletePk({
                            variables: {
                              autoId: data.firstPokemon.autoId,
                              id: data.firstPokemon.id
                            }
                          })
                          window.location.reload(false)
                    }}
                >Delete</button>
            </div>
        </div> :
        <h3>No Entries in the Pokédex</h3>}
    </div>

    </div>
  );
}

export default Pokedex;