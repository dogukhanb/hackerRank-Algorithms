Given a sequence of integers , a triplet  is beautiful if:

Given an increasing sequenc of integers and the value of , count the number of beautiful triplets in the sequence.

Example


There are three beautiful triplets, by index: . To test the first triplet,  and .

Function Description

Complete the beautifulTriplets function in the editor below.

beautifulTriplets has the following parameters:

int d: the value to match
int arr[n]: the sequence, sorted ascending
Returns

int: the number of beautiful triplets
Input Format

The first line contains  space-separated integers,  and , the length of the sequence and the beautiful difference.
The second line contains  space-separated integers .

Constraints

Sample Input

STDIN           Function
-----           --------
7 3             arr[] size n = 7, d = 3
1 2 4 5 7 8 10  arr = [1, 2, 4, 5, 7, 8, 10]
Sample Output

3
Explanation

There are many possible triplets , but our only beautiful triplets are  ,  and  by value, not index. Please see the equations below:




Recall that a beautiful triplet satisfies the following equivalence relation:  where .


/* ------------------------------------------------- */


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
 * Complete the 'beautifulTriplets' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER d
 *  2. INTEGER_ARRAY arr
 */
function beautifulTriplets(d, arr) {
    const numbers = new Set(arr);  // Create a set from the array for O(1) lookups
    let count = 0;

    // Iterate through each number in the array
    for (const number of arr) {
        // Check if both number+d and number+2d are in the set
        if (numbers.has(number + d) && numbers.has(number + 2 * d)) {
            count++;
        }
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const d = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = beautifulTriplets(d, arr);

    ws.write(result + '\n');
    ws.end();
}
