Given the time in numerals we may convert it into words, as shown below:

At , use o' clock. For , use past, and for  use to. Note the space between the apostrophe and clock in o' clock. Write a program which prints the time in words for the input given in the format described.

Function Description

Complete the timeInWords function in the editor below.

timeInWords has the following parameter(s):

int h: the hour of the day
int m: the minutes after the hour
Returns

string: a time string as described
Input Format

The first line contains , the hours portion The second line contains , the minutes portion

Constraints

Sample Input 0

5
47
Sample Output 0

thirteen minutes to six
Sample Input 1

3
00
Sample Output 1

three o' clock
Sample Input 2

7
15
Sample Output 2

quarter past seven


/* -------------------------------- ---------------- */

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'timeInWords' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER h
 *  2. INTEGER m
 */

function timeInWords(h, m) {
    const numberWords = [
        "zero", "one", "two", "three", "four", "five", 
        "six", "seven", "eight", "nine", "ten", 
        "eleven", "twelve", "thirteen", "fourteen", 
        "quarter", "sixteen", "seventeen", "eighteen", 
        "nineteen", "twenty", "twenty one", "twenty two", 
        "twenty three", "twenty four", "twenty five", 
        "twenty six", "twenty seven", "twenty eight", 
        "twenty nine", "thirty"
    ];

    if (m === 0) {
        return `${numberWords[h]} o' clock`;
    } else if (m === 1) {
        return `one minute past ${numberWords[h]}`;
    } else if (m === 59) {
        return `one minute to ${numberWords[h + 1]}`;
    } else if (m === 15) {
        return `quarter past ${numberWords[h]}`;
    } else if (m === 30) {
        return `half past ${numberWords[h]}`;
    } else if (m === 45) {
        return `quarter to ${numberWords[h + 1]}`;
    } else if (m < 30) {
        return `${numberWords[m]} minutes past ${numberWords[h]}`;
    } else {
        return `${numberWords[60 - m]} minutes to ${numberWords[h + 1]}`;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine().trim(), 10);
    const m = parseInt(readLine().trim(), 10);

    const result = timeInWords(h, m);

    ws.write(result + '\n');

    ws.end();
}
