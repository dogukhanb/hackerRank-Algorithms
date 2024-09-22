You are given two arrays,  and , both containing  integers.

A pair of indices  is beautiful if the  element of array  is equal to the  element of array . In other words, pair  is beautiful if and only if . A set containing beautiful pairs is called a beautiful set.

A beautiful set is called pairwise disjoint if for every pair  belonging to the set there is no repetition of either  or  values. For instance, if  and  the beautiful set  is not pairwise disjoint as there is a repetition of , that is .

Your task is to change exactly  element in  so that the size of the pairwise disjoint beautiful set is maximum.

Function Description

Complete the beautifulPairs function in the editor below. It should return an integer that represents the maximum number of pairwise disjoint beautiful pairs that can be formed.

beautifulPairs has the following parameters:

A: an array of integers
B: an array of integers
Input Format

The first line contains a single integer , the number of elements in  and .
The second line contains  space-separated integers .
The third line contains  space-separated integers .

Constraints

Output Format

Determine and print the maximum possible number of pairwise disjoint beautiful pairs.

Note: You must first change  element in , and your choice of element must be optimal.

Sample Input 0

4
1 2 3 4
1 2 3 3
Sample Output 0

4
Explanation 0

You are given  and .
The beautiful set is  and maximum sized pairwise disjoint beautiful set is either  or .
We can do better. We change the  element of array  from  to . Now new B array is:  and the pairwise disjoint beautiful set is . So, the answer is 4.
Note that we could have also selected index 3 instead of index 2 but it would have yeilded the same result. Any other choice of index is not optimal.

Sample Input 1

6
3 5 7 11 5 8
5 7 11 10 5 8
Sample Output 1

6

/* ----------------------------------------------- */


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
 * Complete the 'beautifulPairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY A
 *  2. INTEGER_ARRAY B
 */
function beautifulPairs(A, B) {
    const countA = {};
    const countB = {};

    // Count frequencies of elements in A
    for (const num of A) {
        countA[num] = (countA[num] || 0) + 1;
    }

    // Count frequencies of elements in B
    for (const num of B) {
        countB[num] = (countB[num] || 0) + 1;
    }

    // Count initial beautiful pairs
    let initialBeautifulPairs = 0;
    for (const key in countB) {
        if (countA[key]) {
            initialBeautifulPairs += Math.min(countA[key], countB[key]);
        }
    }

    // Maximum pairs starting from initial
    let maxBeautifulPairs = initialBeautifulPairs;

    // Check if we can increase the count of beautiful pairs
    if (initialBeautifulPairs < A.length) {
        // We can change one element in A to any element not in B
        maxBeautifulPairs = initialBeautifulPairs + 1;
    } else if (initialBeautifulPairs === A.length) {
        // If we already have all pairs beautiful, changing one in A to any different value
        maxBeautifulPairs = initialBeautifulPairs - 1; // Reduce by one, since we would lose a pair
    }

    return maxBeautifulPairs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));
    const B = readLine().replace(/\s+$/g, '').split(' ').map(BTemp => parseInt(BTemp, 10));

    const result = beautifulPairs(A, B);
    ws.write(result + '\n');

    ws.end();
}
