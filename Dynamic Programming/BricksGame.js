You and your friend decide to play a game using a stack consisting of N bricks. In this game, you can alternatively remove 1, 2 or 3 bricks from the top, and the numbers etched on the removed bricks are added to your score. You have to play so that you obtain the maximum possible score. It is given that your friend will also play optimally and you make the first move.

As an example, bricks are numbered . You can remove either ,  or . For your friend, your moves would leave the options of  to  elements from  leaving  for you (total score = ),  or . In this case, it will never be optimal for your friend to take fewer than the maximum available number of elements. Your maximum possible score is , achievable two ways:  first move and  the second, or  in your first move.

Function Description

Complete the bricksGame function in the editor below. It should return an integer that represents your maximum possible score.

bricksGame has the following parameter(s):

arr: an array of integers
Input Format

The first line will contain an integer , the number of test cases.

Each of the next  pairs of lines are in the following format:
The first line contains an integer , the number of bricks in .
The next line contains  space-separated integers $arr[i].

Constraints




Output Format

For each test case, print a single line containing your maximum score.

Sample Input

2
5
999 1 1 1 0
5
0 1 1 1 999
Sample Output

1001
999
Explanation

In first test case, you will pick 999,1,1. If you play in any other way, you will not get a score of 1001.
In second case, best option will be to pick up the first brick (with 0 score) at first. Then your friend will choose the next three blocks, and you will get the last brick.


/* ------------------------------ */

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
 * Complete the 'bricksGame' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function bricksGame(arr) {
    const n = arr.length;
    const dp = new Array(n + 1).fill(0);
    const totalSum = new Array(n + 1).fill(0);
   
    // Compute total points from the end
    for (let i = n - 1; i >= 0; i--) {
        totalSum[i] = totalSum[i + 1] + arr[i];
    }
   
    for (let i = n - 1; i >= 0; i--) {
        dp[i] = Math.max(
            arr[i] + (totalSum[i + 1] - dp[i + 1]),
            (i + 1 < n ? arr[i] + arr[i + 1] + (totalSum[i + 2] - dp[i + 2]) : 0),
            (i + 2 < n ? arr[i] + arr[i + 1] + arr[i + 2] + (totalSum[i + 3] - dp[i + 3]) : 0)
        );
    }
   
    return dp[0];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const arrCount = parseInt(readLine().trim(), 10);
        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = bricksGame(arr);

        ws.write(result + '\n');
    }

    ws.end();
}