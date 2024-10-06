You are situated in an  dimensional grid at position . The dimensions of the grid are . In one step, you can walk one step ahead or behind in any one of the  dimensions. This implies that there are always  possible moves if movements are unconstrained by grid boundaries. How many ways can you take  steps without leaving the grid at any point? You leave the grid if at any point , either  or .

For example, you start off in a 3 dimensional grid at position . The dimensions of the grid are , so each of your axes will be numbered from  to . If you want to move  step, you can move to the following coordinates: .

image

If we started at  in the same grid, our new paths would lead to . Other moves are constrained by .

Function Description

Complete the gridWalking function in the editor below. It should return an integer that represents the number of possible moves, modulo .

gridWalking has the following parameter(s):

m: an integer that represents the number of steps
x: an integer array where each  represents a coordinate in the  dimension where 
D: an integer array where each  represents the upper limit of the axis in the  dimension
Input Format

The first line contains an integer , the number of test cases.

Each of the next  sets of lines is as follows:

The first line contains two space-separated integers,  and .
The next line contains  space-separated integers .
The third line of each test contains  space-separated integers .
Constraints

Output Format

Output one line for each test case. Since the answer can be really huge, output it modulo .

Sample Input

1
2 3
1 1
2 3
Sample Output

12
Explanation

We are starting from (1, 1) in a  2-D grid, and need to count the number of possible paths with length equal to .

Here are the  paths:

/* -------------------- */

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
 * Complete the 'gridWalking' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER m
 *  2. INTEGER_ARRAY x
 *  3. INTEGER_ARRAY D
 */

function gridWalking(m, x, D) {
    const MOD = 1000000007;
    const n = x.length; // number of dimensions
    const memo = {};

    // Recursive function with memoization
    function dfs(stepsRemaining, position) {
        // Convert position to a string key for memoization
        const key = `${stepsRemaining}:${position.join(',')}`;
        if (key in memo) return memo[key];

        // Base case: if no steps remaining, this is a valid path
        if (stepsRemaining === 0) {
            return 1;
        }

        let count = 0;
        
        // Explore all dimensions
        for (let i = 0; i < n; i++) {
            // Move forward if within bounds
            if (position[i] + 1 <= D[i]) {
                position[i] += 1;
                count = (count + dfs(stepsRemaining - 1, position)) % MOD;
                position[i] -= 1; // backtrack
            }
            // Move backward if within bounds
            if (position[i] - 1 >= 0) {
                position[i] -= 1;
                count = (count + dfs(stepsRemaining - 1, position)) % MOD;
                position[i] += 1; // backtrack
            }
        }

        memo[key] = count; // store result in memo
        return count;
    }

    // Start the DFS from the initial position
    return dfs(m, x.slice());
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const m = parseInt(firstMultipleInput[1], 10);

        const x = readLine().replace(/\s+$/g, '').split(' ').map(xTemp => parseInt(xTemp, 10));
        const D = readLine().replace(/\s+$/g, '').split(' ').map(DTemp => parseInt(DTemp, 10));

        const result = gridWalking(m, x, D);

        ws.write(result + '\n');
    }

    ws.end();
}















