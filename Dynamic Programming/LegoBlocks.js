You have an infinite number of 4 types of lego blocks of sizes given as (depth x height x width):

d	h	w
1	1	1
1	1	2
1	1	3
1	1	4
Using these blocks, you want to make a wall of height  and width . Features of the wall are:

- The wall should not have any holes in it.
- The wall you build should be one solid structure, so there should not be a straight vertical break across all rows of bricks.
- The bricks must be laid horizontally.

How many ways can the wall be built?

Example



The height is  and the width is . Here are some configurations:

image

These are not all of the valid permutations. There are  valid permutations in all.

Function Description

Complete the legoBlocks function in the editor below.

legoBlocks has the following parameter(s):

int n: the height of the wall
int m: the width of the wall
Returns
- int: the number of valid wall formations modulo 

Input Format

The first line contains the number of test cases .

Each of the next  lines contains two space-separated integers  and .

Constraints



Sample Input

STDIN   Function
-----   --------
4       t = 4
2 2     n = 2, m = 2
3 2     n = 3, m = 2
2 3     n = 2, m = 3
4 4     n = 4, m = 4
Sample Output

3  
7  
9  
3375
Explanation

For the first case, we can have:

image


For the second case, each row of the wall can contain either two blocks of width 1, or one block of width 2. However, the wall where all rows contain two blocks of width 1 is not a solid one as it can be divided vertically. Thus, the number of ways is  and .

 /* -------------*/ 

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
 * Complete the 'legoBlocks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 */

const MOD = 1000000007;

function legoBlocks(n, m) {
    // Step 1: Calculate the number of ways to fill a single row of width m
    let ways = new Array(m + 1).fill(0);
    ways[0] = 1; // 1 way to fill width 0

    for (let i = 1; i <= m; i++) {
        for (let blockWidth = 1; blockWidth <= 4; blockWidth++) {
            if (i - blockWidth >= 0) {
                ways[i] = (ways[i] + ways[i - blockWidth]) % MOD;
            }
        }
    }

    // Step 2: Calculate the total configurations with height n
    let totalWays = Math.pow(ways[m], n) % MOD;

    // Step 3: Calculate the number of invalid configurations (those with vertical breaks)
    let breakWays = new Array(n + 1).fill(0);
    breakWays[0] = 1; // 1 way to fill height 0

    for (let i = 1; i <= n; i++) {
        breakWays[i] = (breakWays[i - 1] * ways[m]) % MOD; // Each height depends on previous height configurations
    }

    // Subtract breakWays from totalWays
    let result = (totalWays - breakWays[n] + MOD) % MOD; // Ensure we don't go negative

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const m = parseInt(firstMultipleInput[1], 10);

        const result = legoBlocks(n, m);

        ws.write(result + '\n');
    }

    ws.end();
}
