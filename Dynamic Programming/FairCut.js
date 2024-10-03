Li and Lu have  integers, , that they want to divide fairly between the two of them. They decide that if Li gets integers with indices  (which implies that Lu gets integers with indices ), then the measure of unfairness of this division is:

Find the minimum measure of unfairness that can be obtained with some division of the set of integers where Li gets exactly  integers.

Note  means Set complement

Input Format

The first line contains two space-separated integers denoting the respective values of  (the number of integers Li and Lu have) and  (the number of integers Li wants).
The second line contains  space-separated integers describing the respective values of .

Constraints

For  of the test cases, .
For  of the test cases, .
Output Format

Print a single integer denoting the minimum measure of unfairness of some division where Li gets  integers.

Sample Input 0

4 2
4 3 1 2
Sample Output 0

 6
Explanation 0
One possible solution for this input is . 

Sample Input 1

4 1
3 3 3 1
Sample Output 1

2
Explanation 1
The following division of numbers is optimal for this input: 

 /* --------------------- */

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

function minUnfairness(N, K, A) {
    const totalSum = A.reduce((sum, num) => sum + num, 0);
    const combinations = getCombinations(A, K);
    let minUnfairness = Infinity;

    for (const combination of combinations) {
        const sumLi = combination.reduce((sum, num) => sum + num, 0);
        const unfairness = Math.abs(totalSum - 2 * sumLi);
        minUnfairness = Math.min(minUnfairness, unfairness);
    }

    return minUnfairness;
}

// Helper function to get all combinations of K elements from array
function getCombinations(arr, k) {
    const result = [];

    function combine(start, current) {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            combine(i + 1, current);
            current.pop();
        }
    }

    combine(0, []);
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
    const N = parseInt(firstMultipleInput[0], 10);
    const K = parseInt(firstMultipleInput[1], 10);
    const A = readLine().replace(/\s+$/g, '').split(' ').map(A_temp => parseInt(A_temp, 10));
    
    const result = minUnfairness(N, K, A);
    ws.write(result + '\n');
    ws.end();
}
