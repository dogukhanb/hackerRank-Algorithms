Samantha and Sam are playing a numbers game. Given a number as a string, no leading zeros, determine the sum of all integer values of substrings of the string.

Given an integer as a string, sum all of its substrings cast as integers. As the number may become large, return the value modulo .

Example

Here  is a string that has  integer substrings: , , and . Their sum is , and .

Function Description

Complete the substrings function in the editor below.

substrings has the following parameter(s):

string n: the string representation of an integer
Returns

int: the sum of the integer values of all substrings in , modulo 
Input Format

A single line containing an integer as a string, without leading zeros.

Constraints

Sample Input 0

16
Sample Output 0

23
Explanation 0

The substrings of 16 are 16, 1 and 6 which sum to 23.

Sample Input 1

123
Sample Output 1

164
Explanation 1

The substrings of 123 are 1, 2, 3, 12, 23, 123 which sum to 164.

 /* -------------------------- */

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
 * Complete the 'substrings' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING n as parameter.
 */

function substrings(n) {
    const MOD = 1000000007; // Define modulo
    const len = n.length;
    let totalSum = 0;
    let currentContribution = 0;

    for (let i = 0; i < len; i++) {
        const digit = parseInt(n[i]);
        
        // Update the current contribution
        currentContribution = (currentContribution * 10 + digit * (i + 1)) % MOD;

        // Add current contribution to total sum
        totalSum = (totalSum + currentContribution) % MOD;
    }

    return totalSum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = readLine();

    const result = substrings(n);

    ws.write(result + '\n');

    ws.end();
}
