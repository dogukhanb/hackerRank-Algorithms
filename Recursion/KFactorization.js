At the time when Pythagoreanism was prevalent, people were also focused on different ways to factorize a number. In one class, Pythagoras asked his disciples to solve one such problem, Reverse Factorization. They were given a set of integer, , and an integer . They need to find the a way to reach , starting from , and at each step multiplying current value by any element of . But soon they realised that there may exist more than one way to reach . So they decided to find a way in which number of states are least. All of sudden they started on this new problem. People solved it and then started shouting their answer. CRAP!!!. There still exists multiple answers. So finally after much consideration, they settled on the lexicographically smallest series among those solutions which contains the least number of states.

For example, if  and  then following ways exists

(a) 1  ->  2  ->  4  ->  12
       x2     x2     x3

(b) 1  ->  4  ->  12
       x4     x3

(c) 1  ->  3  ->  12
       x3     x4
Here (a) is not the minimal state, as it has  states in total. While (b) and (c) are contenders for answer, both having 3 states, (c) is lexicographically smaller than (b) so it is the answer. In this case you have to print 1 3 12. If there exists no way to reach  print -1.

Input Format

Input contains two lines where first line contains two space separated integer,  and , representing the final value to reach and the size of set , respectively. Next line contains K space integers representing the set .

Constraints

, where 
, where  AND 
Note:

Lexicographical order: If  and  are two ordered lists, then  is lexicographically smaller than  if any one of the following condition satisfies.

 AND .
 AND  AND .
You need to find the lexigraphically smallest series among those solutions which contains the least number of states.

Output Format

Print the steps to reach  if it exists. Otherwise print -1.

Sample Input 0

12 3
2 3 4
Sample Output 0

1 3 12
Explanation 0

This is the same case which is explaned above.

Sample Input 1

15 5
2 10 6 9 11
Sample Output 1

-1
Explanation 1

Here no way exists so that we can reach  starting from .

Sample Input 2

72 9
2 4 6 9 3 7 16 10 5
Sample Output 2

1 2 8 72
Explanation 2

There are multiple ways to reach 72 using these 8 numbers. Out of which following 6 ways consists of minimal states (4).

States          =>  Multiplication operation
 1   9  18  72  =>      (x9, x2, x4)
 1   4  36  72  =>      (x4, x9, x2)
 1   2   8  72  =>      (x2, x4, x9)
 1   2  18  72  =>      (x2, x9, x4)
 1   4   8  72  =>      (x4, x2, x9)
 1   9  36  72  =>      (x9, x4, x2)
As series 1 2 8 72 is lexicographically smallest, it is the answer.


 /* ------------------------ */

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
 * Complete the 'kFactorization' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY A
 */

function kFactorization(n, A) {
    // Sort the array to ensure we explore in lexicographically smallest order
    A.sort((a, b) => a - b);

    // BFS setup
    const queue = [[1, [1]]]; // Start from 1 with the path containing only 1
    const visited = new Set(); // To keep track of visited states
    visited.add(1);

    let foundPaths = []; // To store all paths that lead to n

    while (queue.length > 0) {
        const [current, path] = queue.shift(); // Get the current state and path

        for (const factor of A) {
            const next = current * factor;

            // Stop if we exceed n
            if (next > n) break;

            const newPath = [...path, next];

            if (next === n) {
                foundPaths.push(newPath); // Store path if we reach n
            } else if (!visited.has(next)) {
                visited.add(next);
                queue.push([next, newPath]); // Add new state to the queue
            }
        }
    }

    if (foundPaths.length === 0) return [-1]; // No paths found

    // Find the path with the least states and then the lexicographically smallest
    foundPaths.sort((a, b) => a.length - b.length || a.join(' ').localeCompare(b.join(' ')));
    
    return foundPaths[0]; // Return the best path
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);

    const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

    const result = kFactorization(n, A);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
