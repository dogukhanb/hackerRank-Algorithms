Jack and Daniel are friends. They want to encrypt their conversations so that they can save themselves from interception by a detective agency so they invent a new cipher.

Every message is encoded to its binary representation. Then it is written down  times, shifted by  bits. Each of the columns is XORed together to get the final encoded string.

If  and  it looks like so:

1001011     shift 0 
01001011    shift 1
001001011   shift 2
0001001011  shift 3
----------
1110101001  <- XORed/encoded string s
Now we have to decode the message. We know that . The first digit in  so our output string is going to start with . The next two digits are also , so they must have been XORed with . We know the first digit of our  shifted string is a  as well. Since the  digit of  is , we XOR that with our  and now know there is a  in the  position of the original string. Continue with that logic until the end.

Then the encoded message  and the key  are sent to Daniel.

Jack is using this encoding algorithm and asks Daniel to implement a decoding algorithm. Can you help Daniel implement this?

Function Description

Complete the cipher function in the editor below. It should return the decoded string.

cipher has the following parameter(s):

k: an integer that represents the number of times the string is shifted
s: an encoded string of binary digits
Input Format

The first line contains two integers  and , the length of the original decoded string and the number of shifts.
The second line contains the encoded string  consisting of  ones and zeros.

Constraints




It is guaranteed that  is valid.

Output Format

Return the decoded message of length , consisting of ones and zeros.

Sample Input 0

7 4
1110100110
Sample Output 0

1001010
Explanation 0

1001010
 1001010
  1001010
   1001010
----------
1110100110
Sample Input 1

6 2
1110001
Sample Output 1

101111
Explanation 1

101111
 101111
-------
1110001
Sample Input 2

10 3
1110011011
Sample Output 2

10000101
Explanation 2

10000101 010000101

0010000101
1110011011

 /* ------------------------------ */

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
 * Complete the 'cipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. STRING s
 */

function cipher(k, s) {
    const n = s.length; // Length of the encoded string
    const original = new Array(n); // Array to hold the decoded values

    // Decode the first character
    original[0] = s[0];

    // Keep track of the XOR of the last k elements decoded
    let xorValue = parseInt(original[0], 10); // Start with the first decoded value

    // Decode the rest of the characters
    for (let i = 1; i < n; i++) {
        // Current value is the XOR of s[i] with the xorValue of previous k decoded values
        original[i] = (parseInt(s[i], 10) ^ xorValue).toString();

        // Update the xorValue for the next iteration
        if (i < k) {
            xorValue ^= parseInt(original[i], 10); // Update xorValue with the current decoded value
        } else {
            // For positions beyond k, we remove the oldest element in the xorValue calculation
            xorValue ^= parseInt(original[i], 10); // Add the current decoded value
            xorValue ^= parseInt(original[i - k], 10); // Remove the (i-k)th value
        }
    }

    return original.join(''); // Return the decoded message as a string
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);
    const s = readLine().trim();

    const result = cipher(k, s);

    ws.write(result + '\n');
    ws.end();
}
