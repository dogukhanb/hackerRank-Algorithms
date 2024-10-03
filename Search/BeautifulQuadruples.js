We call an quadruple of positive integers, , beautiful if the following condition is true:

Note:  is the bitwise XOR operator.

Given , , , and , count the number of beautiful quadruples of the form  where the following constraints hold:

When you count the number of beautiful quadruples, you should consider two quadruples as same if the following are true:

They contain same integers.
Number of times each integers occur in the quadruple is same.
For example  and  should be considered as same.

Input Format

A single line with four space-separated integers describing the respective values of , , , and .

Constraints

For  of the maximum score, 
Output Format

Print the number of beautiful quadruples.

Sample Input

1 2 3 4
Sample Output

11
Explanation

There are  beautiful quadruples for this input:

Thus, we print  as our output.

Note that  is same as 

 /* -------------------------------- */

 'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', () => {
    inputString = inputString.trim().split('\n').map(str => str.trim());
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the beautifulQuadruples function below.
 */
function beautifulQuadruples(a, b, c, d) {
    let count = 0;

    // Iterate through all possible values for x, y, z
    for (let x = 1; x <= a; x++) {
        for (let y = 1; y <= b; y++) {
            for (let z = 1; z <= c; z++) {
                // Calculate w using the XOR operation
                const w = x ^ y ^ z;

                // Check if w is within the valid range
                if (w >= 1 && w <= d) {
                    // Count the valid quadruple
                    count++;
                }
            }
        }
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const abcd = readLine().split(' ').map(Number);
    
    const a = abcd[0];
    const b = abcd[1];
    const c = abcd[2];
    const d = abcd[3];
    
    const result = beautifulQuadruples(a, b, c, d);
    ws.write(result + "\n");
    ws.end();
}
