Given an array of stick lengths, use  of them to construct a non-degenerate triangle with the maximum possible perimeter. Return an array of the lengths of its sides as  integers in non-decreasing order.

If there are several valid triangles having the maximum perimeter:

Choose the one with the longest maximum side.
If more than one has that maximum, choose from them the one with the longest minimum side.
If more than one has that maximum as well, print any one them.
If no non-degenerate triangle exists, return .

Example

The triplet  will not form a triangle. Neither will  or , so the problem is reduced to  and . The longer perimeter is .

Function Description

Complete the maximumPerimeterTriangle function in the editor below.

maximumPerimeterTriangle has the following parameter(s):

int sticks[n]: the lengths of sticks available
Returns

int[3] or int[1]: the side lengths of the chosen triangle in non-decreasing order or -1
Input Format

The first line contains single integer , the size of array .
The second line contains  space-separated integers , each a stick length.

Constraints

Sample Input 0

5
1 1 1 3 3
Sample Output 0

1 3 3
Explanation 0

There are  possible unique triangles:

The second triangle has the largest perimeter, so we print its side lengths on a new line in non-decreasing order.

Sample Input 1

3
1 2 3
Sample Output 1

-1
Explanation 1

The triangle  is degenerate and thus can't be constructed, so we print -1 on a new line.

Sample Input 2

6
1 1 1 2 3 5
Sample Output 2

1 1 1
Explanation 2

The triangle (1,1,1) is the only valid triangle.

/* --------------------------------------------- */

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
 * Complete the 'maximumPerimeterTriangle' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY sticks as parameter.
 */
function maximumPerimeterTriangle(sticks) {
    // Sort the sticks in non-decreasing order
    sticks.sort((a, b) => a - b);
    
    // Iterate from the end to find a valid triangle
    for (let i = sticks.length - 1; i >= 2; i--) {
        let a = sticks[i - 2];
        let b = sticks[i - 1];
        let c = sticks[i];
        
        // Check the triangle inequality
        if (a + b > c) {
            return [a, b, c]; // Return the sides in non-decreasing order
        }
    }
    
    return [-1]; // No valid triangle found
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const sticks = readLine().replace(/\s+$/g, '').split(' ').map(sticksTemp => parseInt(sticksTemp, 10));

    const result = maximumPerimeterTriangle(sticks);
    ws.write(result.join(' ') + '\n');

    ws.end();
}
