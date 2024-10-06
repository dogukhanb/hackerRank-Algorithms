Nina has an  chessboard and  jumping rooks. Every cell of the chessboard is either blocked or free, and Nina can only put a single rook in any free cell.

Two jumping rooks beat each other if they are either in the same row or in the same column and all cells between them are free (note that it's possible that there are some other rooks between them). More formally, if the first rook is in cell  and the second rook is in cell  (where ), then these two rooks beat each other if and only if  are free. If the rooks are in cells  and , then cells  must all be free.

Given the configuration of the chessboard and some , help Nina place  jumping rooks in the chessboard's free cells such that the number of pairs of rooks that beat each other is minimal. Then print a single integer denoting the number of rooks that beat each other.

Input Format

The first line contains two space-separated integers describing the respective values of  (the size of the chessboard) and  (the number of rooks to place).
Each line  of the  subsequent lines contains a string of  characters describing each row in the chessboard. The  character of the  line is # if cell  is blocked or . if the cell is free.

Constraints

It is guaranteed that  is less than the number of free cells in the chessboard.
Output Format

Print a single integer denoting the minimum possible number of pairs of rooks that beat each other.

Sample Input 0

3 4
...
...
...
Sample Output 0

2
Explanation 0
For this input, one possible arrangement is:

o.o
.o.
..o
where each o is a jumping rook.

Sample Input 1

5 10
..#..
..#..
#####
..#..
..#..
Sample Output 1

4
Explanation 1
For this input, one possible arrangement is:

.o#o.
oo#oo
#####
.o#o.
o.#.o
where each o is a jumping rook.


 /* ------------------------- */

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
 * Complete the 'jumpingRooks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. STRING_ARRAY board
 */

function jumpingRooks(k, board) {
    const n = board.length;
    const m = board[0].length;

    const freeCellsInRow = new Array(n).fill(0);
    const freeCellsInCol = new Array(m).fill(0);
    const positions = [];

    // Count free cells in rows and columns
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === '.') {
                freeCellsInRow[i]++;
                freeCellsInCol[j]++;
                positions.push([i, j]);
            }
        }
    }

    // Now we have the number of free cells in each row and column
    let minPairs = Infinity;

    // Iterate over all combinations of placing rooks in the free cells
    const dfs = (placed, idx, pairs) => {
        if (placed === k) {
            minPairs = Math.min(minPairs, pairs);
            return;
        }
        if (idx >= positions.length) return;

        // Place the rook at positions[idx]
        const [r, c] = positions[idx];
       
        // Calculate how many pairs are formed with this placement
        const currentPairs = (freeCellsInRow[r] - 1) + (freeCellsInCol[c] - 1);
       
        // Proceed to place the next rook
        dfs(placed + 1, idx + 1, pairs + currentPairs);

        // Do not place the rook at this position
        dfs(placed, idx + 1, pairs);
    };

    dfs(0, 0, 0);

    return minPairs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);

    let board = [];

    for (let i = 0; i < n; i++) {
        const boardItem = readLine();
        board.push(boardItem);
    }

    const result = jumpingRooks(k, board);

    ws.write(result + '\n');
    ws.end();
}