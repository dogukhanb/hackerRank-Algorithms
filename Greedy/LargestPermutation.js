You are given an unordered array of unique integers incrementing from . You can swap any two elements a limited number of times. Determine the largest lexicographical value array that can be created by executing no more than the limited number of swaps.

Example


The following arrays can be formed by swapping the  with the other elements:

[2,1,3,4]
[3,2,1,4]
[4,2,3,1]
The highest value of the four (including the original) is . If , we can swap to the highest possible value: .

Function Description

Complete the largestPermutation function in the editor below. It must return an array that represents the highest value permutation that can be formed.

largestPermutation has the following parameter(s):

int k: the maximum number of swaps
int arr[n]: an array of integers
Input Format

The first line contains two space-separated integers  and , the length of  and the maximum swaps that can be performed. The second line contains  distinct space-separated integers from  to  as  where .

Constraints



Output Format

Print the lexicographically largest permutation you can make with at most  swaps.
Sample Input 0

STDIN       Function
-----       --------
5 1         n = 5, k = 1
4 2 3 5 1   arr = [4, 2, 3, 5, 1]
Sample Output 0

5 2 3 4 1
Explanation 0

You can swap any two numbers in  and see the largest permutation is 

Sample Input 1

3 1
2 1 3
Sample Output 1

3 1 2
Explanation 1

With 1 swap we can get ,  and . Of these,  is the largest permutation.

Sample Input 2

2 1
2 1
Sample Output 2

2 1
Explanation 2

We can see that  is already the largest permutation. We don't make any swaps.

/* ----------------------------------------- */

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
 * Complete the 'largestPermutation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */
function largestPermutation(k, arr) {
    const n = arr.length;
    const indexMap = new Map();

    // Map each value to its index for quick access
    for (let i = 0; i < n; i++) {
        indexMap.set(arr[i], i);
    }

    for (let i = 0; i < n && k > 0; i++) {
        const expectedValue = n - i; // The largest value that should be here
        if (arr[i] !== expectedValue) {
            const currentIndex = indexMap.get(expectedValue);

            // Swap the elements
            [arr[i], arr[currentIndex]] = [arr[currentIndex], arr[i]];

            // Update their indices in the map
            indexMap.set(arr[currentIndex], currentIndex);
            indexMap.set(arr[i], i);

            // Decrement the number of swaps left
            k--;
        }
    }

    return arr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);
    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = largestPermutation(k, arr);

    ws.write(result.join(' ') + '\n');
    ws.end();
}
