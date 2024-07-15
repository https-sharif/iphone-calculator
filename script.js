const buttons = document.querySelectorAll('.buttons');
const equationDisplay = document.getElementById('equation');
const answer = document.getElementById('answer');
let timeoutActive = false;

function solveEquation(equation) {
    try {
        const result = eval(equation);
        if (Number.isInteger(result)) {
            return result.toString();
        } else {
            return result.toFixed(9).replace(/\.?0+$/, '');
        }
    } catch (error) {
        return null;
    }
}

function displayError() {
    if (!timeoutActive) {
        equationDisplay.classList.add('vibrate');
        timeoutActive = true;

        setTimeout(() => {
            equationDisplay.classList.remove('vibrate');
            timeoutActive = false;
        }, 300);
    }
}

function clearScreen() {
    equationDisplay.textContent = '';
    answer.textContent = '';
}

function handleButtonClick(buttonValue) {
    if (timeoutActive) return;
    switch (buttonValue) {
        case 'AC':
            clearScreen();
            break;
        case 'del':
            equationDisplay.textContent = equationDisplay.textContent.slice(0, -1);
            break;
        case '=':
            if(equationDisplay.textContent.length == 0){
                answer.textContent = equationDisplay.textContent;
                return;
            }
            const result = solveEquation(equationDisplay.textContent);
            if (result === null) {
                displayError();
            } else {
                answer.textContent = result;
            }
            break;
        default:
            if(equationDisplay.textContent.length > 10){
                break;
            }
            equationDisplay.textContent += buttonValue;
            break;
    }
}

function handleKeyboardInput(event) {
    const key = event.key;
    const allowedKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '+', '-', '*', '/', '%', '.', '=', 'Enter', 'Backspace', 'Delete', 'C', 'c'
    ];

    if (timeoutActive || !allowedKeys.includes(key)) {
        return;
    }

    event.preventDefault();

    switch (key) {
        case 'Backspace':
        case 'Delete':
            handleButtonClick('del');
            break;
        case 'Enter':
        case '=':
            handleButtonClick('=');
            break;
        case 'C':
        case 'c':
            clearScreen();
            break;
        default:
            handleButtonClick(key);
            break;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

document.addEventListener('keydown', handleKeyboardInput);

function myFunction(x) {
    x.classList.toggle("change");
}

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('menu-button');
    const popup = document.getElementById('popup');

    toggleButton.addEventListener('click', function () {
        popup.classList.toggle('show');
    });
});
console.log('Project By Shariful Islam');
console.log()
