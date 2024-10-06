A palindrome is a string that reads the same from left to right as it does from right to left.

Given a string, , of  lowercase English letters, we define a -length rotation as cutting the first  characters from the beginning of  and appending them to the end of . For each , there are  possible -length rotations (where ). See the Explanation section for examples.

Given  and , find all  -length rotations of ; for each rotated string, , print the maximum possible length of any palindromic substring of  on a new line.

Input Format

The first line contains an integer,  (the length of ).
The second line contains a single string, .

Constraints

Output Format

There should be  lines of output, where each line  contains an integer denoting the maximum length of any palindromic substring of rotation .

Sample Input 0

13
aaaaabbbbaaaa
Sample Output 0

12
12
10
8
8
9
11
13
11
9
8
8
10
Sample Input 1

7
cacbbba
Sample Output 1

3
3
3
3
3
3
3
Sample Input 2

12
eededdeedede
Sample Output 2

5
7
7
7
7
9
9
9
9
7
5
4
Explanation

Consider Sample Case 1, where .

The possible rotations, , for string  are:
.






The longest palindromic substrings for each  are:
 and , so we print their length () on a new line.
, so we print its length () on a new line.
 and , so we print their length () on a new line.
 and , so we print their length () on a new line.
 and , so we print their length () on a new line.
 and , so we print their length () on a new line.
 and , so we print their length () on a new line.


  /* ----------------------- */

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
 * Complete the 'circularPalindromes' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING s as parameter.
 */

function manacher(s) {
    const t = '^#' + s.split('').join('#') + '#$'; // Transform the string
    const p = Array(t.length).fill(0);
    let c = 0, r = 0; // current center, right edge
    for (let i = 1; i < t.length - 1; i++) {
        if (i < r) {
            p[i] = Math.min(r - i, p[2 * c - i]);
        }
        // Expand around the center
        while (t[i + p[i] + 1] === t[i - p[i] - 1]) {
            p[i]++;
        }
        // Update center and right edge
        if (i + p[i] > r) {
            c = i;
            r = i + p[i];
        }
    }
    return Math.max(...p); // maximum length of palindrome
}

function circularPalindromes(s) {
    const n = s.length;
    const results = [];
   
    for (let i = 0; i < n; i++) {
        // Create the rotated string
        const rotated = s.slice(i) + s.slice(0, i);
        // Find the maximum length of palindromic substring
        const maxLength = manacher(rotated);
        results.push(maxLength);
    }
   
    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const s = readLine().trim();

    const result = circularPalindromes(s);

    ws.write(result.join('\n') + '\n');

    ws.end();
}