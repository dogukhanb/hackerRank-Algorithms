Karl loves playing games on social networking sites. His current favorite is CandyMaker, where the goal is to make candies.

Karl just started a level in which he must accumulate  candies starting with  machines and  workers. In a single pass, he can make  candies. After each pass, he can decide whether to spend some of his candies to buy more machines or hire more workers. Buying a machine or hiring a worker costs  units, and there is no limit to the number of machines he can own or workers he can employ.

Karl wants to minimize the number of passes to obtain the required number of candies at the end of a day. Determine that number of passes.

For example, Karl starts with  machine and  workers. The cost to purchase or hire,  and he needs to accumulate  candies. He executes the following strategy:

Make  candies. Purchase two machines.
Make  candies. Purchase  machines and hire  workers.
Make  candies. Retain all  candies.
Make  candies. With yesterday's production, Karl has  candies.
It took  passes to make enough candies.

Function Description

Complete the minimumPasses function in the editor below. The function must return a long integer representing the minimum number of passes required.

minimumPasses has the following parameter(s):

m: long integer, the starting number of machines
w: long integer, the starting number of workers
p: long integer, the cost of a new hire or a new machine
n: long integer, the number of candies to produce
Input Format

A single line consisting of four space-separated integers describing the values of , , , and , the starting number of machines and workers, the cost of a new machine or a new hire, and the the number of candies Karl must accumulate to complete the level.

Constraints

Output Format

Return a long integer denoting the minimum number of passes required to accumulate at least  candies.

Sample Input

3 1 2 12
Sample Output

3
Explanation

Karl makes three passes:

In the first pass, he makes  candies. He then spends  of them hiring another worker, so  and he has one candy left over.
In the second pass, he makes  candies. He spends  of them on another machine and another worker, so  and  and he has  candies left over.
In the third pass, Karl makes  candies. Because this satisfies his goal of making at least  candies, we print the number of passes (i.e., ) as our answer.

 /*----------------------- */

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
 * Complete the 'minimumPasses' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER m
 *  2. LONG_INTEGER w
 *  3. LONG_INTEGER p
 *  4. LONG_INTEGER n
 */

function minimumPasses(m, w, p, n) {
    let passes = 0;
    let totalCandies = 0;

    // Ensure m is the smaller value for consistent calculations
    if (m > w) {
        [m, w] = [w, m];
    }

    while (totalCandies < n) {
        // Calculate candies produced this pass
        const candiesProduced = m * w;
        totalCandies += candiesProduced;
        passes++;

        // If we have reached the goal, return the number of passes
        if (totalCandies >= n) {
            return passes;
        }

        // Calculate how many machines and workers we can buy
        // Only buy if we can afford at least one
        if (totalCandies >= p) {
            const newMachines = Math.floor(totalCandies / p);
            totalCandies -= newMachines * p;

            // Update machines and workers optimally
            m += newMachines;
            w += newMachines;

            // Ensure m is always the smaller of the two
            if (m > w) {
                [m, w] = [w, m];
            }
        }
    }

    return passes;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);
    const w = parseInt(firstMultipleInput[1], 10);
    const p = parseInt(firstMultipleInput[2], 10);
    const n = parseInt(firstMultipleInput[3], 10);

    const result = minimumPasses(m, w, p, n);

    ws.write(result + '\n');
    ws.end();
}