Given two integers,  and , find the maximal value of  xor , written , where  and  satisfy the following condition:


For example, if  and , then



Our maximum value is .

Function Description

Complete the maximizingXor function in the editor below. It must return an integer representing the maximum value calculated.

maximizingXor has the following parameter(s):

l: an integer, the lower bound, inclusive
r: an integer, the upper bound, inclusive
Input Format

The first line contains the integer .
The second line contains the integer .

Constraints

3

Output Format

Return the maximal value of the xor operations for all permutations of the integers from  to , inclusive.

Sample Input 0

10
15
Sample Output 0

7
Explanation 0

Here  and . Testing all pairs:


Two pairs, (10, 13) and (11, 12) have the xor value 7, and this is maximal.

Sample Input 1

11
100
Sample Output 1

127

/* ---------------------------------------- */

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
 * Complete the 'maximizingXor' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER l
 *  2. INTEGER r
 */
function maximizingXor(l, r) {
    // Calculate the XOR of l and r
    let xor = l ^ r; // Change to let
    let maxXor = 0;

    // Find the position of the most significant bit
    while (xor > 0) {
        maxXor = (maxXor << 1) | 1; // Shift maxXor left and add 1
        xor >>= 1; // Shift xor right
    }

    return maxXor; // This is the maximum XOR value
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const l = parseInt(readLine().trim(), 10);
    const r = parseInt(readLine().trim(), 10);

    const result = maximizingXor(l, r);

    ws.write(result + '\n');

    ws.end();
}
