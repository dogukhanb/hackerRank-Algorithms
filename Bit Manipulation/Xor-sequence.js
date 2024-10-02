An array, , is defined as follows:

 for , where  is the symbol for XOR
You will be given a left and right index . You must determine the XOR sum of the segment of  as .

For example, . The segment from  to  sums to .

Print the answer to each question.

Function Description

Complete the xorSequence function in the editor below. It should return the integer value calculated.

xorSequence has the following parameter(s):

l: the lower index of the range to sum
r: the higher index of the range to sum
Input Format

The first line contains an integer , the number of questions.
Each of the next  lines contains two space-separated integers,  and , the inclusive left and right indexes of the segment to query.

Constraints



Output Format

On a new line for each test case, print the XOR-Sum of 's elements in the inclusive range between indices  and .

Sample Input 0

3
2 4
2 8
5 9
Sample Output 0

7
9
15
Explanation 0

The beginning of our array looks like this: 

Test Case 0:



Test Case 1:



Test Case 2:



Sample Input 1

3
3 5
4 6
15 20
Sample Output 1

5
2
22
Explanation 1

. Perform the xor sum on each interval:


/* ----------------------*/ 

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the xorSequence function below.
function xorSequence(l, r) {
    let result = 0;
    for (let i = l; i <= r; i++) {
        result ^= i; // XOR all values from l to r
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const lr = readLine().split(' ');

        const l = parseInt(lr[0], 10);
        const r = parseInt(lr[1], 10);

        let result = xorSequence(l, r);

        ws.write(result + "\n");
    }

    ws.end();
}
