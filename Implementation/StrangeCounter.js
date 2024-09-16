There is a strange counter. At the first second, it displays the number . Each second, the number displayed by decrements by  until it reaches . In next second, the timer resets to  and continues counting down. The diagram below shows the counter values for each time  in the first three cycles:

strange(1).png

Find and print the value displayed by the counter at time .

Function Description

Complete the strangeCounter function in the editor below.

strangeCounter has the following parameter(s):

int t: an integer
Returns

int: the value displayed at time 
Input Format

A single integer, the value of .

Constraints

Subtask

 for  of the maximum score.
Sample Input

4
Sample Output

6
Explanation

Time  marks the beginning of the second cycle. It is double the number displayed at the beginning of the first cycle:. This is shown in the diagram in the problem statement.


/* ---------------------------------------------------------- */


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
 * Complete the 'strangeCounter' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER t as parameter.
 */
function strangeCounter(t) {
    let cycleStart = 1;  // Starting point of the cycle
    let cycleLength = 3; // Length of the first cycle
    let value = 3;       // Initial value of the first cycle

    // Find the cycle that contains time t
    while (t > cycleStart + cycleLength - 1) {
        cycleStart += cycleLength;
        cycleLength *= 2;
        value *= 2;
    }

    // Calculate the exact value at time t
    let elapsed = t - cycleStart;
    return value - elapsed;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    const result = strangeCounter(t);

    ws.write(result + '\n');

    ws.end();
}
