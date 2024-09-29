let total = 0;
let buffer = '0';
let prevOp;
let histBuffer = '0';

const screen = document.querySelector('.screen');
const histScreen = document.querySelector('.history-screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
    histScreen.innerText = histBuffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            prevOp = null;
            buffer = '0';
            histBuffer = '0';
            total = 0;
            break;
        case '=':
            if(prevOp === null || prevOp === '='){
                return;
            }

            flushOp(parseInt(buffer));
            prevOp = '=';

            if(total < Number.MIN_SAFE_INTEGER || total > Number.MAX_SAFE_INTEGER){
                total = 'OVERFLOW';
                buffer = total;
                histBuffer += " = " + total + " → ";
                total = 0;
            }
            else{
                buffer = total;
                histBuffer += " = " + total + " → ";
                total = 0;
            }
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }
            else{
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '+':
        case '−':
        case '÷':
        case '×':
            handleOp(symbol);
            break;
    }
}

function handleOp(symbol){
    if(buffer === '0'){
        return;
    }
    
    const intBuffer = parseInt(buffer);

    if(total === 0){
        total = intBuffer;
        if(histBuffer === '0'){
            histBuffer = total;
        }
        else{
            histBuffer += total;
        }
    }
    else{
        flushOp(intBuffer);
    }
    prevOp = symbol;
    buffer = '0';
}

function flushOp(intBuffer){
    if(prevOp === '+'){
        total += intBuffer;
        histBuffer += " + " + intBuffer;
    }
    else if(prevOp === '−'){
        total = total - intBuffer;
        histBuffer += " − " + intBuffer;
    }
    else if(prevOp === '×'){
        total = total * intBuffer;
        histBuffer += " × " + intBuffer;
    }
    else if(prevOp === '÷'){
        total = total / intBuffer;
        histBuffer += " ÷ " + intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }
    else{
        if(prevOp === '='){
            prevOp = null;
            buffer = numberString;
            total = 0;
        }
        else{
            buffer += numberString;
        }
    }
}

function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init();