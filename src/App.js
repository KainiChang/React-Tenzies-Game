import Die from "./Die";
import React from 'react';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default  function App() {

const [numArray,setNumArray]= React.useState(allNewDice())
const [tenzies, setTenzies]= React.useState(false)

React.useEffect(()=>{
  numArray.every(die=>die.status)&& numArray.every(die=>die.value===numArray[0].value) ?setTenzies(true):setTenzies(false)
}, [numArray])

function allNewDice(){
  const Array=[]

  for(let i=0;i<10;i++){
    Array.push({value:Math.floor((Math.random() * 6) + 1),status:false,id:nanoid()})    
  }
  return Array
}

    function rollDice(){
      if(!tenzies){
        setNumArray(oldArray => oldArray.map(die => {
          return die.status===false?
          {...die, value: Math.floor((Math.random() * 6) + 1), id:nanoid()}:
          die
        }))}
          else{
            setNumArray(allNewDice())
          }
    }


  function hold(id){
  setNumArray(oldArray => oldArray.map(die => {
    return die.id === id ?
    {...die, status: !die.status} :
    die
    }))
  }


const diceElements = numArray.map(die => <Die value={die.value} hold={()=>hold(die.id)} key={die.id} status={die.status}/>)

  return (
    <div className="App">
        {tenzies && <Confetti />}
      <main>
        <h2>Tenzies</h2>
        <p className="des">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice">
          {diceElements}
        </div>
        <button onClick={rollDice} className="rollBtn">{tenzies?"New Game":"Roll"}</button>
      </main>
    </div>
  );

}