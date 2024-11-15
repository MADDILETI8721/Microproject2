let resultDisplay = document.getElementById('result');
let currentInput = ''; 
let expression = '';   
let lastOperator = ''; 

function updateDisplay(value) {
    resultDisplay.textContent = value;
}

// Number buttons
document.getElementById('btn7').addEventListener('click', () => appendNumber('7'));
document.getElementById('btn8').addEventListener('click', () => appendNumber('8'));
document.getElementById('btn9').addEventListener('click', () => appendNumber('9'));
document.getElementById('btn4').addEventListener('click', () => appendNumber('4'));
document.getElementById('btn5').addEventListener('click', () => appendNumber('5'));
document.getElementById('btn6').addEventListener('click', () => appendNumber('6'));
document.getElementById('btn1').addEventListener('click', () => appendNumber('1'));
document.getElementById('btn2').addEventListener('click', () => appendNumber('2'));
document.getElementById('btn3').addEventListener('click', () => appendNumber('3'));
document.getElementById('btn0').addEventListener('click', () => appendNumber('0'));
document.getElementById('btnDot').addEventListener('click', () => appendDot());

// Operator buttons
document.getElementById('btnAdd').addEventListener('click', () => setOperator('+'));
document.getElementById('btnSubtract').addEventListener('click', () => setOperator('-'));
document.getElementById('btnMultiply').addEventListener('click', () => setOperator('*'));
document.getElementById('btnDivide').addEventListener('click', () => setOperator('/'));

// Equal button
document.getElementById('btnEqual').addEventListener('click', () => calculateResult());

// Delete button
document.getElementById('btnDelete').addEventListener('click', () => deleteLastCharacter());

// Reset button
document.getElementById('btnReset').addEventListener('click', () => resetCalculator());

function appendNumber(number) {            
    if (lastOperator) {
        currentInput = number;
        lastOperator = '';
    } else {
        currentInput += number;
    }
    expression += number;
    updateDisplay(expression);
}

function appendDot() {
    if (!currentInput.includes('.')) {
        currentInput += '.';  
        expression += '.';
        updateDisplay(expression);
    }
}

function setOperator(op) {
    if (currentInput === '') return; 

    if (lastOperator) {          
        expression = expression.slice(0, -2); 
    }

    expression += ' ' + op + ' ';
    lastOperator = op;
    currentInput = ''; 
    updateDisplay(expression);
}

function deleteLastCharacter() {
    if (expression.length === 0) return;

    if (['+', '-', '*', '/'].includes(expression.slice(-2, -1))) {
        lastOperator = ''; 
    }

    expression = expression.slice(0, -1); 
    currentInput = expression.split(' ').pop() || ''; 
    updateDisplay(expression);
}

function resetCalculator() {
    currentInput = '';
    expression = '';
    lastOperator = '';
    updateDisplay('0');
}

function calculateResult() {
    if (currentInput === '' && lastOperator) {
        expression = expression.slice(0, -2); 
    }

    try {
        
        const result = new Function('return ' + expression.replace(/×/g, '*').replace(/÷/g, '/'))();
        expression = result.toString(); 
        updateDisplay(expression);
    } catch (error) {
        expression = 'Error'; 
        updateDisplay(expression);
    }
}
