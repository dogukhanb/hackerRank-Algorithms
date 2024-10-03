In this challenge, you will be given an array  and must determine an array . There is a special rule: For all , . That is,  can be any number you choose such that . Your task is to select a series of  given  such that the sum of the absolute difference of consecutive pairs of  is maximized. This will be the array's cost, and will be represented by the variable  below.

The equation can be written:

For example, if the array , we know that , , and . Arrays meeting those guidelines are:

[1,1,1], [1,1,2], [1,1,3]
[1,2,1], [1,2,2], [1,2,3]
Our calculations for the arrays are as follows:

|1-1| + |1-1| = 0	|1-1| + |2-1| = 1	|1-1| + |3-1| = 2
|2-1| + |1-2| = 2	|2-1| + |2-2| = 1	|2-1| + |3-2| = 2
The maximum value obtained is .

Function Description

Complete the cost function in the editor below. It should return the maximum value that can be obtained.

cost has the following parameter(s):

B: an array of integers
Input Format

The first line contains the integer , the number of test cases.

Each of the next  pairs of lines is a test case where:
- The first line contains an integer , the length of 
- The next line contains  space-separated integers 

Constraints

Output Format

For each test case, print the maximum sum on a separate line.

Sample Input

1
5
10 1 10 1 10
Sample Output

36
Explanation

The maximum sum occurs when A[1]=A[3]=A[5]=10 and A[2]=A[4]=1. That is .


 /* -------------------------------*/

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
 * Complete the 'cost' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY B as parameter.
 */
function cost(B) {
    let totalCost = 0;
    const n = B.length;

    // To maximize cost, we will alternate the values as discussed
    for (let i = 0; i < n - 1; i++) {
        if (i % 2 === 0) { // Even index
            totalCost += Math.abs(B[i] - 1); // Use maximum from B[i]
        } else { // Odd index
            totalCost += Math.abs(1 - B[i]); // Use minimum, which is 1
        }
    }

    // Adjusting for the last element if it is odd indexed
    if (n % 2 === 0) {
        totalCost += Math.abs(B[n - 1] - 1);
    }

    return totalCost;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);
        const B = readLine().replace(/\s+$/g, '').split(' ').map(BTemp => parseInt(BTemp, 10));

        const result = cost(B);
        ws.write(result + '\n');
    }

    ws.end();
}
