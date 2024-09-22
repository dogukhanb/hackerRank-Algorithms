Given a square grid of characters in the range ascii[a-z], rearrange elements of each row alphabetically, ascending. Determine if the columns are also in ascending alphabetical order, top to bottom. Return YES if they are or NO if they are not.

Example

The grid is illustrated below.

a b c
a d e
e f g
The rows are already in alphabetical order. The columns a a e, b d f and c e g are also in alphabetical order, so the answer would be YES. Only elements within the same row can be rearranged. They cannot be moved to a different row.

Function Description

Complete the gridChallenge function in the editor below.

gridChallenge has the following parameter(s):

string grid[n]: an array of strings
Returns

string: either YES or NO
Input Format

The first line contains , the number of testcases.

Each of the next  sets of lines are described as follows:
- The first line contains , the number of rows and columns in the grid.
- The next  lines contains a string of length 

Constraints



Each string consists of lowercase letters in the range ascii[a-z]

Output Format

For each test case, on a separate line print YES if it is possible to rearrange the grid alphabetically ascending in both its rows and columns, or NO otherwise.

Sample Input

STDIN   Function
-----   --------
1       t = 1
5       n = 5
ebacd   grid = ['ebacd', 'fghij', 'olmkn', 'trpqs', 'xywuv']
fghij
olmkn
trpqs
xywuv
Sample Output

YES
Explanation

The x grid in the  test case can be reordered to

abcde
fghij
klmno
pqrst
uvwxy
This fulfills the condition since the rows 1, 2, ..., 5 and the columns 1, 2, ..., 5 are all alphabetically sorted.

/* ------------------------------------------- */

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
 * Complete the 'gridChallenge' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING_ARRAY grid as parameter.
 */
function gridChallenge(grid) {
    // Sort each row
    for (let i = 0; i < grid.length; i++) {
        grid[i] = grid[i].split('').sort().join('');
    }

    // Check columns
    const n = grid.length;
    for (let col = 0; col < grid[0].length; col++) {
        for (let row = 1; row < n; row++) {
            if (grid[row][col] < grid[row - 1][col]) {
                return 'NO';
            }
        }
    }

    return 'YES';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);
        let grid = [];

        for (let i = 0; i < n; i++) {
            const gridItem = readLine();
            grid.push(gridItem);
        }

        const result = gridChallenge(grid);
        ws.write(result + '\n');
    }

    ws.end();
}
