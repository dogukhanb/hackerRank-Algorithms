Mr K has a rectangular plot of land which may have marshes where fenceposts cannot be set. He wants you to find the perimeter of the largest rectangular fence that can be built on this land.

For example, in the following  grid,  marks a marsh and  marks good land.

....
..x.
..x.
x...
If we number the rows and columns starting with , we see that there are two main areas that can be fenced:  and . The longest perimeter is .

Function Description

Complete the kMarsh function in the editor below. It should print either an integer or impossible.

kMarsh has the following parameter(s):

grid: an array of strings that represent the grid
Input Format

The first line contains two space-separated integers  and , the grid rows and columns.
Each of the next  lines contains  characters each describing the state of the land. 'x' (ascii value: 120) if it is a marsh and '.' ( ascii value:46) otherwise.

Constraints


Output Format

Output contains a single integer - the largest perimeter. If the rectangular fence cannot be built, print impossible.

Sample Input 0

4 5
.....
.x.x.
.....
.....
Sample Output 0

14
Explanation 0

The fence can be put up around the entire field. The perimeter is .

Sample Input 1

2 2
.x
x.
Sample Output 1

impossible
Explanation 1

We need a minimum of 4 points to place the 4 corners of the fence. Hence, impossible.

Sample Input 2

2 5
.....
xxxx.
Sample Output 2

impossible 

 /* ------------------- */

 'use strict';

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
 * Complete the 'kMarsh' function below.
 *
 * The function accepts STRING_ARRAY grid as parameter.
 */

function kMarsh(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // Initialize boundaries
    let top = m, bottom = -1, left = n, right = -1;

    // Find the boundaries of the rectangle
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '.') {
                top = Math.min(top, i);
                bottom = Math.max(bottom, i);
                left = Math.min(left, j);
                right = Math.max(right, j);
            }
        }
    }

    // Check if there is a valid rectangle
    if (top > bottom || left > right) {
        console.log("impossible");
        return;
    }

    // Verify if the entire area from (top, left) to (bottom, right) is valid
    for (let i = top; i <= bottom; i++) {
        for (let j = left; j <= right; j++) {
            if (grid[i][j] === 'x') {
                console.log("impossible");
                return;
            }
        }
    }

    // Calculate perimeter
    const width = right - left + 1;
    const height = bottom - top + 1;
    const perimeter = 2 * (width + height);

    console.log(perimeter);
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);
    const n = parseInt(firstMultipleInput[1], 10);

    let grid = [];

    for (let i = 0; i < m; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    kMarsh(grid);
}
