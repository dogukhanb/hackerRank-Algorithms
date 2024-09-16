The distance between two array values is the number of indices between them. Given , find the minimum distance between any pair of equal elements in the array. If no such value exists, return .

Example

There are two matching pairs of values:  and . The indices of the 's are  and , so their distance is . The indices of the 's are  and , so their distance is . The minimum distance is .

Function Description

Complete the minimumDistances function in the editor below.

minimumDistances has the following parameter(s):

int a[n]: an array of integers
Returns

int: the minimum distance found or  if there are no matching elements
Input Format

The first line contains an integer , the size of array .
The second line contains  space-separated integers .

Constraints

Output Format

Print a single integer denoting the minimum  in . If no such value exists, print .

Sample Input

STDIN           Function
-----           --------
6               arr[] size n = 6
7 1 3 4 1 7     arr = [7, 1, 3, 4, 1, 7]
Sample Output

3
Explanation
There are two pairs to consider:

 and  are both , so .
 and  are both , so .
The answer is .

/* -------------------------------------------------------*/

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
 * Complete the 'minimumDistances' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */
function minimumDistances(a) {
    const lastSeen = new Map();
    let minDistance = Infinity;

    for (let i = 0; i < a.length; i++) {
        const value = a[i];
        
        if (lastSeen.has(value)) {
            const previousIndex = lastSeen.get(value);
            const distance = i - previousIndex;
            if (distance < minDistance) {
                minDistance = distance;
            }
        }
        
        lastSeen.set(value, i);
    }

    return minDistance === Infinity ? -1 : minDistance;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = minimumDistances(a);

    ws.write(result + '\n');
    ws.end();
}
