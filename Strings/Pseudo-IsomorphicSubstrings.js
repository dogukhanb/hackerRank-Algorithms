Two strings A and B, consisting of small English alphabet letters are called pseudo-isomorphic if

Their lengths are equal
For every pair (i,j), where 1 <= i < j <= |A|, B[i] = B[j], iff A[i] = A[j]
For every pair (i,j), where 1 <= i < j <= |A|, B[i] != B[j] iff A[i] != A[j]
Naturally, we use 1-indexation in these definitions and |A| denotes the length of the string A.

You are given a string S, consisting of no more than 105 lowercase alphabetical characters. For every prefix of S denoted by S', you are expected to find the size of the largest possible set of strings , such that all elements of the set are substrings of S' and no two strings inside the set are pseudo-isomorphic to each other.

if S = abcde
then, 1st prefix of S is 'a'
then, 2nd prefix of S is 'ab'
then, 3rd prefix of S is 'abc'
then, 4th prefix of S is 'abcd' and so on..

Input Format

The first and only line of input will consist of a single string S. The length of S will not exceed 10^5.

Constraints

S contains only lower-case english alphabets ('a' - 'z').
Output Format

Output N lines. On the ith line, output the size of the largest possible set for the first i alphabetical characters of S such that no two strings in the set are pseudo-isomorphic to each other.

Sample Input

abbabab  
Sample Output

1   
2   
4   
6   
9   
12   
15   
Explanation

The first character is 'a', the set is {a} hence 1.
The first 2 characters are 'ab', the set is {a, b, ab} but 'a' is pseudo-isomorphic to 'b'. So, we can remove either 'a' or 'b' from the set. We get {a,ab} or {b,ab}, hence 2.
Similarly, the first 3 characters are 'abb', the set is {a, ab, abb, b, bb} and as 'a' is pseudo-isomorphic to 'b', we have to remove either 'a' or 'b' from the set. We get {a,ab, abb, bb}, hence 4. and so on...


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
 * Complete the 'pseudoIsomorphicSubstrings' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING s as parameter.
 */

function pseudoIsomorphicSubstrings(s) {
    const n = s.length;
    const results = [];
    const seenPatterns = new Set();

    // Iterate through the prefixes of the string
    for (let i = 0; i < n; i++) {
        const freq = new Map();
       
        // Generate all substrings ending at position i
        for (let j = i; j >= 0; j--) {
            const char = s[j];
            freq.set(char, (freq.get(char) || 0) + 1);

            // Create a pattern from the frequency map
            const pattern = createPattern(freq);
            seenPatterns.add(pattern);
        }

        // The size of the unique patterns set is our answer for this prefix
        results.push(seenPatterns.size);
    }

    return results;
}

function createPattern(freq) {
    const sortedEntries = [...freq.entries()].sort(([a], [b]) => a.localeCompare(b));
    return sortedEntries.map(([char, count]) => `${count}:${char}`).join(',');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const s = readLine().trim();
    const result = pseudoIsomorphicSubstrings(s);
    ws.write(result.join('\n') + '\n');
    ws.end();
}