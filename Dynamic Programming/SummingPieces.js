Consider an array, , of length . We can split  into contiguous segments called pieces and store them as another array, . For example, if , we have the following arrays of pieces:

 contains three -element pieces.
 contains two pieces, one having  elements and the other having  element.
 contains two pieces, one having  element and the other having  elements.
 contains one -element piece.
We consider the value of a piece in some array  to be , and we consider the total value of some array  to be the sum of the values for all pieces in that . For example, the total value of  is .

Given , find the total values for all possible 's, sum them together, and print this sum modulo  on a new line.

Input Format

The first line contains a single integer, , denoting the size of array .
The second line contains  space-separated integers describing the respective values in  (i.e., ).

Constraints

Output Format

Print a single integer denoting the sum of the total values for all piece arrays ('s) of , modulo .

Sample Input 0

3
1 3 6
Sample Output 0

73
Explanation 0
Given , our piece arrays are:

, and .
, and .
, and .
, and .
When we sum all the total values, we get . Thus, we print the result of  on a new line.

Sample Input 1

5
4 2 9 10 1
Sample Output 1

971


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
 * Complete the 'summingPieces' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function summingPieces(arr) {
    const MOD = 1000000007;
    const n = arr.length;

    let totalSum = 0;

    // Prefix sums
    const prefixSum = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = (prefixSum[i] + arr[i]) % MOD;
    }

    for (let i = 0; i < n; i++) {
        // Calculate contribution of arr[i]
        const leftCount = i + 1; // Number of ways to start a piece that includes arr[i]
        const rightCount = n - i; // Number of ways to end a piece that includes arr[i]
        
        // The contribution of arr[i] to the total value of all pieces
        const contribution = (arr[i] * leftCount * rightCount) % MOD;

        // Total sum contribution
        totalSum = (totalSum + contribution) % MOD;
    }

    // Now, we need to multiply this by the sum of all pieces
    // The total value of pieces can be calculated using prefix sums
    let result = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            const pieceSum = (prefixSum[j + 1] - prefixSum[i] + MOD) % MOD; // sum from i to j
            const pieceLength = j - i + 1;
            const pieceValue = (pieceSum * pieceLength) % MOD; // value of the piece
            result = (result + pieceValue) % MOD; // sum total
        }
    }

    return (result + totalSum) % MOD;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = summingPieces(arr);

    ws.write(result + '\n');
    ws.end();
}
