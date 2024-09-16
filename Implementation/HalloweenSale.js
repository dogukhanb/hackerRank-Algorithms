You wish to buy video games from the famous online video game store Mist.

Usually, all games are sold at the same price,  dollars. However, they are planning to have the seasonal Halloween Sale next month in which you can buy games at a cheaper price. Specifically, the first game will cost  dollars, and every subsequent game will cost  dollars less than the previous one. This continues until the cost becomes less than or equal to  dollars, after which every game will cost  dollars. How many games can you buy during the Halloween Sale?

Example



.

The following are the costs of the first , in order:

Start at  units cost, reduce that by  units each iteration until reaching a minimum possible price, . Starting with  units of currency in your Mist wallet, you can buy 5 games: .

Function Description

Complete the howManyGames function in the editor below.

howManyGames has the following parameters:

int p: the price of the first game
int d: the discount from the previous game price
int m: the minimum cost of a game
int s: the starting budget
Input Format

The first and only line of input contains four space-separated integers , ,  and .

Constraints

Sample Input 0

20 3 6 80
Sample Output 0

6
Explanation 0

Assumptions other than starting funds, , match the example in the problem statement. With a budget of , you can buy  games at a cost of . A  game for an additional  units exceeds the budget.

Sample Input 1

20 3 6 85
Sample Output 1

7
Explanation 1

This is the same as the previous case, except this time the starting budget  units of currency. This time, you can buy  games since they cost . An additional game at  units will exceed the budget.


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
 * Complete the 'howManyGames' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER p
 *  2. INTEGER d
 *  3. INTEGER m
 *  4. INTEGER s
 */
function howManyGames(p, d, m, s) {
    let current_price = p;
    let games_count = 0;

    while (s >= current_price) {
        s -= current_price;
        games_count++;
        // Calculate next price
        if (current_price > m) {
            current_price = Math.max(current_price - d, m);
        }
    }

    return games_count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const p = parseInt(firstMultipleInput[0], 10);
    const d = parseInt(firstMultipleInput[1], 10);
    const m = parseInt(firstMultipleInput[2], 10);
    const s = parseInt(firstMultipleInput[3], 10);

    const answer = howManyGames(p, d, m, s);

    ws.write(answer + '\n');

    ws.end();
}
