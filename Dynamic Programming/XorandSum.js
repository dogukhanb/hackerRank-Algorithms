You are given two positive integers  and  in binary representation. You should find the following sum modulo :

where operation  means exclusive OR operation, operation  means binary shift to the left.

Please note, that we consider ideal model of binary integers. That is there is infinite number of bits in each number, and there are no disappearings (or cyclic shifts) of bits.

Input Format

The first line contains number   in binary representation. The second line contains number   in the same format. All the numbers do not contain leading zeros.

Output Format

Output a single integer  the required sum modulo .

Sample Input

10
1010
Sample Output

489429555


 /* ------------------- */

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
 * Complete the 'xorAndSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function xorAndSum(a, b) {
    const MOD = 1000000007;
    const numA = BigInt(parseInt(a, 2)); // Convert binary string to integer using BigInt
    const numB = BigInt(parseInt(b, 2)); // Convert binary string to integer using BigInt
    let sum = BigInt(0);

    const bLength = b.length;

    // Iterate for left shifts of b
    for (let i = 0; i <= bLength; i++) {
        const shiftedB = numB << BigInt(i); // Perform left shift
        const result = numA ^ shiftedB; // XOR with a
        sum = (sum + result) % BigInt(MOD); // Accumulate the result and take modulo
    }

    return sum.toString(); // Return the result as a string
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine().trim();
    const b = readLine().trim();

    const result = xorAndSum(a, b);

    ws.write(result + '\n');
    ws.end();
}
