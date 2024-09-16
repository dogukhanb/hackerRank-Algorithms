Given a time in -hour AM/PM format, convert it to military (24-hour) time.

Note: - 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.
- 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.

Example


Return '12:01:00'.


Return '00:01:00'.

Function Description

Complete the timeConversion function in the editor below. It should return a new string representing the input time in 24 hour format.

timeConversion has the following parameter(s):

string s: a time in  hour format
Returns

string: the time in  hour format
Input Format

A single string  that represents a time in -hour clock format (i.e.:  or ).

Constraints

All input times are valid
Sample Input 0

07:05:45PM
Sample Output 0

19:05:45

/*-------------------------------------------------------*/


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
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {
    // Extract the AM/PM period
    const period = s.slice(-2);
    // Extract the time components
    let [hours, minutes, seconds] = s.slice(0, -2).split(':').map(Number);

    // Convert the hours based on AM/PM
    if (period === 'AM') {
        if (hours === 12) {
            hours = 0; // Midnight case
        }
    } else { // PM case
        if (hours !== 12) {
            hours += 12; // Convert PM hour to 24-hour format
        }
    }

    // Format hours to two digits
    const formattedHours = hours.toString().padStart(2, '0');
    // Return the formatted military time
    return `${formattedHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const s = readLine();
    const result = timeConversion(s);
    ws.write(result + '\n');
    ws.end();
}
