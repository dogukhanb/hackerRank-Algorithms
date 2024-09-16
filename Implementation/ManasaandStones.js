Manasa is out on a hike with friends. She finds a trail of stones with numbers on them. She starts following the trail and notices that any two consecutive stones' numbers differ by one of two values. Legend has it that there is a treasure trove at the end of the trail. If Manasa can guess the value of the last stone, the treasure will be hers.

Example



She finds  stones and their differences are  or . We know she starts with a  stone not included in her count. The permutations of differences for the two stones are  or . Looking at each scenario, stones might have  or  on them. The last stone might have any of , or  on its face.

Compute all possible numbers that might occur on the last stone given a starting stone with a  on it, a number of additional stones found, and the possible differences between consecutive stones. Order the list ascending.

Function Description

Complete the stones function in the editor below.

stones has the following parameter(s):

int n: the number of non-zero stones
int a: one possible integer difference
int b: another possible integer difference
Returns

int[]: all possible values of the last stone, sorted ascending
Input Format

The first line contains an integer , the number of test cases.

Each test case contains  lines:
- The first line contains , the number of non-zero stones found.
- The second line contains , one possible difference
- The third line contains , the other possible difference.

Constraints

Sample Input

STDIN   Function
-----   --------
2       T = 2 (test cases)
3       n = 3 (test case 1)
1       a = 1
2       b = 2
4       n = 4 (test case 2)
10      a = 10
100     b = 100
Sample Output

2 3 4 
30 120 210 300 
Explanation

With differences 1 and 2, all possible series for the first test case are given below:

0,1,2
0,1,3
0,2,3
0,2,4
Hence the answer 2 3 4.

With differences 10 and 100, all possible series for the second test case are the following:

0, 10, 20, 30
0, 10, 20, 120
0, 10, 110, 120
0, 10, 110, 210
0, 100, 110, 120
0, 100, 110, 210
0, 100, 200, 210
0, 100, 200, 300
Hence the answer 30 120 210 300.

/* ------------------------------------------------------------- */

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
 * Complete the 'stones' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER a
 *  3. INTEGER b
 */
function stones(n, a, b) {
    // Ensure a is the smaller and b is the larger
    if (a > b) {
        [a, b] = [b, a];
    }
    
    const result = new Set();

    // Compute all possible values for the last stone
    for (let i = 0; i < n; i++) {
        const value = i * a + (n - 1 - i) * b;
        result.add(value);
    }

    // Convert the set to a sorted array
    return Array.from(result).sort((x, y) => x - y);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine().trim(), 10);
        const a = parseInt(readLine().trim(), 10);
        const b = parseInt(readLine().trim(), 10);

        const result = stones(n, a, b);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
