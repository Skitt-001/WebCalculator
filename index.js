let number1 = '';
let operand = null;
let displayValue = '';
let shouldResetDisplay = false;

// Math operation functions:
function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}
function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}
function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}
function divide(a, b) {
    if (b === 0) {
        return "Error: Can't divide by zero!";
    } else {
        return parseFloat(a) / parseFloat(b);
    }
}

function setOperator(value) {
    if (number1 === '') {
        number1 = displayValue;
    } else if (shouldResetDisplay) {
        number1 = displayValue;
    } else if (operand) {
        number1 = operate(number1, operand, displayValue);
        displayValue = number1.toString();
    }
    operand = value;
    shouldResetDisplay = true;
}

function operate(a, operand, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operand === "-") {
        return subtract(a, b);
    } else if (operand === "+") {
        return add(a, b);
    } else if (operand === "/") {
        return divide(a, b);
    } else if (operand === "*") {
        return multiply(a, b);
    } else {
        return "Error: Invalid operator!";
    }
}
// Responsible for changing the on screen values
function appendToDisplay(value) {
    const display = document.getElementById("display");
    const operators = ['+', '-', '/', '*'];
    const lastChar = display.value.slice(-1);

    if (operators.includes(lastChar) && operators.includes(value)) {
        return; // Prevent adding another operator
    }

    if (shouldResetDisplay && !operators.includes(value)) {
        displayValue = value;
        shouldResetDisplay = false;
    } else {
        displayValue += value;
    }
    display.value = displayValue;
}
// clears the display
function clearDisplay() {
    displayValue = '';
    number1 = '';
    operand = null;
    document.getElementById("display").value = '';
}

function calculateResult() {
    if (displayValue === '' || number1 === '' || operand === null) {
        return;
    } else {
        const result = operate(number1, operand, displayValue);
        displayValue = result.toString();
        number1 = '';
        operand = null;
        document.getElementById("display").value = displayValue;
        shouldResetDisplay = true;
    }
}
// button selector creation
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendToDisplay(value);
        }
    });
});
