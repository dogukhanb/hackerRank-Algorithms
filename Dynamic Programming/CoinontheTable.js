You have a rectangular board consisting of  rows, numbered from  to , and  columns, numbered from  to . The top left is  and the bottom right is . Initially - at time  - there is a coin on the top-left cell of your board. Each cell of your board contains one of these letters:

*: Exactly one of your cells has letter '*'.

U: If at time  the coin is on cell  and cell  has letter 'U', the coin will be on cell  at time , if . Otherwise, there is no coin on your board at time .

L: If at time  the coin is on cell  and cell  has letter 'L', the coin will be on cell  at time , if . Otherwise, there is no coin on your board at time .

D: If at time  the coin is on cell  and cell  has letter 'D', the coin will be on cell  at time , if . Otherwise, there is no coin on your board at time .

R: If at time  the coin is on cell  and cell  has letter 'R', the coin will be on cell  at time , if . Otherwise, there is no coin on your board at time .

When the coin reaches a cell that has letter '*', it will stay there permanently. When you punch on your board, your timer starts and the coin moves between cells. Before starting the game, you can make operations to change the board, such that you are sure that at or before time  the coin will reach the cell having letter '*'. In each operation you can select a cell with some letter other than '*' and change the letter to 'U', 'L', 'R' or 'D'. You need to carry out as few operations as possible in order to achieve your goal. Your task is to find the minimum number of operations.

For example, given a grid of  rows and  columns:

UDL
RR*
the goal is to get from  to  in as few steps as possible. As the grid stands, it cannot be done because of the U in the cell at . If  is changed to D, the path  is available. It could also be changed to R which would make the path  available. Either choice takes  change operation, which is the value sought if . A lower value of  would result in a return value of  because the shortest path is  steps, starting from .

Function Description

Complete the coinOnTheTable function in the editor below. It should return an integer that represents the minimum operations to achieve the goal, or  if it is not possible.

coinOnTheTable has the following parameters:

m: an integer, the number of columns on the board
k: an integer, the maximum time to reach the goal
board: an array of strings where each string represents a row of the board
Input Format

The first line of input contains three integers, , , and , the number of rows, the number of columns and the maximum time respectively.

The next  lines contain  letters each, describing your board.

Constraints



Output Format

Print an integer which represents the minimum number of operations required to achieve your goal. If you cannot achieve your goal, print .

Sample Input

2 2 3  
RD  
*L
Sample output :

0
Sample input :

2 2 1  
RD  
*L
Sample output :

1
Explanation :

In the first example, a valid path exists without making any changes. In the second example, the letter of cell (1,1) must be changed to 'D' to make a valid path. In each example, a path length  is available.

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
 * Complete the 'coinOnTheTable' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER m
 *  2. INTEGER k
 *  3. STRING_ARRAY board
 */

function coinOnTheTable(m, k, board) {
    const n = board.length;
    let target = null;

    // Find the position of '*'
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === '*') {
                target = [i, j];
                break;
            }
        }
        if (target) break;
    }

    if (!target) return -1; // No target found

    const directions = {
        'U': [-1, 0],
        'D': [1, 0],
        'L': [0, -1],
        'R': [0, 1]
    };

    // BFS initialization
    const queue = [[0, 0, 0, 0]]; // [row, col, changes, time]
    const visited = Array.from({ length: n }, () => Array.from({ length: m }, () => Array(k + 1).fill(Infinity)));
    visited[0][0][0] = 0;

    while (queue.length > 0) {
        const [r, c, changes, time] = queue.shift();

        // If we reach the target within k steps
        if (r === target[0] && c === target[1]) {
            return changes;
        }

        // Explore all four directions
        for (const [move, [dr, dc]] of Object.entries(directions)) {
            const newRow = r + dr;
            const newCol = c + dc;

            // Check boundaries
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < m) {
                const currentCell = board[newRow][newCol];
                let newChanges = changes;

                // If we can't move to this cell directly, we need to change it
                if (currentCell !== '*' && currentCell !== move) {
                    newChanges += 1; // A change operation is needed
                }

                // Only continue if we haven't visited this cell with fewer changes
                if (newChanges <= k && newChanges < visited[newRow][newCol][time + 1]) {
                    visited[newRow][newCol][time + 1] = newChanges;
                    queue.push([newRow, newCol, newChanges, time + 1]);
                }
            }
        }
    }

    return -1; // If we exit the loop, it means we couldn't reach the target
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);
    const k = parseInt(firstMultipleInput[2], 10);

    let board = [];

    for (let i = 0; i < n; i++) {
        const boardItem = readLine();
        board.push(boardItem);
    }

    const result = coinOnTheTable(m, k, board);

    ws.write(result + '\n');

    ws.end();
}