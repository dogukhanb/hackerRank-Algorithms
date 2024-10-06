Big Cat and Little Cat love playing games. Today, they decide to play a Game of Stones, the Kitties are Coming edition. The game's rules are as follows:

The game starts with  stones that are randomly divided into  piles.
The cats move in alternating turns, and Little Cat always moves first.
During a move, a cat picks a pile having a number of stones  and splits it into any number of non-empty piles in the inclusive range from  to .
The first cat to be unable to make a move (e.g., because all piles contain exactly  stone) loses the game.
Little Cat is curious about the number of ways in which the stones can be initially arranged so that she is guaranteed to win. Two arrangements of stone piles are considered to be different if they contain different sequences of values. For example, arrangements  and  are different.

Given the values for , , and , find the number of winning configurations for Little Cat and print it modulo .

Note: Each cat always moves optimally, meaning that they're both playing to win and neither cat will make a move that causes them to lose the game if some other (winning) sequence of moves can be made.

Input Format

The first line of input contains three space-separated integers,  (the number of stones),  (the number of piles), and  (the maximum number of piles into which a pile can be split during a single move), respectively.

Constraints

Output Format

Print the number of initial arrangements of piles that will result in Little Cat winning, modulo .

Sample Input

4 3 3
Sample Output

3
Explanation

There are three possible arrangements:

For any arrangement, Little Cat can pick a pile containing  stones and split it into  piles with  stone each. At this point, the pile configuration will be , so Big Cat won't be able to make any moves and the game ends. We then print the result of  on a new line.


/* ---------------------- */

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
 * Complete the 'simpleGame' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. INTEGER k
 */
const MOD = 1000000007;

function simpleGame(n, m, k) {
    // Create a dp table
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    
    // Base case
    dp[0][0] = 1; // 1 way to distribute 0 stones into 0 piles

    // Fill the dp table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            // Sum dp[i - x][j - 1] for x from 1 to min(i, k)
            for (let x = 1; x <= Math.min(k, i); x++) {
                dp[i][j] = (dp[i][j] + dp[i - x][j - 1]) % MOD;
            }
        }
    }

    // Return the total number of ways
    return dp[n][m];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);
    const k = parseInt(firstMultipleInput[2], 10);

    const result = simpleGame(n, m, k);

    ws.write(result + '\n');
    ws.end();
}
