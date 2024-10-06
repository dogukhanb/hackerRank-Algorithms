There are  piles of stones where the ith pile has  stones in it. Alice and Bob play the following game:

Alice starts, and they alternate turns.

In a turn, a player can choose any one of the piles of stones and divide the stones in it into any number of unequal piles such that no two of the newly created piles have the same number of stones. For example, if there 8 stones in a pile, it can be divided into one of these set of piles:  or . 

The player who cannot make a move (because all the remaining piles are indivisible) loses the game.

Given the starting set of piles, who wins the game assuming both players play optimally (that means they will not make a move that causes them to lose the game if some better, winning move exists)?

Input Format

The first line contains the number of test cases .  test cases follow. The first line for each test case contains , the number of piles initially. The next line contains  space delimited numbers, the number of stones in each of the piles.

Constraints

Output Format

Output  lines, one corresponding to each test case containing ALICE if Alice wins the game and BOB otherwise.

Sample Input

4  
1  
4  
2  
1 2  
3  
1 3 4  
1  
8
Sample Output

BOB  
BOB  
ALICE  
BOB
Explanation

For the first case, the only possible move for Alice is (4) -> (1,3). Now Bob breaks up the pile with 3 stones into (1,2). At this point Alice cannot make any move and has lost.

 /* ------------------------- */

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
 * Complete the 'stonePiles' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function getGrundy(n) {
    if (n <= 1) return 0; // base case for piles of size 0 or 1

    const grundy = new Array(n + 1).fill(0);
    for (let i = 2; i <= n; i++) {
        const seen = new Set();
        // Try all ways to split i into unequal parts
        for (let j = 1; j < i; j++) {
            // the other part is (i - j)
            if (j < i - j) {
                seen.add(grundy[j] ^ grundy[i - j]);
            }
        }
        // Determine the mex
        let mex = 0;
        while (seen.has(mex)) {
            mex++;
        }
        grundy[i] = mex;
    }
    return grundy[n];
}

function stonePiles(arr) {
    let xorSum = 0;
    
    for (let i = 0; i < arr.length; i++) {
        xorSum ^= getGrundy(arr[i]);
    }
    
    return xorSum === 0 ? "BOB" : "ALICE";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const arrCount = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = stonePiles(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
