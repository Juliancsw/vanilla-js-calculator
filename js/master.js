var hasDecimal = false;
var isCleared = true;
var operation = "";
var currentBalance = 0;
var mantissa = 0;
var isNeg = false;

var otherBalance = 0;
var otherMantissa = 0;
var hasOtherDecimal = false;
var isOtherNeg = false;

var hasPercent = false;

document.addEventListener('click', function (event) {

	if (!event.target.matches('.button')) return;

    console.log(event.target);
    
    switch(event.target.value){
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            isCleared = false;
            handleNumber(event.target.value);
            break;
        case "ac":
            handleClear();
            break;
        case ".":
            isCleared = false;
            handleDecimal();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            handleOperation(event.target.value);
            break;

        case "%":
            hasPercent = true;
        case "=":
            handleEquals();
            break;
        case "+/-":
            isCleared = false;
            handlePosNeg();
            break;
    }

    hasPercent = false;
    checkCleared()    

}, false);


function handleOperation(value){
    if(operation){
        handleEquals();
    }
    operation = value
}

function handlePosNeg(){
    if(operation){
        isOtherNeg = !isOtherNeg
        displayOther();
    }else{
        isNeg = !isNeg
        displayCurrent();
    }
}

function handleClear(){
    hasDecimal = false;
    isCleared = true;
    operation = "";
    currentBalance = 0;
    mantissa = 0
    isNeg = false;

    otherBalance = 0;
    otherMantissa = 0;
    hasOtherDecimal = false;
    isOtherNeg = false;

    document.getElementById("resultText").innerHTML = currentBalance;
}

function handleEquals() {
    if(operation){
        var total = parseFloat((currentBalance + "." + mantissa));
        var other = parseFloat((otherBalance + "." + otherMantissa));
        other = hasPercent ? ((other/100)*total) : other;
        switch(operation){
            case "+":
                total += other;
                break;
            case "-":
                total -= other;
                break;
            case "*":
                total *= other;
                break;
            case "/":
                total /= other;
                break;
        }


        const totalArray = total.toString().split(".")
        currentBalance = parseInt(total)
        mantissa = totalArray[1] ? totalArray[1] : 0
        hasDecimal = (mantissa != 0)
        
        operation = ""
        otherBalance = 0;
        otherMantissa = 0;
        hasOtherDecimal = false;

        displayCurrent();
    }
}

function displayCurrent(){
    const negSymbol = isNeg ? "-" : ""
    if(!hasDecimal){
        document.getElementById("resultText").innerHTML = negSymbol + currentBalance;
    } else {
        document.getElementById("resultText").innerHTML = negSymbol + currentBalance + "." + mantissa;
    }
}

function displayOther(){
    const negSymbol = isOtherNeg ? "-" : ""
    if(!hasOtherDecimal){
        document.getElementById("resultText").innerHTML = negSymbol + otherBalance;
    } else {
        document.getElementById("resultText").innerHTML = negSymbol + otherBalance + "." + otherMantissa;
    }
}

function handleNumber(value){
    value = parseInt(value)
    if(operation){
        if(!hasOtherDecimal){
            otherBalance = (otherBalance*10) + value;
        } else {
            otherMantissa = (otherMantissa*10) + value;
        }
        displayOther();
    }else{
        if(!hasDecimal){
            currentBalance = (currentBalance*10) + value;
        }else {
            mantissa = (mantissa*10) + value;
        }
        displayCurrent();
    }
}

function checkCleared(){
    if(!isCleared){
        document.getElementById("clear").innerHTML = "C"
    }else{
        document.getElementById("clear").innerHTML = "AC"
    }
}

function handleDecimal(){
    if(operation){
        if(!hasOtherDecimal){
            hasOtherDecimal = true
            document.getElementById("resultText").innerHTML = otherBalance + "."
        } 
    }else{
        if(!hasDecimal){
            hasDecimal = true
            document.getElementById("resultText").innerHTML = currentBalance + "."
        }
    }
}