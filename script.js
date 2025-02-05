// Select all relevant elements
const answerDisplay = document.querySelector(".answer");
const buttons = document.querySelectorAll("button");

// Initialize variables to track the calculator's state
let currentInput = ""; // Stores the current number being entered
let previousInput = ""; // Stores the previous number in the calculation
let operator = null; // Stores the current operator (+, -, *, /)
let shouldReset = false; // Tracks whether the display should reset after an operation

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});

// Handle button clicks
function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if (isDigit(buttonValue)) {
        handleDigit(buttonValue);
    } else if (isOperator(buttonValue)) {
        handleOperator(buttonValue);
    } else if (buttonValue === "=") {
        handleEquals();
    } else if (buttonValue === ".") {
        handleDecimal();
    }
}

// Check if a character is a digit
function isDigit(char) {
    return /^\d$/.test(char);
}

// Check if a character is an operator
function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

// Handle digit button press
function handleDigit(digit) {
    if (shouldReset) {
        currentInput = ""; // Reset the current input if needed
        shouldReset = false;
    }
    currentInput += digit; // Append the digit to the current input
    updateDisplay();
}

// Handle operator button press
function handleOperator(newOperator) {
    if (currentInput === "") return; // Do nothing if no number is entered yet

    if (previousInput !== "") {
        calculateResult(); // Perform the previous calculation if needed
    }

    operator = newOperator; // Set the new operator
    previousInput = currentInput; // Store the current input as the previous input
    currentInput = ""; // Reset the current input for the next number
}

// Handle equals button press
function handleEquals() {
    if (previousInput === "" || currentInput === "" || operator === null) return;

    calculateResult(); // Perform the calculation
    operator = null; // Reset the operator
    shouldReset = true; // Prepare to reset the display on the next input
}

// Handle decimal button press
function handleDecimal() {
    if (shouldReset) {
        currentInput = ""; // Reset the current input if needed
        shouldReset = false;
    }
    if (!currentInput.includes(".")) {
        currentInput += "."; // Add a decimal point if not already present
        updateDisplay();
    }
}

// Perform the calculation
function calculateResult() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString(); // Update the current input with the result
    previousInput = ""; // Clear the previous input
    updateDisplay();
}

// Update the display with the current input
function updateDisplay() {
    answerDisplay.textContent = currentInput || "0"; // Show "0" if the input is empty
}