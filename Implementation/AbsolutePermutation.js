We define  to be a permutation of the first  natural numbers in the range . Let  denote the value at position  in permutation  using -based indexing.

 is considered to be an absolute permutation if  holds true for every .

Given  and , print the lexicographically smallest absolute permutation . If no absolute permutation exists, print -1.

Example


Create an array of elements from  to , . Using  based indexing, create a permutation where every . It can be rearranged to  so that all of the absolute differences equal :

pos[i]  i   |pos[i] - i|
  3     1        2
  4     2        2
  1     3        2
  2     4        2
Function Description

Complete the absolutePermutation function in the editor below.

absolutePermutation has the following parameter(s):

int n: the upper bound of natural numbers to consider, inclusive
int k: the absolute difference between each element's value and its index
Returns

int[n]: the lexicographically smallest permutation, or  if there is none
Input Format

The first line contains an integer , the number of queries.
Each of the next  lines contains  space-separated integers,  and .

Constraints

Sample Input

STDIN   Function
-----   --------
3       t = 3 (number of queries)
2 1     n = 2, k = 1
3 0     n = 3, k = 0
3 2     n = 3, k = 2
Sample Output

2 1
1 2 3
-1
Explanation

Test Case 0:

perm.png

Test Case 1:

perm(1).png

Test Case 2:
No absolute permutation exists, so we print -1 on a new line.

/* ---------------------------------------------------- */
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
 * Complete the 'absolutePermutation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 */

function absolutePermutation(n, k) {
    if (k === 0) {
        // If k is 0, the permutation is simply 1 to n
        return Array.from({ length: n }, (_, i) => i + 1);
    }
    
    if (n % (2 * k) !== 0) {
        // If n is not divisible by 2k, return -1
        return [-1];
    }
    
    const permutation = new Array(n);
    
    // Fill the permutation
    for (let i = 1; i <= n; i++) {
        if ((i - 1) % (2 * k) < k) {
            // For the first k positions of the block
            permutation[i - 1] = i + k;
        } else {
            // For the second k positions of the block
            permutation[i - 1] = i - k;
        }
    }
    
    return permutation;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const k = parseInt(firstMultipleInput[1], 10);

        const result = absolutePermutation(n, k);
        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
