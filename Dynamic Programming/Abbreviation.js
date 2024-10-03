You can perform the following operations on the string, :

Capitalize zero or more of 's lowercase letters.
Delete all of the remaining lowercase letters in .
Given two strings,  and , determine if it's possible to make  equal to  as described. If so, print YES on a new line. Otherwise, print NO.

For example, given  and , in  we can convert  and delete  to match . If  and , matching is not possible because letters may only be capitalized or discarded, not changed.

Function Description

Complete the function  in the editor below. It must return either  or .

abbreviation has the following parameter(s):

a: the string to modify
b: the string to match
Input Format

The first line contains a single integer , the number of queries.

Each of the next  pairs of lines is as follows:
- The first line of each query contains a single string, .
- The second line of each query contains a single string, .

Constraints

String  consists only of uppercase and lowercase English letters, ascii[A-Za-z].
String  consists only of uppercase English letters, ascii[A-Z].
Output Format

For each query, print YES on a new line if it's possible to make string  equal to string . Otherwise, print NO.

Sample Input

1
daBcd
ABC
Sample Output

YES
Explanation

image

We have  daBcd and  ABC. We perform the following operation:

Capitalize the letters a and c in  so that  dABCd.
Delete all the remaining lowercase letters in  so that  ABC.
Because we were able to successfully convert  to , we print YES on a new line.

 /* ---------------------------- */
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
  * Complete the 'abbreviation' function below.
  *
  * The function is expected to return a STRING.
  * The function accepts following parameters:
  *  1. STRING a
  *  2. STRING b
  */
 
 function abbreviation(a, b) {
     const m = a.length;
     const n = b.length;
     
     // Create a DP table
     const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
     dp[0][0] = true; // Both strings are empty
 
     // Fill the first column (when b is empty)
     for (let i = 1; i <= m; i++) {
         if (a[i - 1] >= 'a' && a[i - 1] <= 'z') {
             dp[i][0] = dp[i - 1][0]; // We can skip lowercase letters
         } else {
             dp[i][0] = false; // Uppercase cannot match empty string
         }
     }
 
     // Fill the DP table
     for (let i = 1; i <= m; i++) {
         for (let j = 1; j <= n; j++) {
             // Check if the characters match (case insensitive)
             if (a[i - 1].toUpperCase() === b[j - 1]) {
                 dp[i][j] = dp[i - 1][j - 1]; // Match or capitalize
             }
             // If the character in a is lowercase, we can skip it
             if (a[i - 1] >= 'a' && a[i - 1] <= 'z') {
                 dp[i][j] = dp[i][j] || dp[i - 1][j]; // Skip lowercase character
             }
         }
     }
 
     // The result is whether we can match the full length of b
     return dp[m][n] ? "YES" : "NO";
 }
 
 function main() {
     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
 
     const q = parseInt(readLine().trim(), 10);
 
     for (let qItr = 0; qItr < q; qItr++) {
         const a = readLine();
         const b = readLine();
         const result = abbreviation(a, b);
         ws.write(result + '\n');
     }
 
     ws.end();
 }
 
