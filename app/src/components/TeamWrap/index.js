import React, { useState, useEffect } from 'react';
import './styles.css';

import TeamListing from '../TeamListing/index'


function TeamWrap() {

    const [data, setData] = useState(false)

    useEffect(() => {
        fetch("/new-team")
          .then((res) => res.json())
          .then((data) => setData(data))
      }, []);


  return (
    <div className="select-wrapper">
        {data.length > 0 ? <>
            {data.map((team, i) => {
                return (
                    <TeamListing name={team.name} team={team.team} key={i} id={team._id} />
                )
            })}
        </>
        : <h3>No Teams Found</h3>}
    </div>
  );
}

export default TeamWrap;