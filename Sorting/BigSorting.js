Consider an array of numeric strings where each string is a positive number with anywhere from  to  digits. Sort the array's elements in non-decreasing, or ascending order of their integer values and return the sorted array.

Example

Return the array ['1', '3', '150', '200'].

Function Description

Complete the bigSorting function in the editor below.

bigSorting has the following parameter(s):

string unsorted[n]: an unsorted array of integers as strings
Returns

string[n]: the array sorted in numerical order
Input Format

The first line contains an integer, , the number of strings in .
Each of the  subsequent lines contains an integer string, .

Constraints

Each string is guaranteed to represent a positive integer.
There will be no leading zeros.
The total number of digits across all strings in  is between  and  (inclusive).
Sample Input 0

6
31415926535897932384626433832795
1
3
10
3
5
Sample Output 0

1
3
3
5
10
31415926535897932384626433832795
Explanation 0

The initial array of strings is . When we order each string by the real-world integer value it represents, we get:

We then print each value on a new line, from smallest to largest.

Sample Input 1

8
1
2
100
12303479849857341718340192371
3084193741082937
3084193741082938
111
200
Sample Output 1

1
2
100
111
200
3084193741082937
3084193741082938
12303479849857341718340192371


/* --------------------------------------------------------------------- */

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

function bigSorting(unsorted) {
    // Sort based on custom comparator
    unsorted.sort((a, b) => {
        // Compare by length first
        if (a.length !== b.length) {
            return a.length - b.length;
        }
        // If lengths are equal, compare lexicographically
        return a.localeCompare(b);
    });
    
    return unsorted;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let unsorted = [];

    for (let i = 0; i < n; i++) {
        const unsortedItem = readLine();
        unsorted.push(unsortedItem);
    }

    const result = bigSorting(unsorted);

    ws.write(result.join('\n') + '\n');

    ws.end();
}

