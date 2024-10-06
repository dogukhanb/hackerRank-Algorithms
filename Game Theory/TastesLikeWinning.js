Stephanie just learned about a game called Nim in which there are two players and  piles of stones. During each turn, a player must choose any non-empty pile and take as many stones as they want. The first player who cannot complete their turn (i.e., because all piles are empty) loses.

Stephanie knows that, for each start position in this game, it's possible to know which player will win (i.e., the first or second player) if both players play optimally. Now she wants to know the number of different games that exist that satisfy all of the following conditions:

The game starts with  non-empty piles and each pile contains less than  stones.
All the piles contain pairwise different numbers of stones.
The first player wins if that player moves optimally.
Help Stephanie by finding and printing the number of such games satisfying all the above criteria, modulo .

Input Format

The first line contains two space-separated integers describing the respective values of  and .

Constraints

Output Format

Print the number of such games, modulo .

Sample Input 0

2 2
Sample Output 0

6
Explanation 0

We want to know the number of games with  piles where each pile contains  stones. There are six such possible games with the following distributions of stones: . Thus, we print the result of  as our answer.


 /* ----------------------------- */

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
 * Complete the 'tastesLikeWinning' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 */

function tastesLikeWinning(n, m) {
    const MOD = 1000000007;
    
    // Generate all unique numbers from 1 to m-1
    const stones = Array.from({ length: m - 1 }, (_, i) => i + 1);
    const totalCount = stones.length;

    // Function to calculate combinations (nCr)
    function combinations(n, r) {
        if (r > n) return 0;
        let num = 1, denom = 1;
        for (let i = 0; i < r; i++) {
            num = (num * (n - i)) % MOD;
            denom = (denom * (i + 1)) % MOD;
        }
        return (num * modInverse(denom, MOD)) % MOD;
    }

    // Function to calculate modular inverse
    function modInverse(a, mod) {
        let m0 = mod, y = 0, x = 1;
        if (mod === 1) return 0;
        while (a > 1) {
            // q is quotient
            let q = Math.floor(a / mod);
            let t = mod;
            // m is remainder now, process same as Euclid's algorithm
            mod = a % mod;
            a = t;
            t = y;
            // Update x and y
            y = x - q * y;
            x = t;
        }
        // Make x positive
        if (x < 0) x += m0;
        return x;
    }

    let winningConfigurations = 0;

    // Generate combinations of size n
    const comb = (start, selected) => {
        if (selected.length === n) {
            // Calculate Nim-sum
            const nimSum = selected.reduce((acc, val) => acc ^ val, 0);
            if (nimSum !== 0) {
                winningConfigurations = (winningConfigurations + 1) % MOD;
            }
            return;
        }
        for (let i = start; i < totalCount; i++) {
            comb(i + 1, [...selected, stones[i]]);
        }
    };

    comb(0, []);
    
    return winningConfigurations;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);

    const result = tastesLikeWinning(n, m);

    ws.write(result + '\n');
    ws.end();
}
