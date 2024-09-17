
King Richard is leading a troop of  knights into battle! Being very organized, he labels his knights  and arranges them in an  square formation, demonstrated below:

knight1

Before the battle begins, he wants to test how well his knights follow instructions. He issues  drill commands, where each command follows the format ai bi di and is executed like so:

All knights in the square having the top-left corner at location  and the bottom-right corner at location  rotate  in the clockwise direction. Recall that some location  denotes the cell located at the intersection of row  and column . For example: image
You must follow the commands sequentially. The square for each command is completely contained within the square for the previous command. Assume all knights follow the commands perfectly.

After performing all  drill commands, it's time for battle! King Richard chooses knights  for his first wave of attack; however, because the knights were reordered by the drill commands, he's not sure where his chosen knights are!

As his second-in-command, you must find the locations of the knights. For each knight , , print the knight's row and column locations as two space-separated values on a new line.

Input Format

This is broken down into three parts:

The first line contains a single integer, .
The second line contains a single integer, .
Each line  of the  subsequent lines describes a command in the form of three space-separated integers corresponding to , , and , respectively.
The next line contains a single integer, .
Each line  of the  subsequent lines describes a knight the King wants to find in the form of a single integer corresponding to .
Constraints

 and 
 and 
Subtask

 for  of the maximum score.
Output Format

Print  lines of output, where each line  contains two space-separated integers describing the respective row and column values where knight  is located.

Sample Input

7
4
1 2 4
2 3 3
3 4 1
3 4 0
7
0
6
9
11
24
25
48
Sample Output

1 1
1 7
4 6
3 4
2 5
2 4
7 7
Explanation

The following diagram demonstrates the sequence of commands:

 Click here to download a larger image.

In the final configuration:

Knight  is at location 
Knight  is at location 
Knight  is at location 
Knight  is at location 
Knight  is at location 
Knight  is at location 
Knight  is at location 

/* --------------------------------------------------------------*/


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
    inputString = inputString.split('\n').filter(line => line.trim() !== '');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'kingRichardKnights' function below.
 *
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER s
 *  3. INTEGER_ARRAY knights
 */

function kingRichardKnights(n, s, commands, knights) {
    // Initialize the grid with knight indices
    const grid = Array.from({ length: n }, (_, row) =>
        Array.from({ length: n }, (_, col) => row * n + col)
    );

    // Apply commands in sequence
    for (const [x1, y1, d] of commands) {
        // Top-left and bottom-right corners of the sub-grid
        const topLeftX = x1 - 1;
        const topLeftY = y1 - 1;
        const bottomRightX = topLeftX + d;
        const bottomRightY = topLeftY + d;

        // Perform rotation
        rotateSubGrid(grid, topLeftX, topLeftY, bottomRightX, bottomRightY);
    }

    // Find the final positions of knights
    const results = knights.map(knightIndex => {
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                if (grid[row][col] === knightIndex) {
                    return [row + 1, col + 1];
                }
            }
        }
    });

    return results;
}

function rotateSubGrid(grid, x1, y1, x2, y2) {
    const size = x2 - x1 + 1;
    const temp = Array.from({ length: size }, () => Array(size).fill(0));

    // Copy the sub-grid into temp
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            temp[j][size - 1 - i] = grid[x1 + i][y1 + j];
        }
    }

    // Copy the rotated temp back to the grid
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            grid[x1 + i][y1 + j] = temp[i][j];
        }
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const s = parseInt(readLine().trim(), 10);

    let commands = [];
    for (let i = 0; i < s; i++) {
        const [x1, y1, d] = readLine().trim().split(' ').map(Number);
        commands.push([x1, y1, d]);
    }

    const knightsCount = parseInt(readLine().trim(), 10);
    let knights = [];
    for (let i = 0; i < knightsCount; i++) {
        knights.push(parseInt(readLine().trim(), 10));
    }

    const result = kingRichardKnights(n, s, commands, knights);

    ws.write(result.map(x => x.join(' ')).join('\n') + '\n');

    ws.end();
}
