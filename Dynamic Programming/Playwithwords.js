Shaka and his brother have created a boring game which is played like this:

They take a word composed of lowercase English letters and try to get the maximum possible score by building exactly 2 palindromic subsequences. The score obtained is the product of the length of these 2 subsequences.

Let's say  and  are two subsequences from the initial string. If  &  are the smallest and the largest positions (from the initial word) respectively in  ; and  &  are the smallest and the largest positions (from the initial word) respectively in , then the following statements hold true:
,
, &
.
i.e., the positions of the subsequences should not cross over each other.

Hence the score obtained is the product of lengths of subsequences  & . Such subsequences can be numerous for a larger initial word, and hence it becomes harder to find out the maximum possible score. Can you help Shaka and his brother find this out?

Input Format

Input contains a word  composed of lowercase English letters in a single line.

Constraints


each character will be a lower case english alphabet.

Output Format

Output the maximum score the boys can get from .

Sample Input

eeegeeksforskeeggeeks
Sample Output

50
Explanation

A possible optimal solution is eee-g-ee-ksfor-skeeggeeks being eeeee the one subsequence and skeeggeeks the other one. We can also select eegee in place of eeeee, as both have the same length.


/* ------------------------------------------ */


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
 * Complete the 'playWithWords' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function playWithWords(s) {
    const n = s.length;
    // Step 1: Create a DP array to store lengths of longest palindromic subsequences
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // All single letters are palindromes of length 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // Fill the dp array
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2; // Match found
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]); // No match
            }
        }
    }

    // Step 2: Find the maximum product of lengths of two non-overlapping palindromic subsequences
    let maxScore = 0;

    for (let mid = 0; mid < n - 1; mid++) {
        const leftLen = dp[0][mid]; // Length of LPS from start to mid
        const rightLen = dp[mid + 1][n - 1]; // Length of LPS from mid + 1 to end
        maxScore = Math.max(maxScore, leftLen * rightLen);
    }

    return maxScore;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine().trim(); // Read input string

    const result = playWithWords(s);

    ws.write(result + '\n');

    ws.end();
}