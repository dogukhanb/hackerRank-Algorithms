The previous challenges covered Insertion Sort, which is a simple and intuitive sorting algorithm with a running time of . In these next few challenges, we're covering a divide-and-conquer algorithm called Quicksort (also known as Partition Sort). This challenge is a modified version of the algorithm that only addresses partitioning. It is implemented as follows:

Step 1: Divide
Choose some pivot element, , and partition your unsorted array, , into three smaller arrays: , , and , where each element in , each element in , and each element in .

Example

In this challenge, the pivot will always be at , so the pivot is .

 is divided into , , and .
Putting them all together, you get . There is a flexible checker that allows the elements of  and  to be in any order. For example,  is valid as well.

Given  and , partition  into , , and  using the Divide instructions above. Return a 1-dimensional array containing each element in  first, followed by each element in , followed by each element in .

Function Description

Complete the quickSort function in the editor below.

quickSort has the following parameter(s):

int arr[n]:  is the pivot element
Returns

int[n]: an array of integers as described above
Input Format

The first line contains , the size of .
The second line contains  space-separated integers  (the unsorted array). The first integer, , is the pivot element, .

Constraints

 where 
All elements are distinct.
Sample Input

STDIN       Function
-----       --------
5           arr[] size n =5
4 5 3 7 2   arr =[4, 5, 3, 7, 2]
Sample Output

3 2 4 5 7
Explanation

 Pivot: .
; ; 

, so it is added to .
; ; 

, so it is added to .
; ; 

, so it is added to .
; ; 

, so it is added to .
; ; 

Return the array .

The order of the elements to the left and right of  does not need to match this answer. It is only required that  and  are to the left of , and  and  are to the right.

/* --------------------------------------------------- */

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
 * Complete the 'quickSort' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function quickSort(arr) {
    const pivot = arr[0];  // The pivot element
    const lessThanPivot = [];
    const equalToPivot = [];
    const greaterThanPivot = [];

    // Partition the array into three parts
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            lessThanPivot.push(arr[i]);
        } else if (arr[i] > pivot) {
            greaterThanPivot.push(arr[i]);
        } else {
            equalToPivot.push(arr[i]);
        }
    }

    // Concatenate results: less than pivot, equal to pivot, greater than pivot
    return [...lessThanPivot, pivot, ...equalToPivot, ...greaterThanPivot];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = quickSort(arr);

    ws.write(result.join(' ') + '\n');
    ws.end();
}
