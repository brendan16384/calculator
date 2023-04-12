import React from "react";
import './App.css';
import NumButton from "./components/NumButton";

let calculating = false;
let newNumNext = false;
let value = 0;
let operator;

function App() {
  const [display, setDisplay] = React.useState(0);

  function updateDisplay(num) {
    if(newNumNext){
      value=Number(display);
      setDisplay(num);
      newNumNext=false;
    }
    else if(String(display).includes(".")){
      setDisplay(String(display) + String(num));
    }
    else{
      Number(display)===0 ? setDisplay(num) : setDisplay(String(display) + String(num));
    }
  }

  function clear() {
    setDisplay(0);
    calculating = false;
    newNumNext = false;
  }

  function operation(op) {
    if(calculating){
      if(operator === "+") {
        setDisplay(value+Number(display));
        operator = op;
        newNumNext = true;
      }
      else if(operator === "-") {
        setDisplay(value-Number(display));
        operator = op;
        newNumNext = true;
      }
      else if(operator === "*") {
        setDisplay(value*Number(display));
        operator = op;
        newNumNext = true;
      }
      else if(operator === "/") {
        setDisplay(value/Number(display));
        operator = op;
        newNumNext = true;
      }
      if(op === "="){
        calculating = false;
      }
    }
    else if(!(op === "=")){
      calculating = true;
      operator = op;
      value = Number(display);
      setDisplay(0);
      newNumNext=false;
    }
  }

  const digits = [1,2,3,4,5,6,7,8,9,0].map((num) => {
    return(
      <NumButton
        key = {num}
        num = {num}
        func = {((n)=>{updateDisplay(n)})}
      />
    );
  });

  return (
    <div className="calculator">
      <input type="text" className="calculator-screen" value={display} disabled/>
      <div className="calculator-keys">
        <button onClick = {event => operation("+")} className="operator" type="button">+</button>
        <button onClick = {event => operation("-")} className="operator" type="button">-</button>
        <button onClick = {event => operation("*")} className="operator" type="button">&times;</button>
        <button onClick = {event => operation("/")} className="operator" type="button">&divide;</button>
        {digits}
        <button onClick = {event => String(display).includes(".")? null : setDisplay(display+".")} className="decimal" type="button">.</button>
        <button onClick = {event => clear()} className="all-clear" type="button">AC</button>
        <button onClick = {event => operation("=")} className="operator" id="equal-sign" type="button">=</button>
      </div>
    </div>
  );
}

export default App;