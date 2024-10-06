Given a tree T with n nodes, how many subtrees (T') of T have at most K edges connected to (T - T')?

Input Format

The first line contains two integers n and K followed by n-1 lines each containing two integers a & b denoting that there's an edge between a & b.

Constraints

1 <= K <= n <= 50
Every node is indicated by a distinct number from 1 to n.

Output Format

A single integer which denotes the number of possible subtrees.

Sample Input

3 1
2 1
2 3
Sample Output

6
Explanation

There are 2^3 possible sub-trees:

{} {1} {2} {3} {1, 2} {1, 3} {2, 3} {1, 2, 3}

But:
the sub-trees {2} and {1,3} are not valid. {2} isn't valid because it has 2 edges connecting to it's complement {1,3} whereas K = 1 in the sample test-case {1,3} isn't valid because, well, it's not a sub-tree. The nodes aren't connected.


 /* ------------------------------- */

 'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the cuttree function below.
 */
function cuttree(n, k, edges) {
    const graph = Array.from({ length: n + 1 }, () => []);
   
    // Build the graph from edges
    for (const [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }
   
    let validSubtreeCount = 0;

    // DFS to count valid subtrees
    function dfs(node, parent) {
        let size = 1; // Count this node
        let edgesToComplement = 0; // Count edges to the complement

        // Iterate over all neighbors
        for (const neighbor of graph[node]) {
            if (neighbor === parent) continue; // Avoid backtracking

            // Recursive DFS call
            const childSize = dfs(neighbor, node);
            size += childSize; // Increase size of the current subtree
            edgesToComplement++; // This edge connects to the complement
        }

        // Check if the current subtree size is valid
        if (edgesToComplement <= k) {
            validSubtreeCount++;
        }

        return size; // Return the size of the subtree
    }

    // Check all nodes as potential subtree roots
    for (let i = 1; i <= n; i++) {
        dfs(i, -1); // Start DFS from node i
    }

    // Count the empty subtree as valid
    validSubtreeCount++; // Account for the empty subtree

    return validSubtreeCount;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');
    const n = parseInt(nk[0], 10);
    const k = parseInt(nk[1], 10);
   
    let edges = Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
        edges[i] = readLine().split(' ').map(Number);
    }

    let result = cuttree(n, k, edges);
    ws.write(result + "\n");
    ws.end();
}
