Given a graph which consists of several edges connecting its nodes, find a subgraph of the given graph with the following properties:

The subgraph contains all the nodes present in the original graph.
The subgraph is of minimum overall weight (sum of all edges) among all such subgraphs.
It is also required that there is exactly one, exclusive path between any two nodes of the subgraph.
One specific node  is fixed as the starting point of finding the subgraph using Prim's Algorithm.
Find the total weight or the sum of all edges in the subgraph.

Example



image

Starting from node , select the lower weight edge, i.e. , weight .

Choose between the remaining edges, , weight , and , weight .

The lower weight edge is  weight .

All nodes are connected at a cost of . The edge  is not included in the subgraph.

Function Description

Complete the prims function in the editor below.

prims has the following parameter(s):

int n: the number of nodes in the graph
int edges[m][3]: each element contains three integers, two nodes numbers that are connected and the weight of that edge
int start: the number of the starting node
Returns

int: the minimum weight to connect all nodes in the graph
Input Format

The first line has two space-separated integers  and , the number of nodes and edges in the graph.

Each of the next  lines contains three space-separated integers ,  and , the end nodes of , and the edge's weight.
The last line has an integer , the starting node.

Constraints





There may be multiple edges between two nodes.

Sample Input 0

5 6
1 2 3
1 3 4
4 2 6
5 2 2
2 3 5
3 5 7
1
Sample Output 0

15
Explanation 0

The graph given in the test case is shown as :

image

The starting node is  (in the given test case)
Applying the Prim's algorithm, edge choices available at first are :

 (WT. 3) and  (WT. 4) , out of which  is chosen (smaller weight of edge).

Now the available choices are :

 (WT. 4) ,  (WT. 5) ,  (WT. 2) and  (WT. 6) , out of which  is chosen by the algorithm.

Following the same method of the algorithm, the next chosen edges , sequentially are :

 and .

Hence the overall sequence of edges picked up by Prim's are:


and the total weight of the MST (minimum spanning tree) is : 

 /* ------------------------------- */

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
    inputString = inputString.split('\n').map(str => str.trim());
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'prims' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY edges
 *  3. INTEGER start
 */

function prims(n, edges, start) {
    // Convert 1-based index to 0-based index
    start -= 1;

    // Create an adjacency list
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v, weight] of edges) {
        // Convert 1-based index to 0-based index
        graph[u - 1].push({ node: v - 1, weight });
        graph[v - 1].push({ node: u - 1, weight });
    }

    // Priority Queue (min-heap) using an array
    const minHeap = [];
    const visited = Array(n).fill(false);
    const minEdge = Array(n).fill(Infinity);
    let totalWeight = 0;

    // Start from the initial node
    minEdge[start] = 0;
    minHeap.push({ weight: 0, node: start });

    while (minHeap.length > 0) {
        // Get the node with the smallest edge weight
        minHeap.sort((a, b) => a.weight - b.weight); // Sort to get the minimum weight
        const { node } = minHeap.shift();

        // If this node has already been visited, continue
        if (visited[node]) continue;

        // Mark the node as visited and add its edge weight to the total
        visited[node] = true;
        totalWeight += minEdge[node];

        // Update the adjacent nodes
        for (const { node: neighbor, weight } of graph[node]) {
            if (!visited[neighbor] && weight < minEdge[neighbor]) {
                minEdge[neighbor] = weight;
                minHeap.push({ weight, node: neighbor });
            }
        }
    }

    return totalWeight;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);

    let edges = Array(m);

    for (let i = 0; i < m; i++) {
        edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
    }

    const start = parseInt(readLine().trim(), 10);

    const result = prims(n, edges, start);

    ws.write(result + '\n');
    ws.end();
}
