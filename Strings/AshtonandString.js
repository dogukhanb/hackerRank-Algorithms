Ashton appeared for a job interview and is asked the following question. Arrange all the distinct substrings of a given string in lexicographical order and concatenate them. Print the  character of the concatenated string. It is assured that given value of  will be valid i.e. there will be a  character. Can you help Ashton out with this?

For example, given the string , its distinct substrings are . Sorted and concatenated, they make the string . If  then, the answer is , the  character of the 1-indexed concatenated string.

Note We have distinct substrings here, i.e. if string is aa, it's distinct substrings are a and aa.

Function Description

Complete the ashtonString function in the editor below. It should return the  character from the concatenated string, 1-based indexing.

ashtonString has the following parameters:
- s: a string
- k: an integer

Input Format

The first line will contain an integer , the number of test cases.

Each of the subsequent  pairs of lines is as follows:
- The first line of each test case contains a string, .
- The second line contains an integer, .

Constraints



Each character of string 
 will be an appropriate integer.

Output Format

Print the  character (1-based index) of the concatenation of the ordered distinct substrings of .

Sample Input

1
dbac
3
Sample Output

c
Explanation

The substrings when arranged in lexicographic order are as follows

a, ac, b, ba, bac, c, d, db, dba, dbac
On concatenating them, we get

aacbbabaccddbdbadbac
The third character in this string is c.


 /* ------------------------- */

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
 * Complete the 'ashtonString' function below.
 *
 * The function is expected to return a CHARACTER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function ashtonString(s, k) {
    const distinctSubstrings = new Set();

    // Generate all distinct substrings
    for (let start = 0; start < s.length; start++) {
        for (let end = start + 1; end <= s.length; end++) {
            distinctSubstrings.add(s.slice(start, end));
        }
    }

    // Convert Set to Array and sort it lexicographically
    const sortedSubstrings = Array.from(distinctSubstrings).sort();

    // Concatenate all sorted distinct substrings
    const concatenatedString = sortedSubstrings.join('');

    // Return the k-th character (1-indexed)
    return concatenatedString[k - 1];  // k is 1-indexed
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const k = parseInt(readLine().trim(), 10);

        const res = ashtonString(s, k);

        ws.write(res + '\n');
    }

    ws.end();
}
