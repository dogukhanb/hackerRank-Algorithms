Given an array of integers, determine the minimum number of elements to delete to leave only elements of equal value.

Example


Delete the  elements  and  leaving . If both twos plus either the  or the  are deleted, it takes  deletions to leave either  or . The minimum number of deletions is .

Function Description

Complete the equalizeArray function in the editor below.

equalizeArray has the following parameter(s):

int arr[n]: an array of integers
Returns

int: the minimum number of deletions required
Input Format

The first line contains an integer , the number of elements in .
The next line contains  space-separated integers .

Constraints

Sample Input

STDIN       Function
-----       --------
5           arr[] size n = 5
3 3 2 1 3   arr = [3, 3, 2, 1, 3]
Sample Output

2   
Explanation

Delete  and  to leave . This is minimal. The only other options are to delete  elements to get an array of either  or .


/* ------------------------------------------------------ */

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
 * Complete the 'equalizeArray' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function equalizeArray(arr) {
    // Count the frequency of each element
    const frequencyMap = {};
    for (const num of arr) {
        if (frequencyMap[num]) {
            frequencyMap[num]++;
        } else {
            frequencyMap[num] = 1;
        }
    }

    // Find the maximum frequency
    let maxFrequency = 0;
    for (const key in frequencyMap) {
        if (frequencyMap[key] > maxFrequency) {
            maxFrequency = frequencyMap[key];
        }
    }

    // Calculate the minimum deletions required
    return arr.length - maxFrequency;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = equalizeArray(arr);

    ws.write(result + '\n');

    ws.end();
}
