import React from 'react'

export default function Die(props) {
  const  style={backgroundColor:props.status? "#59E391":"white"} 
  return (
    <div className='die'  onClick={props.hold} style={style}>
      <h3>{props.value}</h3>
    </div>
  )
}
//