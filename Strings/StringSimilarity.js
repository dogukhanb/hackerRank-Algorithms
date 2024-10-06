For two strings A and B, we define the similarity of the strings to be the length of the longest prefix common to both strings. For example, the similarity of strings "abc" and "abd" is 2, while the similarity of strings "aaa" and "aaab" is 3.

Calculate the sum of similarities of a string S with each of it's suffixes.

Input Format

The first line contains the number of test cases t.
Each of the next t lines contains a string to process, .

Constraints

 is composed of characters in the range ascii[a-z]
Output Format

Output t lines, each containing the answer for the corresponding test case.

Sample Input

2
ababaa  
aa
Sample Output

11  
3
Explanation

For the first case, the suffixes of the string are "ababaa", "babaa", "abaa", "baa", "aa" and "a". The similarities of these strings with the string "ababaa" are 6,0,3,0,1, & 1 respectively. Thus, the answer is 6 + 0 + 3 + 0 + 1 + 1 = 11.

For the second case, the answer is 2 + 1 = 3.


 /* ------------------- */

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
 * Complete the 'stringSimilarity' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function stringSimilarity(s) {
    const n = s.length;
    let totalSimilarity = 0;

    for (let i = 0; i < n; i++) {
        let similarity = 0;
        // Compare the characters of the original string with the suffix
        while (i + similarity < n && s[similarity] === s[i + similarity]) {
            similarity++;
        }
        totalSimilarity += similarity;
    }

    return totalSimilarity;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine().trim();
        const result = stringSimilarity(s);
        ws.write(result + '\n');
    }

    ws.end();
}
