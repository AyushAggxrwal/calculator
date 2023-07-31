let firstOperand;
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
  {symbol: '+', key: "+", operation: () =>  firstOperand + secondOperand},
  {symbol: '-', key: '-', operation: () => firstOperand - secondOperand},
  {symbol: '✕', key: "*", operation: () => firstOperand * secondOperand},
  {symbol: '÷', key: "/", operation: () => firstOperand / secondOperand},
]

numbers.forEach(number => {
  number.addEventListener('mousedown', appendNum)
});

operators.forEach(operator => {
  operator.addEventListener('mousedown', e => {
    firstOperand = parseInt(activeDiv.innerText);
    currentOperator = operator.innerText;
    inactiveDiv.innerText = firstOperand + currentOperator;
    clear(activeDiv)
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
  if(activeDiv.innerText == 0) clear(activeDiv);
  if(activeDiv.innerText.length <= 9) activeDiv.innerText += e.target.innerText;
}

equalsButton.addEventListener('click', () => {
  const operator = findOperator(currentOperator);
  if(operator) {
    activeDiv.innerText = evalResult(operator);
  }
  currentOperator = undefined;
})

function findOperator (op) {
  return OPERATORS.find(operator => operator.symbol === op);
}

function evalResult(operator) {
  secondOperand = parseInt(activeDiv.innerText);
  if(secondOperand) {
    inactiveDiv.innerText += secondOperand;
    const result = operator.operation()
    firstOperand = result;
    return result;
  }
}

