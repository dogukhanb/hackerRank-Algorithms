You are given  non-negative integers, . We define the score for some permutation () of length  to be the maximum of  for .

Find the permutation with the minimum possible score and print its score.

Note:  is the exclusive-OR (XOR) operator.

Input Format

The first line contains single integer, , denoting the number of integers.
The second line contains  space-separated integers, , describing the respective integers.

Constraints

Output Format

Print a single integer denoting the minimum possible score.

Sample Input 0

4
1 2 3 4
Sample Output 0

5
Sample Input 1

3
1 2 3
Sample Output 1

2
Explanation

Sample Case 0:
The permutation with the minimum score is :



Because the permutation's score is the maximum of these values, we print  on a new line.

Sample Case 1:
The permutation with the minimum score is :


Because the permutation's score is the maximum of these values, we print  on a new line.

 /* ---------------------- */

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
 * Complete the 'anotherMinimaxProblem' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function anotherMinimaxProblem(a) {
    // Sort the array
    a.sort((x, y) => x - y);
    
    let maxXor = 0;
    
    // Calculate the maximum XOR of adjacent elements
    for (let i = 0; i < a.length - 1; i++) {
        const currentXor = a[i] ^ a[i + 1];
        maxXor = Math.max(maxXor, currentXor);
    }
    
    return maxXor;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));
    
    const result = anotherMinimaxProblem(a);
    
    ws.write(result + '\n');
    ws.end();
}
