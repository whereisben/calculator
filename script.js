/*
CALCULATOR LOGIC:
Create three variables for first number, operation, second number.

Create an operate function that takes variables and computes output

Assign Click event listeners to detect numbers and automatically assigns 
value to firstValue var when operation is detected

Take firstValue array and .join'' it and set to display text content, 
when detecting secondValue, reset display text content
and start displaying secondValue array .join''


Assign operation to operation var when detected

Automatically assign value to secondValue until return or another 
operation is detected

On return or another operation, automatically execute operate func on
var 

If attempting another operation, save result of operation to first number 
assign operation to operation val

CLEAR ALL VARIABLES ON CLEAR; set pointer back to firstValue var


*/
const numPad = document.querySelector('.numPad');
const display = document.querySelector('.display')

const firstValue = [];
const secondValue = [];
const operation = [];
let result = 0;

const operate = function(firstValue, secondValue, operation) {
    switch (operation) {
        case '+':
            return Number((firstValue + secondValue).toFixed(8));
        case '-':
            return Number((firstValue - secondValue).toFixed(8));
        case ('*'):
            return Number((firstValue * secondValue).toFixed(8));
        case ('/'):
            return Number((firstValue / secondValue).toFixed(8));
    }
}

numPad.addEventListener('click', function(e) {
    if (operation.length === 0 && e.target.classList[0] === 'number') {
        if (e.target.id === 'decimal' && !firstValue.includes('.') && firstValue.length < 9) {
            firstValue.push('.');
            display.textContent = firstValue.join('');
        }

        if (e.target.id !== 'decimal' && firstValue.length < 9) {
            firstValue.push(e.target.id);
            display.textContent = Number(firstValue.join(''));
        }
    }   

    if (e.target.classList[0] === 'operation' && secondValue.length === 0) {
        operation.pop()
        switch (e.target.id) {
            case 'divide':
                operation.push('/');
                break;
            case 'multiply':
                operation.push('*');
                break;
            case 'add':
                operation.push('+');
                break;
            case 'subtract':
                operation.push('-');
                break;
        }
    }

    if (operation.length === 1 && firstValue.length !== 0 && e.target.classList[0] === 'number') {
        if (e.target.id === 'decimal' && !secondValue.includes('.') && secondValue.length < 9) {
            secondValue.push('.');
            display.textContent = secondValue.join('');
        }

        if (e.target.id !== 'decimal' && secondValue.length < 9) {
            secondValue.push(e.target.id);
            display.textContent = Number(secondValue.join(''));
        }
    }

    if (e.target.classList[0] === 'operation' && secondValue.length !== 0) {
        result = operate(Number(firstValue.join('')), Number(secondValue.join('')), operation[0]);

        if (result === Infinity) {
            firstValue.length = 0;
            secondValue.length = 0;
            display.textContent = 'undefined';
        }

        if (String(result).length > 9 && result !== Infinity) {
            firstValue.length = 0;
            secondValue.length = 0;
            firstValue.push(result);
            result = result.toExponential(3);
            display.textContent = result;
        }
        if (String(result).length <= 9 && result !== Infinity) {
            firstValue.length = 0;
            secondValue.length = 0;
            firstValue.push(result);
            display.textContent = result;
        }
    }
    

    if (e.target.id === 'clear') {
        operation.length = 0;
        firstValue.length = 0;
        secondValue.length = 0;
        display.textContent = ''
    }
})


/*

CASE 1
if operation is empty, append to firstValue,  DONE
CASE2
if firstValue and operation is full, append to secondValue, AND
e.target.classList[0] = 'number'

CASE3 if e.target.classList[0] = 'operation' and secondValue is empty;
change operation [] DONE

CASE 4 if e.target.classList[0] = 'operation' and secondVal full and e.targ;
execute operate() and display and change operation. Set result to firstValue




*/