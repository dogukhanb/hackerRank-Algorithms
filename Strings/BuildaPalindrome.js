You have two strings,  and . Find a string, , such that:

 can be expressed as  where  is a non-empty substring of  and  is a non-empty substring of .
 is a palindromic string.
The length of  is as long as possible.
For each of the  pairs of strings ( and ) received as input, find and print string  on a new line. If you're able to form more than one valid string , print whichever one comes first alphabetically. If there is no valid answer, print  instead.

Input Format

The first line contains a single integer, , denoting the number of queries. The subsequent lines describe each query over two lines:

The first line contains a single string denoting .
The second line contains a single string denoting .
Constraints

 and  contain only lowercase English letters.
Sum of |a| over all queries does not exceed 
Sum of |b| over all queries does not exceed 
Output Format

For each pair of strings ( and ), find some  satisfying the conditions above and print it on a new line. If there is no such string, print  instead.

Sample Input

3
bac
bac
abc
def
jdfh
fds
Sample Output

aba
-1
dfhfd
Explanation

We perform the following three queries:

Concatenate  with  to create .
We're given  and ; because both strings are composed of unique characters, we cannot use them to form a palindromic string. Thus, we print .
Concatenate  with  to create . Note that we chose these particular substrings because the length of string  must be maximal.


 /* ------------------------------- */

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
 * Complete the 'buildPalindrome' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function buildPalindrome(a, b) {
    let longestPalindrome = '';
   
    // Check for common characters to form the simplest palindrome
    const charSetB = new Set(b);
   
    // Check for common characters in a and b
    for (const charA of a) {
        if (charSetB.has(charA)) {
            // Found a common character, return it as the smallest palindrome
            return charA;
        }
    }
   
    // Try forming palindromes from characters in a and b
    for (const charA of a) {
        for (const charB of b) {
            // Construct a palindrome of the form "charA + charB + charA"
            const candidate = charA + charB + charA;
            // Check if this candidate is the longest or lexicographically smaller
            if (candidate.length > longestPalindrome.length ||
                (candidate.length === longestPalindrome.length && candidate < longestPalindrome)) {
                longestPalindrome = candidate;
            }
        }
    }

    // Return the longest palindrome found or -1 if none
    return longestPalindrome.length > 0 ? longestPalindrome : '-1';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const a = readLine().trim();
        const b = readLine().trim();
        const result = buildPalindrome(a, b);
        ws.write(result + '\n');
    }

    ws.end();
}