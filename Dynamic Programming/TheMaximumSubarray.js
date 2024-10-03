We define subsequence as any subset of an array. We define a subarray as a contiguous subsequence in an array.

Given an array, find the maximum possible sum among:

all nonempty subarrays.
all nonempty subsequences.
Print the two values as space-separated integers on one line.

Note that empty subarrays/subsequences should not be considered.

Example

The maximum subarray sum is comprised of elements at inidices . Their sum is . The maximum subsequence sum is comprised of elements at indices  and their sum is .

Function Description

Complete the maxSubarray function in the editor below.

maxSubarray has the following parameter(s):

int arr[n]: an array of integers
Returns

int[2]: the maximum subarray and subsequence sums
Input Format

The first line of input contains a single integer , the number of test cases.

The first line of each test case contains a single integer .
The second line contains  space-separated integers  where .

Constraints

The subarray and subsequences you consider should have at least one element.

Sample Input 0

2
4
1 2 3 4
6
2 -1 2 3 4 -5
Sample Output 0

10 10
10 11
Explanation 0

In the first case: The maximum sum for both types of subsequences is just the sum of all the elements since they are all positive.

In the second case: The subarray  is the subarray with the maximum sum, and  is the subsequence with the maximum sum.

Sample Input 1

1
5
-2 -3 -1 -4 -6
Sample Output 1

-1 -1
Explanation 1

Since all of the numbers are negative, both the maximum subarray and maximum subsequence sums are made up of one element, .

 /* ------------------------ */

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
 * Complete the 'maxSubarray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function maxSubarray(arr) {
    let maxSubarraySum = arr[0];
    let currentSubarraySum = arr[0];
    let maxSubsequenceSum = arr[0] > 0 ? arr[0] : 0;
   
    // Iterate through the array to calculate the max subarray sum
    for (let i = 1; i < arr.length; i++) {
        currentSubarraySum = Math.max(arr[i], currentSubarraySum + arr[i]);
        maxSubarraySum = Math.max(maxSubarraySum, currentSubarraySum);
       
        // Calculate max subsequence sum
        if (arr[i] > 0) {
            maxSubsequenceSum += arr[i];
        }
    }

    // If all numbers are negative, maxSubsequenceSum should be the max element
    if (maxSubsequenceSum === 0) {
        maxSubsequenceSum = Math.max(...arr);
    }

    return [maxSubarraySum, maxSubsequenceSum];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = maxSubarray(arr);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
