Laurel and Hardy have  piles of chocolates with each pile containing some number of chocolates. The piles are arranged from left to right in a non decreasing order based on the number of chocolates in each pile. They play the following game.

For every continuous subsequence of chocolate piles (at least 2 piles form a subsequence), Laurel and Hardy will play game on this subsequence of chocolate piles, Laurel plays first, and they play in turn. In one move, the player can choose one of the piles and remove at least one chocolate from it, but the non-decreasing order of the chocolate piles must be maintained. The last person to make a valid move wins.

How many continuous subsequences of chocolate piles will Laurel win if both of them play optimally? The number of chocolates of each pile will be recovered after the game ends for each subsequences.

Input Format

The first line contains an integer  denoting the number of piles.
The second line contains the number of chocolates in each pile, arranged from left to right and separated by a single space between them.

Constraints

 ≤  ≤ 
 ≤     ≤ 

Output Format

A single integer denoting the number of continuous subsequences of chocolate piles in which Laurel will win.

Sample Input

5
1 1 2 2 3
Sample Output

5
Explanation

Of the 10 continuous-sub-sequence of chocolate piles,

Laurel loses in [1,1], [1,1,2], [1,1,2,2], [1,2,2,3], [2,2] and
wins in [1,1,2,2,3], [1,2], [1,2,2], [2,2,3] and [2,3] and hence 5.


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
 * Complete the 'chocolateGame' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function chocolateGame(arr) {
    const n = arr.length;
    let winningCount = 0;

    // Loop through all possible subsequences
    for (let start = 0; start < n; start++) {
        for (let end = start + 1; end < n; end++) {
            const subsequence = arr.slice(start, end + 1);
            if (canLaurelWin(subsequence)) {
                winningCount++;
            }
        }
    }

    return winningCount;
}

// Function to determine if Laurel can win given a subsequence
function canLaurelWin(subseq) {
    const nimSum = calculateNimSum(subseq);
    return nimSum !== 0; // Laurel wins if nimSum is non-zero
}

// Function to calculate the nim sum for a given subsequence
function calculateNimSum(subseq) {
    const pileCount = subseq.length;
    let nimSum = 0;

    for (let i = 0; i < pileCount; i++) {
        nimSum ^= subseq[i]; // XOR operation to calculate nim sum
    }

    return nimSum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);
    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = chocolateGame(arr);
    ws.write(result + '\n');
    ws.end();
}
