let firstOperand = '';
let secondOperand = '';
let currentOperator;
const clearButton = document.querySelector('.clear');
const keypad = document.querySelector('.keypad');
const numbers = document.querySelectorAll('.numbers > .button');
const operators = document.querySelectorAll('.operator');
const activeDiv = document.querySelector('.active-area');
const inactiveDiv = document.querySelector('.inactive-area');
const deleteButton = document.querySelector('#delete')
const equalsButton = document.querySelector("#equals-button")
activeDiv.innerText = 0;

numbers.forEach(number => {
  number.addEventListener('mousedown', appendNum)
});

operators.forEach(operator => {
  operator.addEventListener('mousedown', e => {
    firstOperand = parseInt(activeDiv.innerText);
    currentOperator = operator.innerText;
    console.log(firstOperand)
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
  activeDiv.innerText += e.target.innerText;
}

