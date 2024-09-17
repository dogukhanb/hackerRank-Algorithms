We consider two strings to be anagrams of each other if the first string's letters can be rearranged to form the second string. In other words, both strings must contain the same exact letters in the same exact frequency. For example, bacdc and dcbac are anagrams, but bacdc and dcbad are not.

Alice is taking a cryptography class and finding anagrams to be very useful. She decides on an encryption scheme involving two large strings where encryption is dependent on the minimum number of character deletions required to make the two strings anagrams. Can you help her find this number?

Given two strings,  and , that may not be of the same length, determine the minimum number of character deletions required to make  and  anagrams. Any characters can be deleted from either of the strings.

Example.


The only characters that match are the 's so we have to remove  from  and  from  for a total of  deletions.

Function Description

Complete the makingAnagrams function in the editor below.

makingAnagrams has the following parameter(s):

string s1: a string
string s2: a string
Returns

int: the minimum number of deletions needed
Input Format

The first line contains a single string, .
The second line contains a single string, .

Constraints

It is guaranteed that  and  consist of lowercase English letters, ascii[a-z].
Sample Input

cde
abc
Sample Output

4
Explanation

Delete the following characters from our two strings to turn them into anagrams:

Remove d and e from cde to get c.
Remove a and b from abc to get c.
 characters have to be deleted to make both strings anagrams.

 /* ---------------------------------------------------- */


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
 * Complete the 'makingAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */
function makingAnagrams(s1, s2) {
    // Frequency counters for both strings
    const count1 = {};
    const count2 = {};

    // Count frequencies for s1
    for (const char of s1) {
        count1[char] = (count1[char] || 0) + 1;
    }

    // Count frequencies for s2
    for (const char of s2) {
        count2[char] = (count2[char] || 0) + 1;
    }

    // Calculate the number of deletions required
    let deletions = 0;

    // Check differences for characters in s1
    for (const char in count1) {
        if (count2[char]) {
            deletions += Math.abs(count1[char] - count2[char]);
        } else {
            deletions += count1[char];
        }
    }

    // Check differences for characters in s2 not in s1
    for (const char in count2) {
        if (!count1[char]) {
            deletions += count2[char];
        }
    }

    return deletions;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine().trim();
    const s2 = readLine().trim();

    const result = makingAnagrams(s1, s2);

    ws.write(result + '\n');

    ws.end();
}


