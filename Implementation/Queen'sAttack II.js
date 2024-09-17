You will be given a square chess board with one queen and a number of obstacles placed on it. Determine how many squares the queen can attack.

A queen is standing on an  chessboard. The chess board's rows are numbered from  to , going from bottom to top. Its columns are numbered from  to , going from left to right. Each square is referenced by a tuple, , describing the row, , and column, , where the square is located.

The queen is standing at position . In a single move, she can attack any square in any of the eight directions (left, right, up, down, and the four diagonals). In the diagram below, the green circles denote all the cells the queen can attack from :

image

There are obstacles on the chessboard, each preventing the queen from attacking any square beyond it on that path. For example, an obstacle at location  in the diagram above prevents the queen from attacking cells , , and :

image

Given the queen's position and the locations of all the obstacles, find and print the number of squares the queen can attack from her position at . In the board above, there are  such squares.

Function Description

Complete the queensAttack function in the editor below.

queensAttack has the following parameters:
- int n: the number of rows and columns in the board
- nt k: the number of obstacles on the board
- int r_q: the row number of the queen's position
- int c_q: the column number of the queen's position
- int obstacles[k][2]: each element is an array of  integers, the row and column of an obstacle

Returns
- int: the number of squares the queen can attack

Input Format

The first line contains two space-separated integers  and , the length of the board's sides and the number of obstacles.
The next line contains two space-separated integers  and , the queen's row and column position.
Each of the next  lines contains two space-separated integers  and , the row and column position of .

Constraints

A single cell may contain more than one obstacle.
There will never be an obstacle at the position where the queen is located.
Subtasks

For  of the maximum score:

For  of the maximum score:

Sample Input 0

4 0
4 4
Sample Output 0

9
Explanation 0

The queen is standing at position  on a  chessboard with no obstacles:

image

Sample Input 1

5 3
4 3
5 5
4 2
2 3
Sample Output 1

10
Explanation 1

The queen is standing at position  on a  chessboard with  obstacles:

image

The number of squares she can attack from that position is .

Sample Input 2

1 0
1 1
Sample Output 2

0
Explanation 2

Since there is only one square, and the queen is on it, the queen can move 0 squares.

/* ----------------------------------------------------------- */

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
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */
function queensAttack(n, k, r_q, c_q, obstacles) {
    // Initialize distances to edges
    let up = n - r_q;
    let down = r_q - 1;
    let right = n - c_q;
    let left = c_q - 1;
    let upRight = Math.min(up, right);
    let upLeft = Math.min(up, left);
    let downRight = Math.min(down, right);
    let downLeft = Math.min(down, left);

    // Process obstacles
    for (const [r, c] of obstacles) {
        if (c === c_q) { // Same column
            if (r > r_q) {
                up = Math.min(up, r - r_q - 1);
            } else {
                down = Math.min(down, r_q - r - 1);
            }
        } else if (r === r_q) { // Same row
            if (c > c_q) {
                right = Math.min(right, c - c_q - 1);
            } else {
                left = Math.min(left, c_q - c - 1);
            }
        } else if (Math.abs(c - c_q) === Math.abs(r - r_q)) { // Same diagonal
            if (c > c_q && r > r_q) { // Up-right diagonal
                upRight = Math.min(upRight, c - c_q - 1);
            } else if (c < c_q && r > r_q) { // Up-left diagonal
                upLeft = Math.min(upLeft, c_q - c - 1);
            } else if (c > c_q && r < r_q) { // Down-right diagonal
                downRight = Math.min(downRight, c - c_q - 1);
            } else if (c < c_q && r < r_q) { // Down-left diagonal
                downLeft = Math.min(downLeft, c_q - c - 1);
            }
        }
    }

    // Calculate total possible attacks
    return up + down + right + left + upRight + upLeft + downRight + downLeft;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
    const r_q = parseInt(secondMultipleInput[0], 10);
    const c_q = parseInt(secondMultipleInput[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().replace(/\s+$/g, '').split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    const result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + '\n');
    ws.end();
}

