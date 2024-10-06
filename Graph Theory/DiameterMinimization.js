We define the diameter of a strongly-connected oriented graph, , as the minimum integer  such that for each  there is a path from  to  of length  (recall that a path's length is its number of edges).

Given two integers,  and , build a strongly-connected oriented graph with  vertices where each vertex has outdegree  and the graph's diameter is as small as possible (see the Scoring section below for more detail). Then print the graph according to the Output Format specified below.

Here's a sample strongly-connected oriented graph with  nodes, whose outdegree is  and diameter is .

image

Note: Cycles and multiple edges between vertices are allowed.

Input Format

Two space-separated integers describing the respective values of  (the number of vertices) and  (the outdegree of each vertex).

Constraints

Scoring

We denote the diameter of your graph as  and the diameter of the graph in the author's solution as . Your score for each test case (as a real number from  to ) is:

 if 
 if 
 if 
Output Format

First, print an integer denoting the diameter of your graph on a new line.
Next, print  lines where each line  () contains  space-separated integers in the inclusive range from  to  describing the endpoints for each of vertex 's outbound edges.

Sample Input 0

5 2
Sample Output 0

2
1 4
2 0
3 1
4 2
0 3
Explanation 0

The diagram below depicts a strongly-connected oriented graph with  nodes where each node has an outdegree of :



The diameter of this graph is , which is minimal as the outdegree of each node must be . We cannot construct a graph with a smaller diameter of  because it requires an outbound edge from each vertex to each other vertex in the graph (so the outdegree of that graph would be ).


 /* ---------------------------- */

 'use strict';

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
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10); // number of vertices
    const m = parseInt(firstMultipleInput[1], 10); // outdegree

    // If outdegree is not valid
    if (m >= n) {
        console.log(-1);
        return;
    }

    const diameter = 2; // We want to construct a graph with diameter 2
    console.log(diameter);

    const graph = Array.from({ length: n }, () => []);

    // Construct the cycle and additional edges
    for (let i = 0; i < n; i++) {
        // Add edges to create a cycle
        graph[i].push((i + 1) % n + 1); // Edge to the next vertex in the cycle (1-indexed)

        // Add additional edges to satisfy the outdegree
        for (let j = 1; j < m; j++) {
            graph[i].push((i + j) % n + 1); // Connecting to the next vertices in a wrap-around manner
        }
    }

    // Print the graph in the required format
    for (let i = 0; i < n; i++) {
        console.log(graph[i].length, ...graph[i]);
    }
}