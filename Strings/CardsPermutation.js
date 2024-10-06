Alice was given the  integers from  to . She wrote all possible permutations in increasing lexicographical order, and wrote each permutation in a new line. For example, for , there are  possible permutations:

She then chose one permutation among them as her favorite permutation.

After some time, she forgot some elements of her favorite permutation. Nevertheless, she still tried to write down its elements. She wrote a  in every position where she forgot the true value.

She wants to know the sum of the line numbers of the permutations which could possibly be her favorite permutation, i.e., permutations which can be obtained by replacing the s. Can you help her out?

Since the sum can be large, find it modulo .

Input Format

The first line contains a single integer .

The next line contains  space-separated integers  denoting Alice's favorite permutation with some positions replaced by .

Constraints

The positive values appearing in  are distinct.
Subtask

For ~33% of the total points, 
Output Format

Print a single line containing a single integer denoting the sum of the line numbers of the permutations which could possibly be Alice's favorite permutation.

Sample Input 0

4
0 2 3 0
Sample Output 0

23
Explanation 0

The possible permutations are  and . The permutation  occurs on line  and the permutation  occurs on line . Therefore the sum is .

Sample Input 1

4
4 3 2 1
Sample Output 1

24
Explanation 1

There is no missing number in the permutation. Therefore, the only possible permutation is , and it occurs on line . Therefore the sum is .


 /* ------------------------- */

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

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result = (result * i) % (10**9 + 7);
    }
    return result;
}

function getLineNumber(permutation, n) {
    const used = new Array(n).fill(false);
    let lineNumber = 1;

    for (let i = 0; i < n; i++) {
        const current = permutation[i];
        let countLessThan = 0;

        for (let j = 0; j < current; j++) {
            if (!used[j]) {
                countLessThan++;
            }
        }
       
        // Calculate permutations with the remaining elements
        const remainingCount = n - i - 1; // Remaining positions after i
        lineNumber += countLessThan * factorial(remainingCount) % (10**9 + 7);
        lineNumber %= (10**9 + 7);

        used[current] = true; // Mark current as used
    }

    return lineNumber;
}

function solve(x) {
    const n = x.length;
    const missingValues = new Set(Array.from({length: n}, (_, i) => i));
   
    for (let num of x) {
        if (num !== 0) {
            missingValues.delete(num);
        }
    }

    const missingArr = Array.from(missingValues);
    const m = missingArr.length; // Number of missing elements
    let totalSum = 0;

    const findPermutations = (current, index) => {
        if (index === n) {
            totalSum = (totalSum + getLineNumber(current, n)) % (10**9 + 7);
            return;
        }

        if (current[index] === 0) {
            for (let i = 0; i < m; i++) {
                if (!current.includes(missingArr[i])) {
                    current[index] = missingArr[i];
                    findPermutations(current, index + 1);
                    current[index] = 0; // backtrack
                }
            }
        } else {
            findPermutations(current, index + 1);
        }
    };

    findPermutations(x.slice(), 0);
    return totalSum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));
   
    const result = solve(a);

    ws.write(result + '\n');
    ws.end();
}