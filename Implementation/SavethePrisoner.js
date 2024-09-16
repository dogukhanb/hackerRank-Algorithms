A jail has a number of prisoners and a number of treats to pass out to them. Their jailer decides the fairest way to divide the treats is to seat the prisoners around a circular table in sequentially numbered chairs. A chair number will be drawn from a hat. Beginning with the prisoner in that chair, one candy will be handed to each prisoner sequentially around the table until all have been distributed.

The jailer is playing a little joke, though. The last piece of candy looks like all the others, but it tastes awful. Determine the chair number occupied by the prisoner who will receive that candy.

Example




There are  prisoners,  pieces of candy and distribution starts at chair . The prisoners arrange themselves in seats numbered  to . Prisoners receive candy at positions . The prisoner to be warned sits in chair number .

Function Description

Complete the saveThePrisoner function in the editor below. It should return an integer representing the chair number of the prisoner to warn.

saveThePrisoner has the following parameter(s):

int n: the number of prisoners
int m: the number of sweets
int s: the chair number to begin passing out sweets from
Returns

int: the chair number of the prisoner to warn
Input Format

The first line contains an integer, , the number of test cases.
The next  lines each contain  space-separated integers:

: the number of prisoners
: the number of sweets
: the chair number to start passing out treats at
Constraints

Sample Input 0

2
5 2 1
5 2 2
Sample Output 0

2
3
Explanation 0

In the first query, there are  prisoners and  sweets. Distribution starts at seat number . Prisoners in seats numbered  and  get sweets. Warn prisoner .

In the second query, distribution starts at seat  so prisoners in seats  and  get sweets. Warn prisoner .

Sample Input 1

2
7 19 2
3 7 3
Sample Output 1

6
3
Explanation 1

In the first test case, there are  prisoners,  sweets and they are passed out starting at chair . The candies go all around twice and there are  more candies passed to each prisoner from seat  to seat .

In the second test case, there are  prisoners,  candies and they are passed out starting at seat . They go around twice, and there is one more to pass out to the prisoner at seat .

/* --------------------------------------------------*/


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
    inputString = inputString.split('\n').map(str => str.trim());
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'saveThePrisoner' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. INTEGER s
 */
function saveThePrisoner(n, m, s) {
    // Convert the start position to zero-based index
    let start = s - 1;
    // Calculate the position of the last candy
    let lastCandyPosition = (start + m - 1) % n;
    // Convert back to one-based index
    return lastCandyPosition + 1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const m = parseInt(firstMultipleInput[1], 10);
        const s = parseInt(firstMultipleInput[2], 10);

        const result = saveThePrisoner(n, m, s);

        ws.write(result + '\n');
    }

    ws.end();
}
