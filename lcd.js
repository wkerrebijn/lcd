/**
 * Created by wkerrebijn on 31-5-2017.
 */

var fontSize;
var fontLines;

var digits = [];

function Digit(symbols) {
    this.symbols = symbols;
    this.getSymbol = function(index) {
        return this.symbols[index];
    }
}

const zero  = new Digit([" _ ",
                         "| |",
                         "| |",
                         "| |",
                         "|_|"]);
const one   = new Digit(["   ",
                         " | ",
                         " | ",
                         " | ",
                         " | "]);
const two   = new Digit([" _ ",
                         "  |",
                         " _|",
                         "|  ",
                         "|_ "]);
const three = new Digit([" _ ",
                         "  |",
                         " _|",
                         "  |",
                         " _|"]);
const four  = new Digit(["   ",
                         "| |",
                         "|_|",
                         "  |",
                         "  |"]);
const five  = new Digit([" _ ",
                         "|  ",
                         "|_ ",
                         "  |",
                         " _|"]);
const six   = new Digit([" _ ",
                         "|  ",
                         "|_ ",
                         "| |",
                         "|_|"]);
const seven = new Digit([" _ ",
                         "  |",
                         "  |",
                         "  |",
                         "  |"]);
const eight = new Digit([" _ ",
                         "| |",
                         "|_|",
                         "| |",
                         "|_|"]);
const nine  = new Digit([" _ ",
                         "| |",
                         "|_|",
                         "  |",
                         " _|"]);
const colon = new Digit(["   ",
                         " * ",
                         "   ",
                         " * ",
                         "   "]);

digits.push(zero);
digits.push(one);
digits.push(two);
digits.push(three);
digits.push(four);
digits.push(five);
digits.push(six);
digits.push(seven);
digits.push(eight);
digits.push(nine);
digits.push(colon);

var now;
var hours;
var minutes;
var seconds;
var milliseconds;

function addPrefixZero(digit) {
    if(digit.toString().length < 2) {
        return "" + 0 + digit;
    }
    return digit;
}

function convertTimeToASCII(timeString) {
    var timeLine = "";
    for(var lineNumber = 0 ; lineNumber < fontLines ; lineNumber++) {
        for (var i = 0 ; i < timeString.length ; i++) {
            timeLine += getDigitASCIILine(timeString[i], lineNumber);
        }
        digits.push(timeLine);
        timeLine = "";
    }
}

function getDigitASCIILine(digit, lineNumber) {
    switch(digit) {
        case "0" :  if(lineNumber === 0) {
                        return " _ ";
                    } else
                    if(lineNumber === 1) {
                        return "| |";
                    } else
                    if(lineNumber === 2) {
                        return "|_|";
                    }
                    break;
        case "1" :  if(lineNumber === 0) {
                        return " ";
                    } else
                    if(lineNumber === 1) {
                        return "|";
                    } else
                    if(lineNumber === 2) {
                        return "|";
                    }
                    break;
        case "2" :  if(lineNumber === 0) {
                        return " _ ";
                    } else
                    if(lineNumber === 1) {
                        return " _|";
                    } else
                    if(lineNumber === 2) {
                        return "|_ ";
                    }
                    break;
        case "3" :  if(lineNumber === 0) {
                        return " _ ";
                    } else
                    if(lineNumber === 1) {
                        return " _|";
                    } else
                    if(lineNumber === 2) {
                        return " _|";
                    }
                    break;
        case "4" :  if(lineNumber === 0) {
                        return "   ";
                    } else
                    if(lineNumber === 1) {
                        return "|_|";
                    } else
                    if(lineNumber === 2) {
                        return "  |";
                    }
                    break;
        case "5" :  if(lineNumber === 0) {
                        return " _ ";
                    } else
                    if(lineNumber === 1) {
                        return "|_ ";
                    } else
                    if(lineNumber === 2) {
                        return " _|";
                    }
                    break;
        case "6" :  if(lineNumber === 0) {
                        return " _ ";
                    } else
                    if(lineNumber === 1) {
                        return "|_ ";
                    } else
                    if(lineNumber === 2) {
                        return "|_|";
                    }
                    break;
        case "7" :  if(lineNumber === 0) {
                        return " _ ";
                    } else
                    if(lineNumber === 1) {
                        return "  |";
                    } else
                    if(lineNumber === 2) {
                        return "  |";
                    }
                    break;
        case "8" :  if(lineNumber === 0) {
                        return " _ ";
                    } else
                    if(lineNumber === 1) {
                        return "|_|";
                    } else
                    if(lineNumber === 2) {
                        return "|_|";
                    }
                    break;
        case "9" :  if(lineNumber === 0) {
                        return " _ ";
                    } else
                    if(lineNumber === 1) {
                        return "|_|";
                    } else
                    if(lineNumber === 2) {
                        return " _|";
                    }
                    break;
        case ":" :  if(lineNumber === 0) {
                        return "   ";
                    } else
                    if(lineNumber === 1) {
                        return " * ";
                    } else
                    if(lineNumber === 2) {
                        return " * ";
                    }
                        break;
    }
}

function initializeClock() {
    now = new Date();

    hours = addPrefixZero(now.getHours());
    minutes = addPrefixZero(now.getMinutes());
    seconds = addPrefixZero(now.getSeconds());
    milliseconds = now.getMilliseconds();

    synchronizeClock();
}

function synchronizeClock() {
    setTimeout(function() {
        console.log("Synchronizing clock...");
        seconds++;
    }, 1000 - (milliseconds-1));
}

function updateClock() {
    var repeats = 0;

    setInterval(function() {
        seconds++;
        if(seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        if(minutes >= 60) {
            minutes = 0;
            hours++;
        }
        if(hours >= 24) {
            hours = 0;
        }

        var timeToASCII = "" + addPrefixZero(hours) + ":" + addPrefixZero(minutes) + ":" + addPrefixZero(seconds);

        convertTimeToASCII(timeToASCII);

        printClock();

        repeats++;

        if(repeats % 10 == 0) {
            initializeClock();
        }
    }, 1000);
}

function printClock() {
    for(var i = 0 ; i < digits.length ; i++) {
        console.log(digits[i]);
    }
}

function printDigit(digit) {
    for(var i = 0 ; i < digit.symbols.length ; i++) {
        console.log(digit.getSymbol(i));
    }
}

function printDigits() {
    for(var i = 0 ; i < digits.length ; i++) {
        printDigit(digits[i]);
    }
}

function main() {
    fontSize = 1;
    fontLines = fontSize*2 + 1;

    initializeClock();

    updateClock();
}

main();