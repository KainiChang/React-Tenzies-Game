import Die from "./Die";
import React from 'react';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default  function App() {
  const imgArray=["./images/1.png","./images/2.png","./images/3.png","./images/4.png","./images/5.png","./images/6.png"]


const [numArray,setNumArray]= React.useState(allNewDice())
const [tenzies, setTenzies]= React.useState(false)
const [number, setNumber]= React.useState(JSON.parse(localStorage.getItem("number"))  || 0)
const [startTime, setStartTime]= React.useState(JSON.parse(localStorage.getItem("startTime"))  || Date.parse(new Date()))
const [endTime, setEndTime]= React.useState(0)

React.useEffect(()=>{
  numArray.every(die=>die.status)&& numArray.every(die=>die.image===numArray[0].image) ?setTenzies(true):setTenzies(false)
}, [numArray])

React.useEffect(() => {
  localStorage.setItem("number", JSON.stringify(number))
}, [number]) 

React.useEffect(() => {
  localStorage.setItem("startTime", JSON.stringify(startTime))
}, )      

React.useEffect(() => {
  setEndTime(Date.parse(new Date()))}, [numArray])    

function allNewDice(){
  const Array=[]

  for(let i=0;i<10;i++){
    Array.push({image:imgArray[Math.floor(Math.random() * 6) ],status:false,id:nanoid()})  
  }
  console.log(Array)  

  return Array
}

    function rollDice(){
      if(!tenzies){
        setNumber(prev=>prev+1)
  
        console.log(startTime)
        console.log(endTime)
        setNumArray(oldArray => oldArray.map(die => {
          return die.status===false?
          {...die, image: imgArray[Math.floor(Math.random() * 6) ], id:nanoid()}:
          die
        }))}
          else{
            setNumber(0)
            setStartTime(Date.parse(new Date()))
            setEndTime(Date.parse(new Date()))
            setNumArray(allNewDice())
            console.log(startTime)
            console.log(endTime)

          }

    }


  function hold(id){
  setNumArray(oldArray => oldArray.map(die => {
    return die.id === id ?
    {...die, status: !die.status} :
    die
    }))
  }


const diceElements = numArray.map(die => <Die image={die.image} hold={()=>hold(die.id)} key={die.id} status={die.status}/>)
// 
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
        <span>number of rolls: {number}</span>
        <span>time used: {(endTime-startTime)/1000}</span>
      </main>
    </div>
  );

}