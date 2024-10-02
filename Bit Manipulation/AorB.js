Consider four numbers: , , , and . You must change at most  bits in  and  to form the numbers  and  satisfying the equation . Here, the | symbol denotes the bitwise OR operation.

Given  sets of the numbers defined above, find and print the respective values of  and  on new lines; if no such value exists, print  instead. If there are multiple solutions, make  as small as possible; if there are still multiple solutions, make  as small as possible.

Notes:

, , and  are given in Hexadecimal (base 16), and  is given in decimal (base 10).
If the number of bits changed in  is  and the number of bits changed in B is , then  must be .
Input Format

The first line contains an integer, , denoting the number of queries. The subsequent lines describe each respective query as follows:

The first line contains a single integer denoting the value of .
Each of the next  lines contains a Hexadecimal (base 16) number describing the respective values of , , and .
Constraints

Output Format

Print two lines of output for each query:

The first line should contain a Hexadecimal (base 16) number denoting the value of .
The second line must contain a Hexadecimal (base 16) number denoting the value of .
If no valid answer exists, you must instead print one line of output with the integer .

Note: The letters in Hexadecimal numbers must be in uppercase.

Sample Input

3
8
2B
9F
58
5
B9
40
5A
2
91
BE
A8
Sample Output

8
58
18
42
-1
Explanation

Query 0:
In this query, .
Change  to .  bits are changed.

aorb(1).png

Change B =  to .  bits are changed.

aorb(2).png


Query 1:
In this query, .
Change  to .  bits are changed.
Change  to . Only  bit is changed.


Query 2:
There is no valid answer, so we print .

 /* -------------------------------- */

 'use strict';

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
 * Complete the 'aOrB' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. STRING a
 *  3. STRING b
 *  4. STRING c
 */

function aOrB(k, a, b, c) {
    const aInt = parseInt(a, 16);
    const bInt = parseInt(b, 16);
    const cInt = parseInt(c, 10);

    let changesA = 0;
    let changesB = 0;
    let aRes = aInt;
    let bRes = bInt;

    for (let i = 0; i < 32; i++) {
        const mask = 1 << i;

        const aBit = (aInt & mask) > 0 ? 1 : 0;
        const bBit = (bInt & mask) > 0 ? 1 : 0;
        const cBit = (cInt & mask) > 0 ? 1 : 0;

        if (cBit === 1) {
            // We need at least one of A or B to be 1
            if (aBit === 0 && bBit === 0) {
                // Both are 0, we need to change one to 1
                changesA += 1; // Let's choose to change A to 1
                aRes |= mask; // Set this bit in A
            } else if (aBit === 0 && bBit === 1) {
                // B is already 1, change A to 1
                changesA += 1;
                aRes |= mask; // Set this bit in A
            } else if (aBit === 1 && bBit === 0) {
                // A is already 1, change B to 1
                changesB += 1;
                bRes |= mask; // Set this bit in B
            }
            // If both are already 1, do nothing.
        } else {
            // We need both A and B to be 0
            if (aBit === 1 && bBit === 1) {
                // Both are 1, we need to change one
                changesA += 1; // Let's choose to change A to 0
                aRes &= ~mask; // Reset this bit in A
            } else if (aBit === 1 && bBit === 0) {
                // Only A is 1, change A to 0
                changesA += 1;
                aRes &= ~mask; // Reset this bit in A
            } else if (aBit === 0 && bBit === 1) {
                // Only B is 1, change B to 0
                changesB += 1;
                bRes &= ~mask; // Reset this bit in B
            }
        }
    }

    // Check if the total changes exceed k
    if (changesA + changesB > k) {
        console.log(-1);
    } else {
        // Convert results to hexadecimal
        console.log(aRes.toString(16).toUpperCase());
        console.log(bRes.toString(16).toUpperCase());
    }
}

function main() {
    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const k = parseInt(readLine().trim(), 10);
        const a = readLine();
        const b = readLine();
        const c = readLine();

        aOrB(k, a, b, c);
    }
}
