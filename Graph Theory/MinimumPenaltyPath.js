Consider an undirected graph containing  nodes and  edges. Each edge  has an integer cost, , associated with it.

The penalty of a path is the bitwise OR of every edge cost in the path between a pair of nodes,  and . In other words, if a path contains edges , then the penalty for this path is  OR  OR ... OR .

Given a graph and two nodes,  and , find the path between  and  having the minimal possible penalty and print its penalty; if no such path exists, print  to indicate that there is no path from  to .

Note: Loops and multiple edges are allowed. The bitwise OR operation is known as or in Pascal and as | in C++ and Java.

Input Format

The first line contains two space-separated integers,  (the number of nodes) and  (the number of edges), respectively.

Each line  of the  subsequent lines contains three space-separated integers , , and , respectively, describing edge  connecting the nodes  and  and its associated penalty ().

The last line contains two space-separated integers,  (the starting node) and  (the ending node), respectively.

Constraints

Output Format

Print the minimal penalty for the optimal path from node  to node ; if no path exists from node  to node , print .

Sample Input

3 4
1 2 1
1 2 1000
2 3 3
1 3 100
1 3
Sample Output

3
Explanation

The optimal path is .
 and .
The penalty for this path is:  OR , so we print .

 /* ------------------ */ 

 'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n').map(str => str.trim());
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'beautifulPath' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY edges
 *  2. INTEGER A
 *  3. INTEGER B
 */

function beautifulPath(edges, A, B) {
    const graph = new Map();

    // Build the graph
    for (const [u, v, cost] of edges) {
        if (!graph.has(u)) graph.set(u, []);
        if (!graph.has(v)) graph.set(v, []);
        graph.get(u).push({ node: v, cost });
        graph.get(v).push({ node: u, cost });
    }

    // Min-Heap for Dijkstra's-like approach
    const heap = [];
    const minPenalty = new Map();

    // Initialize the starting node
    minPenalty.set(A, 0);
    heap.push({ node: A, penalty: 0 });

    while (heap.length > 0) {
        // Sort and pop the smallest penalty
        heap.sort((a, b) => a.penalty - b.penalty);
        const { node: currentNode, penalty: currentPenalty } = heap.shift();

        // If we reached the target node, return the penalty
        if (currentNode === B) {
            return currentPenalty;
        }

        // Explore neighbors
        for (const { node: neighbor, cost } of graph.get(currentNode) || []) {
            const newPenalty = currentPenalty | cost; // Calculate new penalty using OR operation

            // If we found a cheaper penalty for the neighbor, update and push to heap
            if (!minPenalty.has(neighbor) || newPenalty < minPenalty.get(neighbor)) {
                minPenalty.set(neighbor, newPenalty);
                heap.push({ node: neighbor, penalty: newPenalty });
            }
        }
    }

    // If no path was found, return -1
    return -1;
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);

    let edges = Array(m);

    for (let i = 0; i < m; i++) {
        edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
    }

    const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const A = parseInt(secondMultipleInput[0], 10);
    const B = parseInt(secondMultipleInput[1], 10);

    const result = beautifulPath(edges, A, B);
    console.log(result); // Use console.log instead of writing to file
}
