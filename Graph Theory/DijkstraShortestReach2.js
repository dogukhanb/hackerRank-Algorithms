Given an undirected graph and a starting node, determine the lengths of the shortest paths from the starting node to all other nodes in the graph. If a node is unreachable, its distance is -1. Nodes will be numbered consecutively from  to , and edges will have varying distances or lengths.

For example, consider the following graph of 5 nodes:

Begin	End	Weight
1	2	5
2	3	6
3	4	2
1	3	15
image
Starting at node , the shortest path to  is direct and distance . Going from  to , there are two paths:  at a distance of  or  at a distance of . Choose the shortest path, . From  to , choose the shortest path through  and extend it:  for a distance of  There is no route to node , so the distance is .

The distances to all nodes in increasing node order, omitting the starting node, are 5 11 13 -1.

Function Description

Complete the shortestReach function in the editor below. It should return an array of integers that represent the shortest distance to each node from the start node in ascending order of node number.

shortestReach has the following parameter(s):

n: the number of nodes in the graph
edges: a 2D array of integers where each  consists of three integers that represent the start and end nodes of an edge, followed by its length
s: the start node number
Input Format

The first line contains , the number of test cases.

Each test case is as follows:
- The first line contains two space-separated integers  and , the number of nodes and edges in the graph.
- Each of the next  lines contains three space-separated integers , , and , the beginning and ending nodes of an edge, and the length of the edge.
- The last line of each test case has an integer , denoting the starting position.

Constraints






If there are edges between the same pair of nodes with different weights, they are to be considered as is, like multiple edges.

Output Format

For each of the  test cases, print a single line consisting  space separated integers denoting the shortest distance to the  nodes from starting position  in increasing order of their labels, excluding .

For unreachable nodes, print .

Sample Input

1
4 4
1 2 24
1 4 20
3 1 3
4 3 12
1
Sample Output

24 3 15
Explanation

The graph given in the test case is shown as :

image
* The lines are weighted edges where weight denotes the length of the edge.

The shortest paths followed for the three nodes 2, 3 and 4 are as follows :

1/S->2 - Shortest Path Value : 

1/S->3 - Shortest Path Value : 

1/S->3->4 - Shortest Path Value : 


 /*---------------------- */

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
 * Complete the 'shortestReach' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY edges
 *  3. INTEGER s
 */

function shortestReach(n, edges, s) {
    // Create the adjacency list
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, w] of edges) {
        graph[u].push({ node: v, weight: w });
        graph[v].push({ node: u, weight: w });
    }

    // Initialize distance array and priority queue
    const distances = Array(n + 1).fill(Infinity);
    distances[s] = 0;

    const priorityQueue = [{ node: s, distance: 0 }];
    
    // Dijkstra's Algorithm
    while (priorityQueue.length > 0) {
        // Get the node with the smallest distance
        const { node: currentNode } = priorityQueue.sort((a, b) => a.distance - b.distance).shift();
        
        for (const { node: neighbor, weight } of graph[currentNode]) {
            const newDistance = distances[currentNode] + weight;
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                priorityQueue.push({ node: neighbor, distance: newDistance });
            }
        }
    }

    // Prepare the result, omitting the distance for the starting node
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i !== s) {
            result.push(distances[i] === Infinity ? -1 : distances[i]);
        }
    }
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const m = parseInt(firstMultipleInput[1], 10);

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const s = parseInt(readLine().trim(), 10);

        const result = shortestReach(n, edges, s);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
