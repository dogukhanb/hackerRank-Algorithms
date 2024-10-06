An Introduction to the Longest Increasing Subsequence Problem

The task is to find the length of the longest subsequence in a given array of integers such that all elements of the subsequence are sorted in strictly ascending order. This is called the Longest Increasing Subsequence (LIS) problem.

For example, the length of the LIS for  is  since the longest increasing subsequence is .

Here's a great YouTube video of a lecture from MIT's Open-CourseWare covering the topic.


This is one approach which solves this in quadratic time using dynamic programming. A more efficient algorithm which solves the problem in  time is available here.

Given a sequence of integers, find the length of its longest strictly increasing subsequence.

Function Description

Complete the longestIncreasingSubsequence function in the editor below. It should return an integer that denotes the array's LIS.

longestIncreasingSubsequence has the following parameter(s):

arr: an unordered array of integers
Input Format

The first line contains a single integer , the number of elements in .
Each of the next  lines contains an integer, 

Constraints

Output Format

Print a single line containing a single integer denoting the length of the longest increasing subsequence.

Sample Input 0

5
2
7
4
3
8
Sample Output 0

3
Explanation 0

In the array , the longest increasing subsequence is . It has a length of .

Sample Input 1

6
2
4
3
7
4
5
Sample Output 1

4
Explanation 1

The LIS of  is .



/* ------------------------------------ */


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
 * Complete the 'longestIncreasingSubsequence' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function longestIncreasingSubsequence(arr) {
    const lis = []; // This will hold the potential ends of the increasing subsequences

    for (let num of arr) {
        // Use binary search to find the first index in lis which is >= num
        let left = 0;
        let right = lis.length;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (lis[mid] < num) {
                left = mid + 1; // Search in the right half
            } else {
                right = mid; // Search in the left half
            }
        }

        // If left is equal to lis length, it means num is greater than all elements in lis
        if (left >= lis.length) {
            lis.push(num);
        } else {
            // Replace the found position with num
            lis[left] = num;
        }
    }

    return lis.length; // The length of lis array is the length of the longest increasing subsequence
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine().trim(), 10);
        arr.push(arrItem);
    }

    const result = longestIncreasingSubsequence(arr);

    ws.write(result + '\n');

    ws.end();
}

