Given an array of integers and a target value, determine the number of pairs of array elements that have a difference equal to the target value.

Example


There are three values that differ by : , , and . Return .

Function Description

Complete the pairs function below.

pairs has the following parameter(s):

int k: an integer, the target difference
int arr[n]: an array of integers
Returns

int: the number of pairs that satisfy the criterion
Input Format

The first line contains two space-separated integers  and , the size of  and the target value.
The second line contains  space-separated integers of the array .

Constraints

each integer  will be unique
Sample Input

STDIN       Function
-----       --------
5 2         arr[] size n = 5, k =2
1 5 3 4 2   arr = [1, 5, 3, 4, 2]
Sample Output

3
Explanation

There are 3 pairs of integers in the set with a difference of 2: [5,3], [4,2] and [3,1]. .


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
 * Complete the 'pairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */
function pairs(k, arr) {
    const numbers = new Set(arr);
    let count = 0;

    for (const number of arr) {
        if (numbers.has(number + k)) {
            count++;
        }
        if (numbers.has(number - k)) {
            count++;
        }
    }

    // Since each pair is counted twice (once for each element), divide the count by 2
    return count / 2;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = pairs(k, arr);

    ws.write(result + '\n');

    ws.end();
}