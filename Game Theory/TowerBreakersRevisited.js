Two players (numbered  and ) are playing a game of Tower Breakers! The rules of the game are as follows:

Player  always moves first, and both players always move optimally.
Initially there are  towers of various heights.
The players move in alternating turns. In each turn, a player can choose a tower of height  and reduce its height to , where  and  evenly divides .
If the current player is unable to make any move, they lose the game.
Given the value of  and the respective height values for all towers, can you determine who will win? If the first player wins, print ; otherwise, print .

Input Format

The first line contains an integer, , denoting the number of test cases.
Each of the  subsequent lines defines a test case. Each test case is described over the following two lines:

An integer, , denoting the number of towers.
 space-separated integers, , where each  describes the height of tower .
Constraints

Output Format

For each test case, print a single integer denoting the winner (i.e., either  or ) on a new line.

Sample Input

2
2 
1 2
3 
1 2 3
Sample Output

1
2
Explanation

Test Case 0:
Player  reduces the second tower to height  and subsequently wins.

Test Case 1:
There are two possible moves:

Reduce the second tower to 
Reduce the third tower to .
Whichever move player  makes, player  will make the other move. Thus, player  wins.


 /* --------------------------------- */

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
 * Complete the 'towerBreakers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function towerBreakers(arr) {
    let countGreaterThanOne = 0;

    // Count towers greater than height 1
    for (const height of arr) {
        if (height > 1) {
            countGreaterThanOne++;
        }
    }

    // Determine the winner based on the count
    // Player 1 wins if count is odd, Player 2 wins if even
    return countGreaterThanOne % 2 === 0 ? 2 : 1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const arrCount = parseInt(readLine().trim(), 10);
        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
        const result = towerBreakers(arr);
        ws.write(result + '\n');
    }

    ws.end();
}
