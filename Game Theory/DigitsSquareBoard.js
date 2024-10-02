Two HackerRank staffers found a secret room with a mysterious  square board and decided to play a game with it. The game has the following rules:

At the beginning of the game, the players write a single digit (given as input) ranging from  to  in each  cell composing the  square board.
The players move in alternating turns. In each move, the current player performs the following actions:

Chooses a board that has at least one non-prime number written on it and has more than one cell (i.e., dimensions ).
Cuts the chosen board into  smaller boards by breaking it along any horizontal or vertical line at the edge of a cell.
Note: Although the game starts with one  board, that board is split in two during each move. At the beginning of the  move, a player can choose any one of the  pieces of the original board (as long as it can have a legal move performed on it).

The game ends when there are no more cuttable boards (i.e., there are  boards, or all boards have only prime numbers written on them). The first player who is unable to make a move loses.

Given the value of  and the respective numbers written in each  cell of the board, determine whether the person who wins the game is the first or second person to move. Assume both players move optimally.

Time Limit

Python: 18 seconds
Pypy2: 5 seconds
For other languages, the time limit is standard.

Input Format

The first line contains an integer, , denoting the number of test cases.
Each test case is defined as follows over the subsequent lines:

An integer, , denoting the length of each of the board's sides.
Each line  of the  subsequent lines contains  space-separated integers describing , where each  describes the number written in cell  of the board.
Constraints

Output Format

For each test case, print the name of the player with the winning strategy on a new line (i.e., either  or ).

Sample Input

2
3
2 7 5
2 7 5
7 7 7
2
4 3
1 2
Sample Output

Second
First
Explanation

We'll refer to the two players as  and .

Test Case 0:
All cells contain prime numbers, so there are no valid moves available to . As  wins by default, we print  on a new line.

Test Case 1:
In this test case, the two players perform the following sequence of moves:

 makes a horizontal cut, splitting the board into two  boards. This is demonstrated in the following diagram: square

 now chooses one of the two  rectangles and cuts it vertically, splitting it into two  squares.

 chooses remaining  rectangle and cuts it vertically, splitting it into two  squares.
After the above  moves take place, the board is split into four  squares and no more moves are available for  to make. Thus,  wins and we print  on a new line.


 /* ---------------------------------------- */

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
 * Complete the 'squareBoard' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts 2D_INTEGER_ARRAY board as parameter.
 */

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function squareBoard(board) {
    const n = board.length;
    let nonPrimeCount = 0;

    // Count non-prime numbers
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!isPrime(board[i][j])) {
                nonPrimeCount++;
            }
        }
    }

    // Determine winner
    if (nonPrimeCount === 0) {
        return "Second"; // No non-prime numbers available
    } else if (nonPrimeCount % 2 === 1) {
        return "First"; // Odd number of non-primes, Player 1 wins
    } else {
        return "Second"; // Even number of non-primes, Player 2 wins
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        let board = Array(n);

        for (let i = 0; i < n; i++) {
            board[i] = readLine().replace(/\s+$/g, '').split(' ').map(boardTemp => parseInt(boardTemp, 10));
        }

        const result = squareBoard(board);

        ws.write(result + '\n');
    }

    ws.end();
}
