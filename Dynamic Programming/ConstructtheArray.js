Your goal is to find the number of ways to construct an array such that consecutive positions contain different values.

Specifically, we want to construct an array with  elements such that each element between  and , inclusive. We also want the first and last elements of the array to be  and .

Given ,  and , find the number of ways to construct such an array. Since the answer may be large, only find it modulo .

For example, for , , , there are  ways, as shown here:

image

Complete the function countArray which takes input ,  and . Return the number of ways to construct the array such that consecutive elements are distinct.

Constraints

Subtasks

For  of the maximum score,  and 
Sample Input

, , 

Sample Output


Explanation

Refer to the diagram in the challenge statement.

 /* ------------------------- */

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
 * Complete the 'countArray' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER x
 */

const MOD = 1000000007;

function countArray(n, k, x) {
    if (n === 1) {
        return 1; // Only one way to create an array with a single element x
    }
    
    const waysForFirst = k - 1; // Choices for the first element in the middle
    const waysForMiddle = modPow(waysForFirst, n - 2, MOD); // Choices for the remaining elements
    return waysForMiddle;
}

function modPow(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) { // If exp is odd
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2); // Divide exp by 2
        base = (base * base) % mod; // Square the base
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);
    const x = parseInt(firstMultipleInput[2], 10);

    const answer = countArray(n, k, x);

    ws.write(answer + '\n');
    ws.end();
}
