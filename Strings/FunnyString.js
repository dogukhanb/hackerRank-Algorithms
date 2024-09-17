In this challenge, you will determine whether a string is funny or not. To determine whether a string is funny, create a copy of the string in reverse e.g. . Iterating through each string, compare the absolute difference in the ascii values of the characters at positions 0 and 1, 1 and 2 and so on to the end. If the list of absolute differences is the same for both strings, they are funny.

Determine whether a give string is funny. If it is, return Funny, otherwise return Not Funny.

Example

The ordinal values of the charcters are .  and the ordinals are . The absolute differences of the adjacent elements for both strings are , so the answer is Funny.

Function Description

Complete the funnyString function in the editor below.

funnyString has the following parameter(s):

string s: a string to test
Returns

string: either Funny or Not Funny
Input Format

The first line contains an integer , the number of queries.
The next  lines each contain a string, .

Constraints

Sample Input

STDIN   Function
-----   --------
2       q = 2
acxz    s = 'acxz'
bcxz    s = 'bcxz'
Sample Output

Funny
Not Funny
Explanation

Let  be the reverse of .

Test Case 0:

, 
Corresponding ASCII values of characters of the strings:
 and 
For both the strings the adjacent difference list is [2, 21, 2].

Test Case 1:

, 
Corresponding ASCII values of characters of the strings:
 and 
The difference list for string  is [1, 21, 2] and for string  is [2, 21, 1].

/* ----------------------------------------------------------------- */

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
 * Complete the 'funnyString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */
function funnyString(s) {
    const n = s.length;
    const forwardDiffs = [];
    const backwardDiffs = [];
    
    // Calculate forward differences
    for (let i = 1; i < n; i++) {
        forwardDiffs.push(Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1)));
    }
    
    // Calculate backward differences
    for (let i = n - 1; i > 0; i--) {
        backwardDiffs.push(Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1)));
    }
    
    // Compare forward and backward differences
    if (forwardDiffs.join('') === backwardDiffs.join('')) {
        return 'Funny';
    } else {
        return 'Not Funny';
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine().trim();

        const result = funnyString(s);

        ws.write(result + '\n');
    }

    ws.end();
}
