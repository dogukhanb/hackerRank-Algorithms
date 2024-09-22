Mark and Jane are very happy after having their first child. Their son loves toys, so Mark wants to buy some. There are a number of different toys lying in front of him, tagged with their prices. Mark has only a certain amount to spend, and he wants to maximize the number of toys he buys with this money. Given a list of toy prices and an amount to spend, determine the maximum number of gifts he can buy.

Note Each toy can be purchased only once.

Example


The budget is  units of currency. He can buy items that cost  for , or  for  units. The maximum is  items.

Function Description

Complete the function maximumToys in the editor below.

maximumToys has the following parameter(s):

int prices[n]: the toy prices
int k: Mark's budget
Returns

int: the maximum number of toys
Input Format

The first line contains two integers,  and , the number of priced toys and the amount Mark has to spend.
The next line contains  space-separated integers 

Constraints




A toy can't be bought multiple times.

Sample Input

7 50
1 12 5 111 200 1000 10
Sample Output

4
Explanation

He can buy only  toys at most. These toys have the following prices: .

/* ---------------------------------------------- */

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
 * Complete the 'maximumToys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY prices
 *  2. INTEGER k
 */
function maximumToys(prices, k) {
    // Sort the prices in ascending order
    prices.sort((a, b) => a - b);
    
    let totalSpent = 0;
    let toysCount = 0;

    for (const price of prices) {
        if (totalSpent + price <= k) {
            totalSpent += price; // Add price to total spent
            toysCount++; // Increment number of toys bought
        } else {
            break; // Stop if budget is exceeded
        }
    }

    return toysCount; // Return the total number of toys bought
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);

    const prices = readLine().replace(/\s+$/g, '').split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

    const result = maximumToys(prices, k);

    ws.write(result + '\n');
    ws.end();
}
