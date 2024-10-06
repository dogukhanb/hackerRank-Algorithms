Red John has committed another murder. This time, he doesn't leave a red smiley behind. Instead he leaves a puzzle for Patrick Jane to solve. He also texts Teresa Lisbon that if Patrick is successful, he will turn himself in. The puzzle begins as follows.

There is a wall of size 4xn in the victim's house. The victim has an infinite supply of bricks of size 4x1 and 1x4 in her house. There is a hidden safe which can only be opened by a particular configuration of bricks. First we must calculate the total number of ways in which the bricks can be arranged so that the entire wall is covered. The following diagram shows how bricks might be arranged to cover walls where :

image

There is one more step to the puzzle. Call the number of possible arrangements . Patrick must calculate the number of prime numbers  in the inclusive range .

As an example, assume . From the diagram above, we determine that there is only one configuration that will cover the wall properly.  is not a prime number, so .

A more complex example is . The bricks can be oriented in  total configurations that cover the wall. The two primes  and  are less than or equal to , so .

image

Function Description

Complete the redJohn function in the editor below. It should return the number of primes determined, as an integer.

redJohn has the following parameter(s):

n: an integer that denotes the length of the wall
Input Format

The first line contains the integer , the number of test cases.
Each of the next  lines contains an integer , the length of the  wall.

Constraints

Output Format

Print the integer  on a separate line for each test case.

Sample Input

2
1
7
Sample Output

0
3
Explanation

For , the brick can be laid in 1 format only: vertically.


The number of primes  is .

For , one of the ways in which we can lay the bricks is

Red John

There are  ways of arranging the bricks for  and there are  primes .


 /* ---------------------------- */

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
 * Complete the 'redJohn' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

function redJohn(n) {
    const dp = new Array(n + 1).fill(0);
   
    // Base cases
    dp[0] = 1; // One way to cover 0 length
    if (n >= 1) dp[1] = 1;
    if (n >= 2) dp[2] = 1;
    if (n >= 3) dp[3] = 1;
    if (n >= 4) dp[4] = 2; // Two ways: all vertical or one horizontal
   
    // Fill the dp array using the recurrence relation
    for (let i = 5; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 4];
    }

    // Total number of configurations for the wall
    const totalConfigurations = dp[n];

    // Count the number of prime numbers less than or equal to totalConfigurations
    return countPrimes(totalConfigurations);
}

// Function to count primes using Sieve of Eratosthenes
function countPrimes(limit) {
    if (limit < 2) return 0;

    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false; // 0 and 1 are not prime numbers

    for (let i = 2; i * i <= limit; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= limit; j += i) {
                isPrime[j] = false;
            }
        }
    }

    // Count the number of primes
    return isPrime.filter(Boolean).length;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const result = redJohn(n);

        ws.write(result + '\n');
    }

    ws.end();
}
