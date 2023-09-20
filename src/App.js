import './App.css';
import MainWrapper from './Components/MainWrapper';
import Display from './Components/Display';
import Button from './Components/Button';
import ButtonWrapper from './Components/ButtonWrapper';
import { useState } from 'react';

const buttonArray = [
  ["C", "+/-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const math = (a, b, operator) => operator === "+" ? a + b : operator === "-" ? a - b : operator === "x" ? a * b : a / b;

const formatFloat = (num) => num.toFixed(3);

const App = () => {
  const [memory, setMemory] = useState({
    number: 0,
    operator: '',
    result: 0,
  })

  // Functionality for the number button(s)
  const numberHandler = (e) => {
    e.preventDefault();
    const input = e.target.innerHTML;

    if (removeSpaces(memory.number).length < 9) {
      setMemory({
        ...memory,
        number:
        // ecks if the preexisting number and digit entered are both 0
        memory.number === 0 && input === "0"
            ? "0"
            // Handles whole numbers
            : removeSpaces(memory.number) % 1 === 0
            ? toLocaleString(Number(removeSpaces(memory.number + input)))
            // Handles decimals
            : toLocaleString(memory.number + input),
        result: !memory.operator ? 0 : memory.result,
      });
    }
  };

  // Functionality for the decimal button
  const decimalHandler = (e) => {
    e.preventDefault();
    const input = e.target.innerHTML;

    setMemory({
      ...memory,
      number: !memory.number.toString().includes(".") ? memory.number + input : memory.number,
    })
  }

  // Functionality for the clear button
  const clearHandler = () => {
    setMemory({
      ...memory,
      number: 0,
      operator: "",
      result: 0,
    })
  }

  // Functionality for the percentage button
  const percentageHandler = () => {
    setMemory({
      ...memory,
      number: memory.number ? (memory.number / 100) : 0,
      operator: "",
      result: memory.result ? (memory.result / 100) : 0,
    })
  }

   // Functionality for the sign switch button
  const signHandler = (e) => {
    setMemory({
      ...memory,
      number: memory.number ? -(memory.number) : 0,
      operator: "",
      result: memory.result ? -(memory.result) : 0,
    })
  }

  // Functionality for the operation button
  const operationHandler = (e) => {
    
    e.preventDefault();

    const input = e.target.innerHTML;
      
    setMemory({
      ...memory,
      number: 0,
      operator: input,
      result: !memory.number ? memory.result : !memory.result ? memory.number
        : toLocaleString(
            math(
              Number(removeSpaces(memory.result)),
              Number(removeSpaces(memory.number)),
              memory.operator
            )
          ),
        
      })

  }

  // Functionality for the solve(=) button
  const solveHandler = (props) => {
    if(memory.result && memory.number) {
      let num1 = parseFloat(memory.number);
      let num2 = parseFloat(memory.result);

      if(memory.operator == 'x') {
        num2 = num1 * num2;
      } else if (memory.operator == '/') {
        if(num1 == 0 || num2 == 0) {
          num2 = 0;
        } else {
          num2 = num2 / num1;
        }
      } else if (memory.operator == '+') {
        num2 = num1 + num2;
        // (-) operation
      } else {
        num2 = num2 - num1;
      }

      console.log(num2);
      if(num2 % 1 == 0) {
        console.log("it isn't a decimal");
      } else {
        console.log("decimal");
      }

      setMemory({
        ...memory,
        number: 0,
        operator: "",
        result: (num2 % 1 == 0) ? num2 : formatFloat(num2),
      })
    }
  }


  return (
    <div className="App">
      <MainWrapper>
        <Display value={memory.number ? memory.number : memory.result} />
        <ButtonWrapper>
          {
            buttonArray.flat().map((button, i) => {
              return ( 
                <Button key={i} className={button === 0 
                  ? "zeroButton" 
                  : button === "C" 
                  ? "topButtons" 
                  : button === "+/-" 
                  ? "topButtons" 
                  :button === "%" 
                  ? "topButtons" 
                  : button === "x" 
                  ? "sideButtons" 
                  : button === "=" 
                  ? "sideButtons" 
                  : button === "/" 
                  ? "sideButtons" 
                  : button === "-" 
                  ? "sideButtons" 
                  : button === "+" 
                  ? "sideButtons" 
                  : ""} value={button} onClick={button === "."
                                                  ? decimalHandler
                                                  : button === "C"
                                                  ? clearHandler
                                                  : button === "%"
                                                  ? percentageHandler
                                                  : button === "+/-"
                                                  ? signHandler
                                                  : button === "+" || button === "-" || button === "/" || button === "x"
                                                  ? operationHandler
                                                  : button === "="
                                                  ? solveHandler
                                                  : numberHandler} />
              );
            })
          }
        </ButtonWrapper>
      </MainWrapper>
      <h1 className="footer"> Created by Ryan Perez </h1>
    </div>
  );
}

export default App;
