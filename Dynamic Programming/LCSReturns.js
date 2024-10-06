Given two strings,  and , find and print the total number of ways to insert a character at any position in string  such that the length of the Longest Common Subsequence of characters in the two strings increases by one.

Input Format

The first line contains a single string denoting .
The second line contains a single string denoting .

Constraints

Scoring

Strings  and  are alphanumeric (i.e., consisting of arabic digits and/or upper and lower case English letters).
The new character being inserted must also be alphanumeric (i.e., a digit or upper/lower case English letter).
Subtask

 for  of the maximum score.
Output Format

Print a single integer denoting the total number of ways to insert a character into string  in such a way that the length of the longest common subsequence of  and  increases by one.

Sample Input

aa
baaa
Sample Output

4
Explanation

The longest common subsequence shared by  and  is aa, which has a length of . There are two ways that the length of the longest common subsequence can be increased to  by adding a single character to :

There are  different positions in string  where we could insert an additional a to create longest common subsequence aaa (i.e., at the beginning, middle, and end of the string).
We can insert a b at the beginning of the string for a new longest common subsequence of baa.
As we have  ways to insert an alphanumeric character into  and increase the length of the longest common subsequence by one, we print  on a new line.


 /* --------------------------------- */

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
 * Complete the 'tutzkiAndLcs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function tutzkiAndLcs(a, b) {
    const currentLcsLength = lcsLength(a, b);
    const allChars = getAllAlphanumericChars(); // Function to get all alphanumeric characters
    let totalWays = 0;

    for (const char of allChars) {
        // Count valid positions for the character to increase the LCS
        let validPositions = countValidInsertPositions(a, b, char, currentLcsLength);
        totalWays += validPositions;
    }

    return totalWays;
}

function lcsLength(a, b) {
    const n = a.length;
    const m = b.length;
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[n][m];
}

function countValidInsertPositions(a, b, char, currentLcsLength) {
    const n = a.length;
    let count = 0;

    // Check each position to insert the character
    for (let i = 0; i <= n; i++) {
        const newA = a.slice(0, i) + char + a.slice(i); // Insert char at position i
        const newLcsLength = lcsLength(newA, b);
        if (newLcsLength === currentLcsLength + 1) {
            count++;
        }
    }

    return count;
}

function getAllAlphanumericChars() {
    const chars = [];
    // Adding lowercase letters
    for (let i = 97; i <= 122; i++) chars.push(String.fromCharCode(i)); // a-z
    // Adding uppercase letters
    for (let i = 65; i <= 90; i++) chars.push(String.fromCharCode(i)); // A-Z
    // Adding digits
    for (let i = 48; i <= 57; i++) chars.push(String.fromCharCode(i)); // 0-9
    return chars;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const a = readLine();
    const b = readLine();

    const result = tutzkiAndLcs(a, b);

    ws.write(result + '\n');
    ws.end();
}
