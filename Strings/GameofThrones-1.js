Dothraki are planning an attack to usurp King Robert's throne. King Robert learns of this conspiracy from Raven and plans to lock the single door through which the enemy can enter his kingdom.

door

But, to lock the door he needs a key that is an anagram of a palindrome. He starts to go through his box of strings, checking to see if they can be rearranged into a palindrome. Given a string, determine if it can be rearranged into a palindrome. Return the string YES or NO.

Example

One way this can be arranged into a palindrome is . Return YES.

Function Description
Complete the gameOfThrones function below.

gameOfThrones has the following parameter(s):

string s: a string to analyze
Returns

string: either YES or NO
Input Format

A single line which contains .

Constraints

 |s| 
 contains only lowercase letters in the range 
Sample Input 0

aaabbbb
Sample Output 0

YES
Explanation 0

A palindromic permutation of the given string is bbaaabb.

Sample Input 1

cdefghmnopqrstuvw
Sample Output 1

NO
Explanation 1

Palindromes longer than 1 character are made up of pairs of characters. There are none here.

Sample Input 2

cdcdcdcdeeeef
Sample Output 2

YES
Explanation 2

An example palindrome from the string: ddcceefeeccdd.

/* ------------------------------------------------------*/ 

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
 * Complete the 'gameOfThrones' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */
function gameOfThrones(s) {
    // Frequency counter for characters
    const freq = {};

    // Count frequencies of each character
    for (const char of s) {
        freq[char] = (freq[char] || 0) + 1;
    }

    // Count characters with odd frequencies
    let oddCount = 0;
    for (const count of Object.values(freq)) {
        if (count % 2 !== 0) {
            oddCount++;
        }
    }

    // Check the condition for being a palindromic permutation
    if (oddCount > 1) {
        return 'NO';
    } else {
        return 'YES';
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine().trim();

    const result = gameOfThrones(s);

    ws.write(result + '\n');

    ws.end();
}
