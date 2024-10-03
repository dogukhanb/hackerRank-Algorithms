Implement a modified Fibonacci sequence using the following definition:

Given terms  and  where , term  is computed as:

Given three integers, , , and , compute and print the  term of a modified Fibonacci sequence.

Example



Return .

Function Description

Complete the fibonacciModified function in the editor below. It must return the  number in the sequence.

fibonacciModified has the following parameter(s):

int t1: an integer
int t2: an integer
int n: the iteration to report
Returns

int: the  number in the sequence
Note: The value of  may far exceed the range of a -bit integer. Many submission languages have libraries that can handle such large results but, for those that don't (e.g., C++), you will need to compensate for the size of the result.

Input Format

A single line of three space-separated integers, the values of , , and .

Constraints

 may far exceed the range of a -bit integer.
Sample Input

0 1 5
Sample Output

5
Explanation

The first two terms of the sequence are  and , which gives us a modified Fibonacci sequence of . The  term is .

/* -------------------------------------- */

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
 * Complete the 'fibonacciModified' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER t1
 *  2. INTEGER t2
 *  3. INTEGER n
 */

function fibonacciModified(t1, t2, n) {
    // Convert t1 and t2 to BigInt for handling large numbers
    let a = BigInt(t1);
    let b = BigInt(t2);
    
    if (n === 1) return a; // If n is 1, return t1
    if (n === 2) return b; // If n is 2, return t2

    let fn;
    for (let i = 3; i <= n; i++) {
        fn = a + (b * b); // F(n) = F(n-2) + F(n-1)^2
        a = b; // Move to the next term
        b = fn; // Update b to the newly computed term
    }
    return fn; // Return the nth term
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const t1 = parseInt(firstMultipleInput[0], 10);
    const t2 = parseInt(firstMultipleInput[1], 10);
    const n = parseInt(firstMultipleInput[2], 10);

    const result = fibonacciModified(t1, t2, n);

    ws.write(result.toString() + '\n');

    ws.end();
}
