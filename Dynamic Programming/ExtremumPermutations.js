Let's consider a permutation P = {p1, p2, ..., pN} of the set of N = {1, 2, 3, ..., N} elements .

P is called a magic set if it satisfies both of the following constraints:

Given a set of K integers, the elements in positions a1, a2, ..., aK are less than their adjacent elements, i.e., pai-1 > pai < pai+1
Given a set of L integers, elements in positions b1, b2, ..., bL are greater than their adjacent elements, i.e., pbi-1 < pbi > pbi+1
How many such magic sets are there?

Input Format
The first line of input contains three integers N, K, L separated by a single space.
The second line contains K integers, a1, a2, ... aK each separated by single space.
the third line contains L integers, b1, b2, ... bL each separated by single space.

Output Format
Output the answer modulo 1000000007 (109+7).

Constraints
3 <= N <= 5000
1 <= K, L <= 5000
2 <= ai, bj <= N-1, where i ∈ [1, K] AND j ∈ [1, L]

Sample Input #00

4 1 1
2
3
Sample Output #00

5
Explanation #00

Here, N = 4 a1 = 2 and b1 = 3. The 5 permutations of {1,2,3,4} that satisfy the condition are

2 1 4 3
3 2 4 1
4 2 3 1
3 1 4 2
4 1 3 2
Sample Input #01

10 2 2
2 4
3 9
Sample Output #01

161280


 /* -------------------------------- */

 'use strict';

const fs = require('fs');
const MOD = 1000000007;

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

// Precompute factorials and inverse factorials
function precomputeFactorials(n) {
    const fact = new Array(n + 1).fill(1);
    const invFact = new Array(n + 1).fill(1);
   
    for (let i = 2; i <= n; i++) {
        fact[i] = (fact[i - 1] * i) % MOD;
    }

    invFact[n] = power(fact[n], MOD - 2); // Fermat's Little Theorem
    for (let i = n - 1; i >= 1; i--) {
        invFact[i] = (invFact[i + 1] * (i + 1)) % MOD;
    }

    return { fact, invFact };
}

// Fast exponentiation
function power(x, y) {
    let result = 1;
    x = x % MOD;
    while (y > 0) {
        if (y & 1) {
            result = (result * x) % MOD;
        }
        y = y >> 1;
        x = (x * x) % MOD;
    }
    return result;
}

function extremumPermutations(n, a, b) {
    const k = a.length;
    const l = b.length;
   
    const { fact, invFact } = precomputeFactorials(n);

    // Mark positions for local minima and maxima
    const localMinima = new Set(a);
    const localMaxima = new Set(b);

    // Total positions occupied by local minima and maxima
    const occupiedPositions = new Set([...localMinima, ...localMaxima]);

    const remainingNumbers = n - occupiedPositions.size;

    // Check if we have more constraints than available positions
    if (k + l > n) return 0;

    // Calculate the number of valid arrangements
    let validArrangements = fact[n];

    // For each local minima, it can be surrounded by elements larger than it.
    // For each local maxima, it can be surrounded by elements smaller than it.

    // For positions counted as minima, we must select unique numbers
    for (let pos of localMinima) {
        validArrangements = (validArrangements * invFact[1]) % MOD; // min 1
    }

    // For positions counted as maxima, we must select unique numbers
    for (let pos of localMaxima) {
        validArrangements = (validArrangements * invFact[1]) % MOD; // max 1
    }

    // Remaining positions can take remaining numbers
    validArrangements = (validArrangements * fact[remainingNumbers]) % MOD;

    return validArrangements;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);
    const l = parseInt(firstMultipleInput[2], 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));
    const b = readLine().replace(/\s+$/g, '').split(' ').map(bTemp => parseInt(bTemp, 10));

    const result = extremumPermutations(n, a, b);

    ws.write(result + '\n');
    ws.end();
}