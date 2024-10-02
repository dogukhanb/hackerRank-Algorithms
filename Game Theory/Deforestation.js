Alice and Bob are playing a game with a rooted tree. The tree has  vertices and the first node, , is always the root. Here are the basic rules:

They move in alternating turns, and both players always move optimally.
During each move, a player removes an edge from the tree, disconnecting one of its leaves or branches. The leaf or branch that was disconnected from the rooted tree is removed from the game.
The first player to be unable to make a move loses the game.
Alice always makes the first move.
For example, the diagram below shows a tree of size , where the root is node : tree-initial.png

Now, if a player removes the edge between  and , then nodes  and  become disconnected from the root and are removed from the game:

tree-removed.png

Given the structure of the tree, determine and print the winner of the game. If Alice wins, print ; otherwise print .

Input Format

The first line contains a single integer, , denoting the number of test cases.
For each test case, the first line contains an integer, , denoting the number of nodes in the tree.
Each of the  subsequent lines contains  space-separated integers,  and , defining an edge connecting nodes  and .

Constraints

Output Format

For each test case, print the name of the winner (i.e.,  or ) on a new line.

Sample Input

1
5
1 2
3 1
3 4
4 5
Sample Output

Alice
Explanation

Test Case 0:

Alice removes the edge connecting node  to node , effectively trimming nodes  and  from the tree. Now the only remaining edges are  and . Because Bob can't remove both of them, Alice will make the last possible move. Because the last player to move wins, we print  on a new line.

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
 * Complete the 'deforestation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY tree
 */

function deforestation(n, tree) {
    if (n === 1) {
        return 'Bob'; // If there's only one node, Alice can't make a move
    }

    const degree = Array(n + 1).fill(0);

    // Calculate the degree of each node
    for (const [u, v] of tree) {
        degree[u]++;
        degree[v]++;
    }

    // Count the number of edges (n - 1)
    const edges = n - 1;

    // Determine the winner based on the number of edges
    if (edges % 2 === 1) {
        return 'Alice'; // Odd edges, Alice can force a win
    } else {
        return 'Bob'; // Even edges, Bob can force a win
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10); // Number of test cases

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10); // Number of nodes in the tree

        let tree = Array(n - 1);

        for (let i = 0; i < n - 1; i++) {
            tree[i] = readLine().replace(/\s+$/g, '').split(' ').map(treeTemp => parseInt(treeTemp, 10));
        }

        const result = deforestation(n, tree); // Get the result

        ws.write(result + '\n'); // Write the result
    }

    ws.end(); // Close the output stream
}
