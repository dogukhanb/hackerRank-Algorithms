Jack and Daniel are friends. Both of them like letters, especially uppercase ones.
They are cutting uppercase letters from newspapers, and each one of them has his collection of letters stored in a stack.

One beautiful day, Morgan visited Jack and Daniel. He saw their collections. He wondered what is the lexicographically minimal string made of those two collections. He can take a letter from a collection only when it is on the top of the stack. Morgan wants to use all of the letters in their collections.

As an example, assume Jack has collected  and Daniel has . The example shows the top at index  for each stack of letters. Assemble the string as follows:

Jack	Daniel	result
ACA	BCF
CA	BCF	A
CA	CF	AB
A	CF	ABC
A	CF	ABCA
    	F	ABCAC
    		ABCACF
Note the choice when there was a tie at CA and CF.

Function Description

Complete the morganAndString function in the editor below.

morganAndString has the following parameter(s):

string a: Jack's letters, top at index 
string b: Daniel's letters, top at index 
Returns
- string: the completed string

Input Format

The first line contains the an integer , the number of test cases.

The next  pairs of lines are as follows:
- The first line contains string 
- The second line contains string .

Constraints

 and  contain upper-case letters only, ascii[A-Z].
Sample Input

2
JACK
DANIEL
ABACABA
ABACABA
Sample Output

DAJACKNIEL
AABABACABACABA
Explanation

The first letters to choose from are J and D since they are at the top of the stack. D is chosen and the options now are J and A. A is chosen. Then the two stacks have J and N, so J is chosen. The current string is DA. Continue this way to the end to get the string.

 /* -------------------------- */

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
 * Complete the 'morganAndString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function morganAndString(a, b) {
    let result = '';

    let i = 0; // Pointer for string a
    let j = 0; // Pointer for string b

    while (i < a.length || j < b.length) {
        if (i < a.length && (j >= b.length || a[i] < b[j])) {
            // If a is available and either b is exhausted or a's char is less than b's
            result += a[i];
            i++;
        } else if (j < b.length && (i >= a.length || a[i] > b[j])) {
            // If b is available and either a is exhausted or b's char is less than a's
            result += b[j];
            j++;
        } else {
            // Characters are equal, we need to look ahead to determine the better option
            let k = i, l = j;
            let foundBetter = false;

            // Look ahead while characters are equal
            while (k < a.length && l < b.length && a[k] === b[l]) {
                k++;
                l++;
            }

            // If we've exhausted one string or a character in a is less than b, take from a
            if (l === b.length || (k < a.length && a[k] < b[l])) {
                result += a[i];
                i++;
            } else {
                result += b[j];
                j++;
            }
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const a = readLine().trim();
        const b = readLine().trim();

        const result = morganAndString(a, b);

        ws.write(result + '\n');
    }

    ws.end();
}
