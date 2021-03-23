import React, { useState, useEffect } from 'react';


function TeamSprite(props) {

    const [img, setImg] = useState(false)

    useEffect(() => {
            fetch("/api" + props.index)
            .then((res) => res.json())
            .then((data) => {
                let rng = (Math.floor(Math.random() * 40) + 1); 
                if(rng == 40 && data.sprites.front_shiny) {
                    setImg(data.sprites.front_shiny)
                } else {
                    setImg(data.sprites.front_default)
                }
            })
        
      }, []);

  return (
    <>  
        {img ? <img src={img} /> : null}
    </>
  );
}

export default TeamSprite;