let firstOperand = 0;
let secondOperand;
let currentOperator;
const clearButton = document.querySelector('.clear');
const keypad = document.querySelector('.keypad');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const activeDiv = document.querySelector('.active-area');
const inactiveDiv = document.querySelector('.inactive-area');
const deleteButton = document.querySelector('#delete')
const equalsButton = document.querySelector("#equals-button")
activeDiv.innerText = 0;

const OPERATORS = [
  {symbol: '+', key: "+", operation: add},
  {symbol: '-', key: '-', operation: subtract},
  {symbol: '✕', key: "*", operation: multiply},
  {symbol: '÷', key: "/", operation: divide},
]

numbers.forEach(number => {
  number.addEventListener('mousedown', appendNum)
});

operators.forEach(operator => {
  operator.addEventListener('mousedown', e => {
    if(activeDiv.innerText != undefined && !isNaN(parseFloat(activeDiv.innerText))) {
      if(operatorPresent()) evalResult();
      firstOperand = parseFloat(activeDiv.innerText);
      currentOperator = operator.innerText;
      inactiveDiv.innerText = activeDiv.innerText + currentOperator;
      clear(activeDiv)
    }
  })
});

clearButton.addEventListener('click', () => { 
  clear(inactiveDiv);
  clear(activeDiv);
})

function clear(div) {
  div.innerText = '';
}

deleteButton.addEventListener('mousedown', del)

function del() {
  activeDiv.innerText = activeDiv.innerText.slice(0, -1);
}

function appendNum (e) {
  if(parseFloat(activeDiv.innerText) === 0) clear(activeDiv);
  if(activeDiv.innerText.length <= 9) activeDiv.innerText += e.target.innerText;
}

equalsButton.addEventListener('click', evalResult)

function findOperator (op) {
  return OPERATORS.find(operator => operator.symbol === op);
}

function evalResult() {
  if(activeDiv.innerText == undefined || isNaN(parseFloat(activeDiv.innerText))){
    activeDiv.innerText = firstOperand;
  }
  const operator = findOperator(currentOperator);
  if (operator) {
    secondOperand = parseFloat(activeDiv.innerText);
    inactiveDiv.innerText += activeDiv.innerText;
    const result = operator.operation();
    activeDiv.innerText = result;
    firstOperand = result;
  }
  currentOperator = undefined;
}

const plusMinus = document.getElementById("plus-minus")
plusMinus.addEventListener('click', additiveInverse)

function additiveInverse() {
  let target = activeDiv.innerText;
  if (target != 0) {
    target *=  -1;
    activeDiv.innerText = target;
  }
} 



function add() {
  return firstOperand + secondOperand;
}

function subtract() {
  return firstOperand - secondOperand;
}

function multiply() {
  return firstOperand * secondOperand;
}

function divide() {
  if(secondOperand === 0) {
    return 'Error';
  }
 return firstOperand / secondOperand; 
}

function operatorPresent() {
  return (inactiveDiv.innerText.includes('+')
  || inactiveDiv.innerText.includes('-')
  || inactiveDiv.innerText.includes("✕")
  || inactiveDiv.innerText.includes("÷"))
}

const point = document.getElementById('point')
function appendPoint() {
  if(activeDiv.innerText.includes('.')) return;
  activeDiv.innerText += '.'
}
point.addEventListener('click', appendPoint)
