Markov takes out his Snakes and Ladders game, stares at the board and wonders: "If I can always roll the die to whatever number I want, what would be the least number of rolls to reach the destination?"

Rules The game is played with a cubic die of  faces numbered  to .

Starting from square , land on square  with the exact roll of the die. If moving the number rolled would place the player beyond square , no move is made.

If a player lands at the base of a ladder, the player must climb the ladder. Ladders go up only.

If a player lands at the mouth of a snake, the player must go down the snake and come out through the tail. Snakes go down only.

Function Description

Complete the quickestWayUp function in the editor below. It should return an integer that represents the minimum number of moves required.

quickestWayUp has the following parameter(s):

ladders: a 2D integer array where each  contains the start and end cell numbers of a ladder
snakes: a 2D integer array where each  contains the start and end cell numbers of a snake
Input Format

The first line contains the number of tests, .

For each testcase:
- The first line contains , the number of ladders.
- Each of the next  lines contains two space-separated integers, the start and end of a ladder.
- The next line contains the integer , the number of snakes.
- Each of the next  lines contains two space-separated integers, the start and end of a snake.

Constraints



The board is always  with squares numbered  to .
Neither square  nor square  will be the starting point of a ladder or snake.
A square will have at most one endpoint from either a snake or a ladder.

Output Format

For each of the t test cases, print the least number of rolls to move from start to finish on a separate line. If there is no solution, print -1.

Sample Input

2
3
32 62
42 68
12 98
7
95 13
97 25
93 37
79 27
75 19
49 47
67 17
4
8 52
6 80
26 42
2 72
9
51 19
39 11
37 29
81 3
59 5
79 23
53 7
43 33
77 21 
Sample Output

3
5
Explanation

For the first test:

The player can roll a  and a  to land at square . There is a ladder to square . A roll of  ends the traverse in  rolls.

For the second test:

The player first rolls  and climbs the ladder to square . Three rolls of  get to square . A final roll of  lands on the target square in  total rolls.

/* ---------------------------- */

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

function quickestWayUp(ladders, snakes) {
    const board = Array(101).fill(0); // Create a board of 100 squares (1 to 100)

    // Set up ladders
    for (const [start, end] of ladders) {
        board[start] = end;
    }

    // Set up snakes
    for (const [start, end] of snakes) {
        board[start] = end;
    }

    const queue = [1]; // Start from square 1
    const visited = Array(101).fill(false);
    visited[1] = true;
    let rolls = 0;

    while (queue.length > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const current = queue.shift();

            if (current === 100) {
                return rolls; // Return the number of rolls when we reach square 100
            }

            for (let die = 1; die <= 6; die++) {
                const next = current + die;

                if (next <= 100) {
                    const destination = board[next] || next; // Go to the end of a ladder or snake, if any

                    if (!visited[destination]) {
                        visited[destination] = true;
                        queue.push(destination);
                    }
                }
            }
        }
        rolls++;
    }

    return -1; // If we cannot reach square 100
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);
        const ladders = Array(n);

        for (let i = 0; i < n; i++) {
            ladders[i] = readLine().replace(/\s+$/g, '').split(' ').map(laddersTemp => parseInt(laddersTemp, 10));
        }

        const m = parseInt(readLine().trim(), 10);
        const snakes = Array(m);

        for (let i = 0; i < m; i++) {
            snakes[i] = readLine().replace(/\s+$/g, '').split(' ').map(snakesTemp => parseInt(snakesTemp, 10));
        }

        const result = quickestWayUp(ladders, snakes);
        ws.write(result + '\n');
    }

    ws.end();
}
