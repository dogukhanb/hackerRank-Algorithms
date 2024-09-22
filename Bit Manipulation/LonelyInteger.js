Given an array of integers, where all elements but one occur twice, find the unique element.

Example

The unique element is .

Function Description

Complete the lonelyinteger function in the editor below.

lonelyinteger has the following parameter(s):

int a[n]: an array of integers
Returns

int: the element that occurs only once
Input Format

The first line contains a single integer, , the number of integers in the array.
The second line contains  space-separated integers that describe the values in .

Constraints

It is guaranteed that  is an odd number and that there is one unique element.
, where .
Sample Input 0

1
1
Sample Output 0

1
Explanation 0

There is only one element in the array, thus it is unique.

Sample Input 1

3
1 1 2
Sample Output 1

2
Explanation 1

We have two 's, and  is unique.

Sample Input 2

5
0 0 1 2 1
Sample Output 2

2
Explanation 2

We have two 's, two 's, and one .  is unique.

/* ---------------------------------------------- */

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
 * Complete the 'lonelyinteger' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */
function lonelyinteger(a) {
    let unique = 0; // Initialize the unique value to 0

    // XOR all elements in the array
    for (let num of a) {
        unique ^= num;
    }

    return unique; // The result will be the unique element
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = lonelyinteger(a);

    ws.write(result + '\n');

    ws.end();
}

