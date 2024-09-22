Nim is the most famous two-player algorithm game. The basic rules for this game are as follows:

The game starts with a number of piles of stones. The number of stones in each pile may not be equal.
The players alternately pick up  or more stones from  pile
The player to remove the last stone wins.
For example, there are  piles of stones having  stones in them. Play may proceed as follows:

Player  Takes           Leaving
                        pile=[3,2,4]
1       2 from pile[1]  pile=[3,4]
2       2 from pile[1]  pile=[3,2]
1       1 from pile[0]  pile=[2,2]
2       1 from pile[0]  pile=[1,2]
1       1 from pile[1]  pile=[1,1]
2       1 from pile[0]  pile=[0,1]
1       1 from pile[1]  WIN
Given the value of  and the number of stones in each pile, determine the game's winner if both players play optimally.

Function Desctription

Complete the nimGame function in the editor below. It should return a string, either First or Second.

nimGame has the following parameter(s):

pile: an integer array that represents the number of stones in each pile
Input Format

The first line contains an integer, , denoting the number of games they play.

Each of the next  pairs of lines is as follows:

The first line contains an integer , the number of piles.
The next line contains  space-separated integers , the number of stones in each pile.
Constraints

Player 1 always goes first.
Output Format

For each game, print the name of the winner on a new line (i.e., either First or Second).

Sample Input

2
2
1 1
3
2 1 4
Sample Output

Second
First
Explanation

In the first case, there are  piles of  stones. Player  has to remove one pile on the first move. Player  removes the second for a win.

In the second case, there are  piles of  stones. If player  removes any one pile, player  can remove all but one of another pile and force a win. If player  removes less than a pile, in any case, player  can force a win as well, given optimal play.

/* -------------------------------------------- */

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
 * Complete the 'nimGame' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts the following parameter:
 *  1. INTEGER ARRAY pile
 */

function nimGame(pile) {
    let nimSum = 0;
    for (let stones of pile) {
        nimSum ^= stones; // Calculate the Nim-sum
    }
    return nimSum === 0 ? 'Second' : 'First'; // Determine winner based on Nim-sum
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10); // Read number of piles
        const pile = readLine().replace(/\s+$/g, '').split(' ').map(Number); // Read piles

        const result = nimGame(pile); // Determine winner

        ws.write(result + '\n'); // Write result
    }

    ws.end();
}
