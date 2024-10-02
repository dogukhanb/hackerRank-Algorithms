Sherlock considers a string to be valid if all characters of the string appear the same number of times. It is also valid if he can remove just  character at  index in the string, and the remaining characters will occur the same number of times. Given a string , determine if it is valid. If so, return YES, otherwise return NO.

Example

This is a valid string because frequencies are .


This is a valid string because we can remove one  and have  of each character in the remaining string.


This string is not valid as we can only remove  occurrence of . That leaves character frequencies of .

Function Description

Complete the isValid function in the editor below.

isValid has the following parameter(s):

string s: a string
Returns

string: either YES or NO
Input Format

A single string .

Constraints

Each character 
Sample Input 0

aabbcd
Sample Output 0

NO
Explanation 0

Given , we would need to remove two characters, both c and d  aabb or a and b  abcd, to make it valid. We are limited to removing only one character, so  is invalid.

Sample Input 1

aabbccddeefghi
Sample Output 1

NO
Explanation 1

Frequency counts for the letters are as follows:

{'a': 2, 'b': 2, 'c': 2, 'd': 2, 'e': 2, 'f': 1, 'g': 1, 'h': 1, 'i': 1}

There are two ways to make the valid string:

Remove  characters with a frequency of : .
Remove  characters of frequency : .
Neither of these is an option.

Sample Input 2

abcdefghhgfedecba
Sample Output 2

YES
Explanation 2

All characters occur twice except for  which occurs  times. We can delete one instance of  to have a valid string.


/* ----------------------------------------- */
function isValid(s) {
    const charCount = {};
    
    // Count frequency of each character
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    const frequencyCount = {};
    
    // Count frequency of frequencies
    for (let count of Object.values(charCount)) {
        frequencyCount[count] = (frequencyCount[count] || 0) + 1;
    }

    const freqKeys = Object.keys(frequencyCount);
    
    // If there's only one frequency, it's valid
    if (freqKeys.length === 1) {
        return "YES";
    }

    // If there are two frequencies, check the conditions
    if (freqKeys.length === 2) {
        const [f1, f2] = freqKeys.map(Number);
        const [c1, c2] = [frequencyCount[f1], frequencyCount[f2]];

        // Check if we can adjust by removing one character
        if ((c1 === 1 && (f1 - 1 === f2 || f1 === 1)) || 
            (c2 === 1 && (f2 - 1 === f1 || f2 === 1))) {
            return "YES";
        }
    }

    // If none of the above conditions met, it's not valid
    return "NO";
}

// Example usage in the context of the provided input format
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

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
