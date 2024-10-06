
We define a function, , on a string, , as follows:

where:

 denotes the number of characters in string .
 denotes the number of distinct characters in string .
Consuela loves creating string challenges and she needs your help testing her newest one! Given a string, , consisting of  lowercase letters, compute the summation of function  (provided above) over all possible distinct substrings of . As the result is quite large, print it modulo .

Input Format

The first line contains a single integer, , denoting the number of test cases.
Each of the  subsequent lines contains a string, .

Constraints

The sum of  over all test cases does not exceed .
Scoring

 for  of test data.
 for  of test data.
 for  of test data.
Output Format

For each test case, print the answer modulo .

Sample Input

3
aa
aba
abc
Sample Output

3
19
38
Explanation

Test 0:

 and  are the only distinct substrings.


Test 1:

, , , , and  are the only distinct substrings.




/* -------------------------------- */



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
 * Complete the 'superFunctionalStrings' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function superFunctionalStrings(s) {
    const MOD = 10**9 + 7;
    const n = s.length;
    const distinctSubstrings = new Set();

    // Generate all distinct substrings
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j <= n; j++) {
            distinctSubstrings.add(s.substring(i, j));
        }
    }

    let totalSum = 0;

    // Calculate the sum of F(s) for each distinct substring
    for (const substring of distinctSubstrings) {
        const length = substring.length;
        const distinctCharsCount = new Set(substring).size; // Count of distinct characters
        totalSum = (totalSum + (length * distinctCharsCount)) % MOD;
    }

    return totalSum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = superFunctionalStrings(s);

        ws.write(result + '\n');
    }

    ws.end();
}