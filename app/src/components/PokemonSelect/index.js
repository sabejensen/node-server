import React, { useState, useEffect } from 'react';
import './styles.css';
import icon from './pokeball.png';


function PokemonSelect(props) {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api" + props.index.toString())
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [props.index]);

  return (
    <div className="selector">
    <div 
      className="arrow"
      style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10,}}
      onClick={() => {
        if(props.index > 1) {
          props.setIndex(props.index - 1)
        }
      }}
    ><p>&#8249;</p></div>
    <div style={{paddingTop: 5}}>
        {data ? <img src={data.sprites.front_default} /> : null}
        {data ?<p style={{marginTop: -5}}>{capitalize(data.name)}</p>  : <img src={icon} className="icon"/>}
    </div>
    <div 
      className="arrow"
      style={{borderTopRightRadius: 10, borderBottomRightRadius: 10,}}
      onClick={() => {
        if(props.index < 151) {
          props.setIndex(props.index + 1)
        }
      }}
    ><p>&#8250;</p></div>
    </div>
  );
}

export default PokemonSelect;
