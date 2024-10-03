Alice is a kindergarten teacher. She wants to give some candies to the children in her class.  All the children sit in a line and each of them has a rating score according to his or her performance in the class.  Alice wants to give at least 1 candy to each child. If two children sit next to each other, then the one with the higher rating must get more candies. Alice wants to minimize the total number of candies she must buy.

Example


She gives the students candy in the following minimal amounts: . She must buy a minimum of 10 candies.

Function Description

Complete the candies function in the editor below.

candies has the following parameter(s):

int n: the number of children in the class
int arr[n]: the ratings of each student
Returns

int: the minimum number of candies Alice must buy
Input Format

The first line contains an integer, , the size of .
Each of the next  lines contains an integer  indicating the rating of the student at position .

Constraints

Sample Input 0

3
1
2
2
Sample Output 0

4
Explanation 0

Here 1, 2, 2 is the rating. Note that when two children have equal rating, they are allowed to have different number of candies. Hence optimal distribution will be 1, 2, 1.

Sample Input 1

10
2
4
2
6
1
7
8
9
2
1
Sample Output 1

19
Explanation 1

Optimal distribution will be 

Sample Input 2

8
2
4
3
5
2
6
4
5
Sample Output 2

12
Explanation 2

Optimal distribution will be .

 /* -------------------------------- */

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
 * Complete the 'candies' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY arr
 */

function candies(n, arr) {
    // Initialize candies array
    const candies = new Array(n).fill(1);
    
    // First pass: left to right
    for (let i = 1; i < n; i++) {
        if (arr[i] > arr[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Second pass: right to left
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] > arr[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    // Calculate the total number of candies
    return candies.reduce((sum, candy) => sum + candy, 0);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine().trim(), 10);
        arr.push(arrItem);
    }

    const result = candies(n, arr);

    ws.write(result + '\n');

    ws.end();
}
