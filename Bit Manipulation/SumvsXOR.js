Given an integer , find each  such that:

where  denotes the bitwise XOR operator. Return the number of 's satisfying the criteria.

Example

There are four values that meet the criteria:

Return .

Function Description

Complete the sumXor function in the editor below.

sumXor has the following parameter(s):
- int n: an integer

Returns
- int: the number of values found

Input Format

A single integer, .

Constraints

Subtasks

 for  of the maximum score.
Output Format

Sample Input 0

5
Sample Output 0

2
Explanation 0

For , the  values  and  satisfy the conditions:

Sample Input 1

10
Sample Output 1

4
Explanation 1

For , the  values , , , and  satisfy the conditions:



/* ----------------------------------------------- */

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
 * Complete the 'sumXor' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER n as parameter.
 */

function sumXor(n) {
    let countZeros = 0;

    // Count the number of 0 bits in the binary representation of n
    while (n > 0) {
        // Check if the least significant bit is 0
        if ((n % 2n) === 0n) {
            countZeros++;
        }
        n = n / 2n; // Right shift by dividing by 2
    }

    // The number of valid x values is 2^countZeros
    return 1n << BigInt(countZeros); // Use BigInt for the result
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = BigInt(readLine().trim()); // Read n as BigInt

    const result = sumXor(n); // No conversion needed

    ws.write(result.toString() + '\n'); // Convert BigInt to string for output

    ws.end();
}

