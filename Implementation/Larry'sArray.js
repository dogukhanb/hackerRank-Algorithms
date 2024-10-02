Larry has been given a permutation of a sequence of natural numbers incrementing from  as an array. He must determine whether the array can be sorted using the following operation any number of times:

Choose any  consecutive indices and rotate their elements in such a way that .
For example, if :

A		rotate 
[1,6,5,2,4,3]	[6,5,2]
[1,5,2,6,4,3]	[5,2,6]
[1,2,6,5,4,3]	[5,4,3]
[1,2,6,3,5,4]	[6,3,5]
[1,2,3,5,6,4]	[5,6,4]
[1,2,3,4,5,6]

YES
On a new line for each test case, print YES if  can be fully sorted. Otherwise, print NO.

Function Description

Complete the larrysArray function in the editor below. It must return a string, either YES or NO.

larrysArray has the following parameter(s):

A: an array of integers
Input Format

The first line contains an integer , the number of test cases.

The next  pairs of lines are as follows:

The first line contains an integer , the length of .
The next line contains  space-separated integers .
Constraints

 integers that increment by  from  to 
Output Format

For each test case, print YES if  can be fully sorted. Otherwise, print NO.

Sample Input

3
3
3 1 2
4
1 3 4 2
5
1 2 3 5 4
Sample Output

YES
YES
NO
Explanation

In the explanation below, the subscript of  denotes the number of operations performed.

Test Case 0:

 is now sorted, so we print  on a new line.

Test Case 1:
.
.
 is now sorted, so we print  on a new line.

Test Case 2:
No sequence of rotations will result in a sorted . Thus, we print  on a new line.


/* -----------------------------*/ 

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
 * Complete the 'larrysArray' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY A as parameter.
 */

function larrysArray(A) {
    let inversions = 0;
    const n = A.length;

    // Count inversions
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (A[i] > A[j]) {
                inversions++;
            }
        }
    }

    // Determine if the number of inversions is even or odd
    if (inversions % 2 === 0) {
        return 'YES';
    } else {
        return 'NO';
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

        const result = larrysArray(A);

        ws.write(result + '\n');
    }

    ws.end();
}
