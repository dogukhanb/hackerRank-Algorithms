Sean invented a game involving a  matrix where each cell of the matrix contains an integer. He can reverse any of its rows or columns any number of times. The goal of the game is to maximize the sum of the elements in the  submatrix located in the upper-left quadrant of the matrix.

Given the initial configurations for  matrices, help Sean reverse the rows and columns of each matrix in the best possible way so that the sum of the elements in the matrix's upper-left quadrant is maximal.

Example

1 2
3 4
It is  and we want to maximize the top left quadrant, a  matrix. Reverse row :

1 2
4 3
And now reverse column :

4 2
1 3
The maximal sum is .

Function Description

Complete the flippingMatrix function in the editor below.

flippingMatrix has the following parameters:
- int matrix[2n][2n]: a 2-dimensional array of integers

Returns
- int: the maximum sum possible.

Input Format

The first line contains an integer , the number of queries.

The next  sets of lines are in the following format:

The first line of each query contains an integer, .
Each of the next  lines contains  space-separated integers  in row  of the matrix.
Constraints

, where .
Sample Input

STDIN           Function
-----           --------
1               q = 1
2               n = 2
112 42 83 119   matrix = [[112, 42, 83, 119], [56, 125, 56, 49], \
56 125 56 49              [15, 78, 101, 43], [62, 98, 114, 108]]
15 78 101 43
62 98 114 108
Sample Output

414
Explanation

Start out with the following  matrix:

Perform the following operations to maximize the sum of the  submatrix in the upper-left quadrant:

Reverse column  (), resulting in the matrix:
Reverse row  (), resulting in the matrix:
The sum of values in the  submatrix in the upper-left quadrant is .

/* ----------------------- */

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

function flippingMatrix(matrix) {
    const n = matrix.length / 2; // 2n x 2n matrisin her ceyregi icin n
    let maxSum = 0;


    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
     
            const topLeft = matrix[i][j];
            const topRight = matrix[i][2 * n - j - 1];
            const bottomLeft = matrix[2 * n - i - 1][j];
            const bottomRight = matrix[2 * n - i - 1][2 * n - j - 1];


            const maxValue = Math.max(topLeft, topRight, bottomLeft, bottomRight);
            maxSum += maxValue;
        }
    }

    return maxSum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);
        let matrix = Array(2 * n);

        for (let i = 0; i < 2 * n; i++) {
            matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
        }

        const result = flippingMatrix(matrix);
        ws.write(result + '\n');
    }

    ws.end();
}

