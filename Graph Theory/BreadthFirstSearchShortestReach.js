Consider an undirected graph where each edge weighs 6 units. Each of the nodes is labeled consecutively from 1 to n.

You will be given a number of queries. For each query, you will be given a list of edges describing an undirected graph. After you create a representation of the graph, you must determine and report the shortest distance to each of the other nodes from a given starting position using the breadth-first search algorithm (BFS). Return an array of distances from the start node in node number order. If a node is unreachable, return  for that node.

Example
The following graph is based on the listed inputs:

image

 // number of nodes
 // number of edges

 // starting node

All distances are from the start node . Outputs are calculated for distances to nodes  through : . Each edge is  units, and the unreachable node  has the required return distance of .

Function Description

Complete the bfs function in the editor below. If a node is unreachable, its distance is .

bfs has the following parameter(s):

int n: the number of nodes
int m: the number of edges
int edges[m][2]: start and end nodes for edges
int s: the node to start traversals from
Returns
int[n-1]: the distances to nodes in increasing node number order, not including the start node (-1 if a node is not reachable)

Input Format

The first line contains an integer , the number of queries. Each of the following  sets of lines has the following format:

The first line contains two space-separated integers  and , the number of nodes and edges in the graph.
Each line  of the  subsequent lines contains two space-separated integers,  and , that describe an edge between nodes  and .
The last line contains a single integer, , the node number to start from.
Constraints

Sample Input

2
4 2
1 2
1 3
1
3 1
2 3
2
Sample Output

6 6 -1
-1 6
Explanation

We perform the following two queries:

The given graph can be represented as:
image
where our start node, , is node . The shortest distances from  to the other nodes are one edge to node , one edge to node , and an infinite distance to node  (which it is not connected to). We then return an array of distances from node  to nodes , , and  (respectively): .

The given graph can be represented as:
image
where our start node, , is node . There is only one edge here, so node  is unreachable from node  and node  has one edge connecting it to node . We then return an array of distances from node  to nodes , and  (respectively): .

Note: Recall that the actual length of each edge is , and we return  as the distance to any node that is unreachable from .

/* ------------------------------------------ */
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
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */
function bfs(n, m, edges, s) {
    // Create an adjacency list for the graph
    const graph = Array.from({ length: n + 1 }, () => []);
    
    // Populate the graph with edges
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    // Initialize distances
    const distances = Array(n + 1).fill(-1);
    distances[s] = 0; // Distance to itself is 0

    // Perform BFS
    const queue = [s];
    while (queue.length > 0) {
        const currentNode = queue.shift();
        
        for (const neighbor of graph[currentNode]) {
            // If the neighbor has not been visited
            if (distances[neighbor] === -1) {
                distances[neighbor] = distances[currentNode] + 6; // Update distance
                queue.push(neighbor); // Add to queue for further exploration
            }
        }
    }

    // Return distances excluding the starting node (1 to n, but 0 is ignored)
    return distances.slice(1).filter((_, index) => index + 1 !== s);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const m = parseInt(firstMultipleInput[1], 10);

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const s = parseInt(readLine().trim(), 10);

        const result = bfs(n, m, edges, s);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
