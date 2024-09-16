You are given a square map as a matrix of integer strings. Each cell of the map has a value denoting its depth. We will call a cell of the map a cavity if and only if this cell is not on the border of the map and each cell adjacent to it has strictly smaller depth. Two cells are adjacent if they have a common side, or edge.

Find all the cavities on the map and replace their depths with the uppercase character X.

Example

The grid is rearranged for clarity:

989
191
111
Return:

989
1X1
111
The center cell was deeper than those on its edges: [8,1,1,1]. The deep cells in the top two corners do not share an edge with the center cell, and none of the border cells is eligible.

Function Description

Complete the cavityMap function in the editor below.

cavityMap has the following parameter(s):

string grid[n]: each string represents a row of the grid
Returns

string{n}: the modified grid
Input Format

The first line contains an integer , the number of rows and columns in the grid.

Each of the following  lines (rows) contains  positive digits without spaces (columns) that represent the depth at .

Constraints


Sample Input

STDIN   Function
-----   --------
4       grid[] size n = 4
1112    grid = ['1112', '1912', '1892', '1234']
1912
1892
1234
Sample Output

1112
1X12
18X2
1234
Explanation

The two cells with the depth of 9 are not on the border and are surrounded on all sides by shallower cells. Their values are replaced by X.

/* ------------------------------------------------------- */

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
 * Complete the 'cavityMap' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY grid as parameter.
 */
function cavityMap(grid) {
    const n = grid.length;
    let result = grid.map(row => row.split('')); // Convert to 2D array of characters
    
    // Iterate over the non-border cells
    for (let i = 1; i < n - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            const currentDepth = result[i][j];
            const top = result[i - 1][j];
            const bottom = result[i + 1][j];
            const left = result[i][j - 1];
            const right = result[i][j + 1];
            
            // Check if it's a cavity
            if (currentDepth > top && currentDepth > bottom && currentDepth > left && currentDepth > right) {
                result[i][j] = 'X'; // Mark the cavity
            }
        }
    }
    
    // Convert 2D array of characters back to strings
    return result.map(row => row.join(''));
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine().trim();
        grid.push(gridItem);
    }

    const result = cavityMap(grid);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
