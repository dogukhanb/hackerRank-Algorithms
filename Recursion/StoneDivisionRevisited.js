You have a pile of  stones that you want to split into multiple piles, as well as a set, , of  distinct integers. We define a move as follows:

First, choose a pile of stones. Let's say that the chosen pile contains  stones.
Next, look for some  such that  and  is divisible by  (i.e.,  is a factor of ); if such an  exists, you can split the pile into  equal smaller piles.
You are given  queries where each query consists of  and . For each query, calculate the maximum possible number of moves you can perform and print it on a new line.

Input Format

The first line contains an integer, , denoting the number of queries. The  subsequent lines describe each query in the following format:

The first line contains two space-separated integers describing the respective values of  (the size of the initial pile in the query) and  (the size of the set in the query).
The second line contains  distinct space-separated integers describing the values in set .
Constraints

Subtask

 for  of the maximum score.
Output Format

For each query, calculate the maximum possible number of moves you can perform and print it on a new line.

Sample Input 0

1
12 3
2 3 4
Sample Output 0

4
Explanation 0

Initially there is a pile with  stones:

image

You can make a maximal  moves, described below:

Select  from  and split it into  equal piles of size  to get:
image
Select  from  and split a pile of size  into  equal piles of size  to get:
image

Repeat the previous move again on another pile of size  to get:
image

Repeat the move again on the last pile of size  to get:
image
As there are no more available moves, we print  (the number of moves) on a new line.


/* -------------------------- */

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
 * Complete the 'stoneDivision' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER n
 *  2. LONG_INTEGER_ARRAY s
 */

function stoneDivision(n, s) {
    const factors = new Set(s); // Create a set for faster lookups
    let moves = 0;
    
    function divide(current) {
        let totalMoves = 0;

        for (let factor of factors) {
            if (current % factor === 0) {
                const newPileSize = current / factor; // Split into equal smaller piles
                totalMoves++; // Count the split as a move
                totalMoves += divide(newPileSize); // Recursively divide the new piles
            }
        }

        return totalMoves;
    }

    moves = divide(n); // Start with the initial pile size
    return moves;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const m = parseInt(firstMultipleInput[1], 10);

        const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

        const result = stoneDivision(n, s);

        ws.write(result + '\n');
    }

    ws.end();
}
