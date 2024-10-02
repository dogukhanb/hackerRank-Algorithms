Whenever George asks Lily to hang out, she's busy doing homework. George wants to help her finish it faster, but he's in over his head! Can you help George understand Lily's homework so she can hang out with him?

Consider an array of  distinct integers, . George can swap any two elements of the array any number of times. An array is beautiful if the sum of  among  is minimal.

Given the array , determine and return the minimum number of swaps that should be performed in order to make the array beautiful.

Example


One minimal array is . To get there, George performed the following swaps:

    Swap      Result
          [7, 15, 12, 3]
    3 7   [3, 15, 12, 7]
    7 15  [3, 7, 12, 15]
   
It took  swaps to make the array beautiful. This is minimal among the choices of beautiful arrays possible.

Function Description

Complete the lilysHomework function in the editor below.

lilysHomework has the following parameter(s):

int arr[n]: an integer array
Returns

int: the minimum number of swaps required
Input Format

The first line contains a single integer, , the number of elements in . The second line contains  space-separated integers, .

Constraints

Sample Input

STDIN       Function
-----       --------
4           arr[]size n = 4
2 5 3 1     arr = [2, 5, 3, 1]
Sample Output

2
Explanation

Define  to be the beautiful reordering of . The sum of the absolute values of differences between its adjacent elements is minimal among all permutations and only two swaps ( with  and then  with ) were performed.


/* ---------------------------- */

function lilysHomework(arr) {
    const sortedAsc = [...arr].sort((a, b) => a - b);
    const sortedDesc = [...arr].sort((a, b) => b - a);

    const countSwaps = (original, target) => {
        const indexMap = new Map();
        original.forEach((value, index) => indexMap.set(value, index));
        
        let swaps = 0;
        const visited = new Array(original.length).fill(false);

        for (let i = 0; i < original.length; i++) {
            // If already in the right place or already visited
            if (visited[i] || original[i] === target[i]) {
                continue;
            }
            
            // Start a cycle
            let cycleSize = 0;
            let j = i;
            while (!visited[j]) {
                visited[j] = true;
                j = indexMap.get(target[j]);
                cycleSize++;
            }
            // If there is a cycle of size `cycleSize`, we need `cycleSize - 1` swaps
            if (cycleSize > 0) {
                swaps += (cycleSize - 1);
            }
        }
        return swaps;
    };

    // Count swaps for both ascending and descending orders
    const swapsAsc = countSwaps(arr, sortedAsc);
    const swapsDesc = countSwaps(arr, sortedDesc);

    // Return the minimum of the two counts
    return Math.min(swapsAsc, swapsDesc);
}

// Example usage in the context of the provided input format
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

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = lilysHomework(arr);

    ws.write(result + '\n');
    ws.end();
}
