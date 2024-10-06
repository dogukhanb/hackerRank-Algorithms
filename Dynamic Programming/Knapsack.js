Given an array of integers and a target sum, determine the sum nearest to but not exceeding the target that can be created. To create the sum, use any element of your array zero or more times.

For example, if  and your target sum is , you might select  or . In this case, you can arrive at exactly the target.

Function Description

Complete the unboundedKnapsack function in the editor below. It must return an integer that represents the sum nearest to without exceeding the target value.

unboundedKnapsack has the following parameter(s):

k: an integer
arr: an array of integers
Input Format

The first line contains an integer , the number of test cases.

Each of the next  pairs of lines are as follows:
- The first line contains two integers  and , the length of  and the target sum.
- The second line contains  space separated integers .

Constraints



Output Format

Print the maximum sum for each test case which is as near as possible, but not exceeding, to the target sum on a separate line.

Sample Input

2
3 12
1 6 9
5 9
3 4 4 4 8
Sample Output

12
9
Explanation

In the first test case, one can pick {6, 6}. In the second, we can pick {3,3,3}.



 /* ------------------------------ */


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
 * Complete the 'unboundedKnapsack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function unboundedKnapsack(k, arr) {
    const dp = new Array(k + 1).fill(0);
   
    for (let i = 1; i <= k; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] <= i) {
                dp[i] = Math.max(dp[i], dp[i - arr[j]] + arr[j]);
            }
        }
    }

    return dp[k];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const k = parseInt(firstMultipleInput[1], 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = unboundedKnapsack(k, arr);

        ws.write(result + '\n');
    }

    ws.end();
}