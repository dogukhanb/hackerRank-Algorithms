You have N soldiers numbered from 1 to N. Each of your soldiers is either a liar or a truthful person. You have M sets of information about them. Each set of information tells you the number of liars among a certain range of your soldiers. Let L be the total number of your liar soldiers. Since you can't find the exact value of L, you want to find the minimum and maximum value of L.

Input Format

The first line of the input contains two integers N and M.
Each of next M lines contains three integers:
A B C where the set of soldiers numbered as {A, A+1, A+2, ..., B}, exactly C of them are liars. (1 <= Ai <= Bi <= n) and (0 <= Ci <= Bi-Ai).
Note: N and M are not more than 101, and it is guaranteed the given informations is satisfiable.

Output Format
Print two integers Lmin and Lmax to the output.

Sample Input #1

3 2
1 2 1
2 3 1
Sample Output #1

1 2
Sample Input #2

20 11
3 8 4
1 9 6
1 13 9
5 11 5
4 19 12
8 13 5
4 8 4
7 9 2
10 13 3
7 16 7
14 19 4
Sample Output #2

13 14
Explanation
In the first input, the initial line is "3 2", i.e. that there are 3 soldiers and we have 2 sets of information. The next line says there is one liar in the set of soldiers {1, 2}. The final line says there is one liar in the set {2,3}. There are two possibilities for this scenario: Soldiers number 1 and 3 are liars or soldier number 2 is liar.
So the minimum number of liars is 1 and maximum number of liars is 2. Hence the answer, 1 2.


 /* ---------------------- */

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

function liars(n, sets) {
    let maxLiars = 0;
    let minLiars = 0;

    // To hold the maximum possible liars for each soldier
    let liarCounts = new Array(n + 1).fill(0);

    // Step 1: Count max liars based on statements
    for (const [A, B, C] of sets) {
        for (let i = A; i <= B; i++) {
            liarCounts[i] += 1; // Increment max possible liars
        }
        maxLiars += C; // Increase max count by C (from the statement)
    }

    // Step 2: Calculate the minimum liars
    let minCounts = new Array(n + 1).fill(0);
    let totalLiarsRequired = new Array(n + 1).fill(0);
   
    for (const [A, B, C] of sets) {
        totalLiarsRequired[A] += C; // Start adding required liars from A
        if (B + 1 <= n) {
            totalLiarsRequired[B + 1] -= C; // Remove after B
        }
    }

    let currentLiars = 0;
    for (let i = 1; i <= n; i++) {
        currentLiars += totalLiarsRequired[i];
        if (currentLiars > 0) {
            minCounts[i] = 1; // At least one liar must be here to satisfy the statement
        }
    }

    minLiars = minCounts.reduce((sum, val) => sum + val, 0);

    return [minLiars, maxLiars];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);

    let sets = Array(m);

    for (let i = 0; i < m; i++) {
        sets[i] = readLine().replace(/\s+$/g, '').split(' ').map(setsTemp => parseInt(setsTemp, 10));
    }

    const result = liars(n, sets);

    ws.write(result.join(' ') + '\n');
    ws.end();
}