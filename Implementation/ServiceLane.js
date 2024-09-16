A driver is driving on the freeway. The check engine light of his vehicle is on, and the driver wants to get service immediately. Luckily, a service lane runs parallel to the highway. It varies in width along its length.

Paradise Highway

You will be given an array of widths at points along the road (indices), then a list of the indices of entry and exit points. Considering each entry and exit point pair, calculate the maximum size vehicle that can travel that segment of the service lane safely.

Example



If the entry index,  and the exit, , there are two segment widths of  and  respectively. The widest vehicle that can fit through both is . If  and , the widths are  which limits vehicle width to .

Function Description

Complete the serviceLane function in the editor below.

serviceLane has the following parameter(s):

int n: the size of the  array
int cases[t][2]: each element contains the starting and ending indices for a segment to consider, inclusive
Returns

int[t]: the maximum width vehicle that can pass through each segment of the service lane described
Input Format

The first line of input contains two integers,  and , where  denotes the number of width measurements and , the number of test cases. The next line has  space-separated integers which represent the array .

The next  lines contain two integers,  and , where  is the start index and  is the end index of the segment to check.

Constraints

Sample Input

STDIN               Function
-----               --------
8 5                 n = 8, t = 5
2 3 1 2 3 2 3 3     width = [2, 3, 1, 2, 3, 2, 3, 3]
0 3                 cases = [[0, 3], [4, 6], [6, 7], [3, 5], [0, 7]]
4 6
6 7
3 5
0 7
Sample Output

1
2
3
2
1
Explanation

Below is the representation of the lane:

   |HIGHWAY|Lane|    ->    Width

0: |       |--|            2
1: |       |---|           3
2: |       |-|             1
3: |       |--|            2
4: |       |---|           3
5: |       |--|            2
6: |       |---|           3
7: |       |---|           3
: From index  through  we have widths  and . Nothing wider than  can pass all segments.
: From index  through  we have widht  and . Nothing wider than  can pass all segments.
:  .
: 
: .

/* -------------------------------------------------------- */

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
 * Complete the 'serviceLane' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY cases
 */
function serviceLane(n, cases, width) {
    const results = [];
    for (const [start, end] of cases) {
        const segment = width.slice(start, end + 1);
        const minWidth = Math.min(...segment);
        results.push(minWidth);
    }
    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const t = parseInt(firstMultipleInput[1], 10);

    const width = readLine().replace(/\s+$/g, '').split(' ').map(widthTemp => parseInt(widthTemp, 10));

    let cases = [];
    for (let i = 0; i < t; i++) {
        cases.push(readLine().replace(/\s+$/g, '').split(' ').map(casesTemp => parseInt(casesTemp, 10)));
    }

    const result = serviceLane(n, cases, width);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
