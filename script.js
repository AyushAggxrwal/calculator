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
const percent = document.getElementById("percent")
const point = document.getElementById('point')
const plusMinus = document.getElementById("plus-minus")



const OPERATORS = [
  {symbol: '+', key: "+", operation: add},
  {symbol: '-', key: '-', operation: subtract},
  {symbol: '✕', key: "*", operation: multiply},
  {symbol: '÷', key: "/", operation: divide},
]

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


numbers.forEach(number => {
  number.addEventListener('mousedown', appendNum)
});
function appendNum (e) {
  if(parseFloat(activeDiv.innerText) === 0 && !activeDiv.innerText.includes('.')) clear(activeDiv);
  if(activeDiv.innerText.length < 9) activeDiv.innerText += e.target.innerText;
}


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

function operatorPresent() {
  return (inactiveDiv.innerText.includes('+')
  || inactiveDiv.innerText.includes('-')
  || inactiveDiv.innerText.includes("✕")
  || inactiveDiv.innerText.includes("÷"))
}


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


function findOperator (op) {
  return OPERATORS.find(operator => operator.symbol === op);
}

equalsButton.addEventListener('click', evalResult)
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
    convertToScientificNotation();
  }
  currentOperator = undefined;
}
function convertToScientificNotation() {
  if (activeDiv.innerText.length > 9) {
    const afterDecimal = activeDiv.innerText.length - 1;
    activeDiv.innerText = (activeDiv.innerText / (10 ** afterDecimal));
    activeDiv.innerText = `${activeDiv.innerText.slice(0, 6)}E+${afterDecimal}`;
/* afterDecimal gives the number of digits after the first digit so that 
the first digit and the digits afterwards are separated by period '.'*/
  }
}

plusMinus.addEventListener('click', additiveInverse)
function additiveInverse() {
  let targetNum = activeDiv.innerText;
  if (targetNum != 0) {
    targetNum *=  -1;
    activeDiv.innerText = targetNum;
  }
} 


point.addEventListener('click', appendPoint)
function appendPoint() {
  if(activeDiv.innerText.includes('.')) return;
  if(activeDiv.innerText == '') activeDiv.innerText = 0;
  activeDiv.innerText += '.'
}


percent.addEventListener('click', findPercentage)
function findPercentage() {
  activeDiv.innerText /= 100;
  if(currentOperator == '-') activeDiv.innerText = (activeDiv.innerText * firstOperand);
  if(currentOperator == '+') activeDiv.innerText = (activeDiv.innerText * firstOperand);
}

