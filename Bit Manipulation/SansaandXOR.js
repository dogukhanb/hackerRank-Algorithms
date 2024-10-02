Sansa has an array. She wants to find the value obtained by XOR-ing the contiguous subarrays, followed by XOR-ing the values thus obtained. Determine this value.

Example

Subarray	Operation	Result
3		None		3
4		None		4
5		None		5
3,4		3 XOR 4		7
4,5		4 XOR 5		1
3,4,5		3 XOR 4 XOR 5	2
Now we take the resultant values and XOR them together:

. Return .

Function Description

Complete the sansaXor function in the editor below.

sansaXor has the following parameter(s):

int arr[n]: an array of integers
Returns

int: the result of calculations
Input Format

The first line contains an integer , the number of the test cases.

Each of the next  pairs of lines is as follows:
- The first line of each test case contains an integer , the number of elements in .
- The second line of each test case contains  space-separated integers .

Constraints




Sample Input 0

2
3
1 2 3
4
4 5 7 5
Sample Output 0

2
0
Explanation 0

Test case 0:


Test case 1:

Sample Input 1

2
3
98 74 12
3
50 13 2
Sample Output 1

110
48
Explanation 1

Test Case 0:


Test Case 1:

/* ----------------------------------- */

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
 * Complete the 'sansaXor' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function sansaXor(arr) {
    let n = arr.length;
    let result = 0;

    // Loop through each element in the array
    for (let i = 0; i < n; i++) {
        // Calculate the number of subarrays that include arr[i]
        let count = (i + 1) * (n - i);
        
        // If count is odd, include the element in the result
        if (count % 2 === 1) {
            result ^= arr[i];
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);
        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
        const result = sansaXor(arr);
        ws.write(result + '\n');
    }

    ws.end();
}



