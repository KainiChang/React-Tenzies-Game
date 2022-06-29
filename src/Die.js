import React from 'react'

export default function Die(props) {
  const  style={backgroundColor:props.status? "#59E391":"white"} 
  return (
    <div className='die'  onClick={props.hold} style={style}>
      {/* <p>{props.value}</p> */}
      <img className='dots' src={`${props.image}`} alt="dots"/>
    </div>
  )
}
