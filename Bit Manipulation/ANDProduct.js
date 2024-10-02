Consider two non-negative long integers,  and , where . The bitwise AND of all long integers in the inclusive range between  and  can be expressed as , where  is the bitwise AND operator.

Given  pairs of long integers,  and , compute and print the bitwise AND of all natural numbers in the inclusive range between  and .

For example, if  and , the calculation is .

Function Description

Complete the andProduct in the editor below. It should return the computed value as an integer.

andProduct has the following parameter(s):

a: an integer
b: an integer
Input Format

The first line contains a single integer , the number of intervals to test.
Each of the next  lines contains two space-separated integers  and .

Constraints

Output Format

For each pair of long integers, print the bitwise AND of all numbers in the inclusive range between  and  on a new line.

Sample Input 0

3
12 15
2 3
8 13
Sample Output 0

12
2
8
Explanation 0

There are three pairs to compute results for:

 and 
, so we print  on a new line.
 and 
 and 
Sample Input 1

2
17 23
11 15
Sample Output 1

16
8

 /* --------------------------------- */

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
 * Complete the 'andProduct' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER a
 *  2. LONG_INTEGER b
 */

function andProduct(a, b) {
    let shiftCount = 0;

    // Find the common prefix
    while (a < b) {
        a >>= 1; // Shift right
        b >>= 1; // Shift right
        shiftCount++; // Count the number of shifts
    }

    // Shift back the common prefix to its original position
    return a << shiftCount;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    for (let nItr = 0; nItr < n; nItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const a = parseInt(firstMultipleInput[0], 10);
        const b = parseInt(firstMultipleInput[1], 10);

        const result = andProduct(a, b);

        ws.write(result + '\n');
    }

    ws.end();
}
