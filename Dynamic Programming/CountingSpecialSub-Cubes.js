Given an  cube, let  (where ) denote the value stored in cell .

A  sub-cube (where ) of an  cube is considered to be special if the maximum value stored in any cell in the sub-cube is equal to .

For each  in the inclusive range , calculate the number of special sub-cubes. Then print each  as a single line of space-separated integers (i.e., ).

Input Format

The first line contains an integer, , denoting the number of queries. The  subsequent lines describe each query over two lines:

The first line contains an integer, , denoting the side length of the initial cube.
The second line contains  space-separated integers describing an array of  integers in the form . The integer in some cell  is calculated using the formula .
Constraints

 where 
Output Format

For each query, print  space-separated integers where the  integer denotes the number of special sub-cubes for .

Sample Input

2
2
2 1 1 1 1 1 1 1
2
1 1 1 1 2 1 1 2
Sample Output

7 1
6 1
Explanation

We must perform the following  queries:

We have a cube of size  and must calculate the number of special sub-cubes for the following values of :

: There are  sub-cubes of size  and seven of them have a maximum value of  written inside them. So, for , the answer is .
: There is only one sub-cube of size  and the maximum number written inside it is . So, for , the answer is .
We then print the respective values for each  as a single line of space-separated integers (i.e., 7 1).

We have a cube of size  and must calculate the number of special sub-cubes for the following values of :

: There are  sub-cubes of size  and six of them have a maximum value of  written inside them. So, for , the answer is .
: There is only one sub-cube of size  and the maximum number written inside it is . So, for , the answer is .
We then print the respective values for each  as a single line of space-separated integers (i.e., 6 1).
/* -------------------------------------------- */


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

function specialSubCubes(cube) {
    const n = Math.cbrt(cube.length); // Calculate the dimension of the cube
    const counts = Array(n * n * n + 1).fill(0); // To count special sub-cubes for each maximum value

    // Iterate through all possible starting positions
    for (let startX = 0; startX < n; startX++) {
        for (let startY = 0; startY < n; startY++) {
            for (let startZ = 0; startZ < n; startZ++) {
                // For each starting position, check all possible sizes
                for (let size = 1; size <= n; size++) {
                    // Check bounds for the current sub-cube size
                    if (startX + size > n || startY + size > n || startZ + size > n) {
                        break; // Out of bounds
                    }
                   
                    let maxVal = -Infinity;

                    // Find the maximum value in the current sub-cube
                    for (let x = startX; x < startX + size; x++) {
                        for (let y = startY; y < startY + size; y++) {
                            for (let z = startZ; z < startZ + size; z++) {
                                const index = x * n * n + y * n + z; // Convert to 1D index
                                maxVal = Math.max(maxVal, cube[index]);
                            }
                        }
                    }

                    // Increment the count for the found maximum value
                    counts[maxVal] += 1;
                }
            }
        }
    }

    // Prepare the result for values from 1 to n^3
    const result = [];
    for (let k = 1; k <= n * n * n; k++) {
        result.push(counts[k] || 0);
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);
        const cube = readLine().replace(/\s+$/g, '').split(' ').map(cubeTemp => parseInt(cubeTemp, 10));

        const result = specialSubCubes(cube);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}