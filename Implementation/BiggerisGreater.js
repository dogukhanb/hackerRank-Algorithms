Lexicographical order is often known as alphabetical order when dealing with strings. A string is greater than another string if it comes later in a lexicographically sorted list.

Given a word, create a new word by swapping some or all of its characters. This new word must meet two criteria:

It must be greater than the original word
It must be the smallest word that meets the first condition
Example

The next largest word is .

Complete the function biggerIsGreater below to create and return the new string meeting the criteria. If it is not possible, return no answer.

Function Description

Complete the biggerIsGreater function in the editor below.

biggerIsGreater has the following parameter(s):

string w: a word
Returns
- string: the smallest lexicographically higher string possible or no answer

Input Format

The first line of input contains , the number of test cases.
Each of the next  lines contains .

Constraints

 will contain only letters in the range ascii[a..z].
Sample Input 0

5
ab
bb
hefg
dhck
dkhc
Sample Output 0

ba
no answer
hegf
dhkc
hcdk
Explanation 0

Test case 1:
ba is the only string which can be made by rearranging ab. It is greater.
Test case 2:
It is not possible to rearrange bb and get a greater string.
Test case 3:
hegf is the next string greater than hefg.
Test case 4:
dhkc is the next string greater than dhck.
Test case 5:
hcdk is the next string greater than dkhc.
Sample Input 1

6
lmno
dcba
dcbb
abdc
abcd
fedcbabcd
Sample Output 1

lmon
no answer
no answer
acbd
abdc
fedcbabdc

/* --------------------------------------------- */

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
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */

function biggerIsGreater(w) {
    let arr = w.split('');
    let n = arr.length;

    // Step 1: Find the rightmost character which is smaller than its next character
    let i = n - 2;
    while (i >= 0 && arr[i] >= arr[i + 1]) {
        i--;
    }

    // If no such character is found, then we are at the last permutation
    if (i === -1) {
        return "no answer";
    }

    // Step 2: Find the smallest character on the right side of the pivot which is larger than arr[i]
    let j = n - 1;
    while (arr[j] <= arr[i]) {
        j--;
    }

    // Step 3: Swap the pivot with the successor
    [arr[i], arr[j]] = [arr[j], arr[i]];

    // Step 4: Reverse the sequence after the pivot
    let right = arr.slice(i + 1);
    arr = arr.slice(0, i + 1).concat(right.reverse());

    return arr.join('');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine().trim(); // Ensure to trim the input

        const result = biggerIsGreater(w);

        ws.write(result + '\n');
    }

    ws.end();
}
