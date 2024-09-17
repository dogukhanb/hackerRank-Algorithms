James found a love letter that his friend Harry has written to his girlfriend. James is a prankster, so he decides to meddle with the letter. He changes all the words in the letter into palindromes.

To do this, he follows two rules:

He can only reduce the value of a letter by , i.e. he can change d to c, but he cannot change c to d or d to b.
The letter  may not be reduced any further.
Each reduction in the value of any letter is counted as a single operation. Find the minimum number of operations required to convert a given string into a palindrome.

Example

The following two operations are performed: cde → cdd → cdc. Return .

Function Description

Complete the theLoveLetterMystery function in the editor below.

theLoveLetterMystery has the following parameter(s):

string s: the text of the letter
Returns

int: the minimum number of operations
Input Format

The first line contains an integer , the number of queries.
The next  lines will each contain a string .

Constraints


 | s | 
All strings are composed of lower case English letters, ascii[a-z], with no spaces.

Sample Input

STDIN   Function
-----   --------
4       q = 4
abc     query 1 = 'abc'
abcba
abcd
cba
Sample Output

2
0
4
2
Explanation

For the first query, abc → abb → aba.
For the second query, abcba is already a palindromic string.
For the third query, abcd → abcc → abcb → abca → abba.
For the fourth query, cba → bba → aba.

/* ---------------------------------------------------------- */

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
 * Complete the 'theLoveLetterMystery' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */
function theLoveLetterMystery(s) {
    let n = s.length;
    let operations = 0;
    
    // Iterate from the start to the middle of the string
    for (let i = 0; i < Math.floor(n / 2); i++) {
        let leftChar = s[i];
        let rightChar = s[n - i - 1];
        
        // Calculate the difference between characters and accumulate the operations
        operations += Math.abs(leftChar.charCodeAt(0) - rightChar.charCodeAt(0));
    }
    
    return operations;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine().trim();

        const result = theLoveLetterMystery(s);

        ws.write(result + '\n');
    }

    ws.end();
}
