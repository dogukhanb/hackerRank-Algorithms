Find the number of ways that a given integer, , can be expressed as the sum of the  powers of unique, natural numbers.

For example, if  and , we have to find all combinations of unique squares adding up to . The only solution is .

Function Description

Complete the powerSum function in the editor below. It should return an integer that represents the number of possible combinations.

powerSum has the following parameter(s):

X: the integer to sum to
N: the integer power to raise numbers to
Input Format

The first line contains an integer .
The second line contains an integer .

Constraints

Output Format

Output a single integer, the number of possible combinations caclulated.

Sample Input 0

10
2
Sample Output 0

1
Explanation 0

If  and , we need to find the number of ways that  can be represented as the sum of squares of unique numbers.


This is the only way in which  can be expressed as the sum of unique squares.

Sample Input 1

100
2
Sample Output 1

3
Explanation 1


Sample Input 2

100
3
Sample Output 2

1
Explanation 2

 can be expressed as the sum of the cubes of .
. There is no other way to express  as the sum of cubes.


 /* --------------------------- */


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
 * Complete the 'powerSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER X
 *  2. INTEGER N
 */

function powerSum(X, N) {
    function countWays(remaining, base) {
        const power = Math.pow(base, N);
        if (remaining === 0) {
            return 1; // Found a valid combination
        }
        if (remaining < 0 || power > remaining) {
            return 0; // No valid combination possible
        }
       
        // Include the current base or move to the next base
        return countWays(remaining - power, base + 1) + countWays(remaining, base + 1);
    }
   
    return countWays(X, 1); // Start with the first natural number
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const X = parseInt(readLine().trim(), 10);
    const N = parseInt(readLine().trim(), 10);

    const result = powerSum(X, N);

    ws.write(result + '\n');
    ws.end();
}