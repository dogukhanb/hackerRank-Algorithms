Insertion Sort is a simple sorting technique which was covered in previous challenges. Sometimes, arrays may be too large for us to wait around for insertion sort to finish. Is there some other way we can calculate the number of shifts an insertion sort performs when sorting an array?

If  is the number of elements over which the  element of the array has to shift, then the total number of shifts will be  ... + .

Example

Array		Shifts
[4,3,2,1]	
[3,4,2,1]	1
[2,3,4,1]	2
[1,2,3,4]	3

Total shifts = 1 + 2 + 3 = 6
Function description

Complete the insertionSort function in the editor below.

insertionSort has the following parameter(s):

int arr[n]: an array of integers
Returns
- int: the number of shifts required to sort the array

Input Format

The first line contains a single integer , the number of queries to perform.

The following  pairs of lines are as follows:

The first line contains an integer , the length of .
The second line contains  space-separated integers .
Constraints

Sample Input

2  
5  
1 1 1 2 2  
5  
2 1 3 1 2
Sample Output

0  
4   
Explanation

The first query is already sorted, so there is no need to shift any elements. In the second case, it will proceed in the following way.

Array: 2 1 3 1 2 -> 1 2 3 1 2 -> 1 1 2 3 2 -> 1 1 2 2 3
Moves:   -        1       -    2         -  1            = 4

/* -------------------------------------------------------------*/

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
 * Complete the 'insertionSort' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function mergeAndCount(arr, tempArr, left, mid, right) {
    let i = left; // Starting index for left subarray
    let j = mid + 1; // Starting index for right subarray
    let k = left; // Starting index to be sorted
    let invCount = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            tempArr[k++] = arr[i++];
        } else {
            tempArr[k++] = arr[j++];
            invCount += (mid - i + 1); // Count inversions
        }
    }

    while (i <= mid) {
        tempArr[k++] = arr[i++];
    }

    while (j <= right) {
        tempArr[k++] = arr[j++];
    }

    for (let i = left; i <= right; i++) {
        arr[i] = tempArr[i];
    }

    return invCount;
}

function mergeSortAndCount(arr, tempArr, left, right) {
    let invCount = 0;
    if (left < right) {
        let mid = Math.floor((left + right) / 2);

        invCount += mergeSortAndCount(arr, tempArr, left, mid);
        invCount += mergeSortAndCount(arr, tempArr, mid + 1, right);
        invCount += mergeAndCount(arr, tempArr, left, mid, right);
    }
    return invCount;
}

function insertionSort(arr) {
    let tempArr = Array(arr.length);
    return mergeSortAndCount(arr, tempArr, 0, arr.length - 1);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);
        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = insertionSort(arr);
        ws.write(result + '\n');
    }

    ws.end();
}
