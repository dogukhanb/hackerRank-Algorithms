Given a directed weighted graph where weight indicates distance, for each query, determine the length of the shortest path between nodes. There may be many queries, so efficiency counts.

For example, your graph consists of  nodes as in the following:

image

A few queries are from node  to node , node  to node , and node  to node .


There are two paths from  to :

 at a distance of 
 at a distance of 
In this case we choose path .
There is no path from  to , so we return .

There is one path from  to :

 at a distance of .
Input Format

The first line has two integers  and , the number of nodes and the number of edges in the graph.
Each of the next  lines contains three space-separated integers   and , the two nodes between which the directed edge  exists, and , the length of the edge.
The next line contains a single integer , the number of queries.
Each of the next  lines contains two space-separated integers  and , denoting the start and end nodes for traversal.

Constraints






The distance from a node to itself is always  and it is always reachable from itself.

If there are edges between the same pair of nodes with different weights, the last one (most recent) is to be considered as the only edge between them.

Output Format

Print  lines, each containing a single integer specifying the shortest distance for the query.

If the destination node is not reachable, return .

Sample Input

STDIN   Function
-----   --------
4 5     n = 4, m = 5
1 2 5   u = 1, v = 2, w = 5
1 4 24  u = 1, v =4, w = 24 ...
2 4 6
3 4 4
3 2 7
3       q = 3
1 2     query 0: from 1 to 2
3 1     query 1: from 3 to 1
1 4     query 2: from 1 to 4
Sample Output

5
-1
11
Explanation

The graph given in the test case is:

image

The shortest paths for the 3 queries are :

: The direct path is shortest with weight 5
: There is no way of reaching node 1 from node 3
: The indirect path is shortest with weight (5+6) = 11 units. The direct path is longer with 24 units length.

 /* ---------------------- */


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

// Dijkstra's algorithm to find shortest paths from a start node
function dijkstra(graph, startNode, n) {
    const distances = new Array(n + 1).fill(Infinity);
    distances[startNode] = 0;
    const pq = new MinHeap();
    pq.push([startNode, 0]);

    while (!pq.isEmpty()) {
        const [node, distance] = pq.pop();

        if (distance > distances[node]) continue;

        for (const [neighbor, weight] of graph[node]) {
            const newDistance = distances[node] + weight;
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                pq.push([neighbor, newDistance]);
            }
        }
    }

    return distances;
}

function main() {
    const roadNodesEdges = readLine().split(' ');
    const roadNodes = parseInt(roadNodesEdges[0], 10);
    const roadEdges = parseInt(roadNodesEdges[1], 10);

    // Create graph
    const graph = Array.from({ length: roadNodes + 1 }, () => []);
    const edgeMap = new Map(); // To handle edges with the same nodes

    for (let i = 0; i < roadEdges; i++) {
        const [u, v, w] = readLine().split(' ').map(Number);
        edgeMap.set(`${u}-${v}`, w); // Store the latest weight for each edge
    }

    // Populate the graph with unique edges
    for (const [key, weight] of edgeMap) {
        const [u, v] = key.split('-').map(Number);
        graph[u].push([v, weight]);
    }

    const q = parseInt(readLine().trim(), 10);

    // Process each query
    for (let qItr = 0; qItr < q; qItr++) {
        const [startNode, endNode] = readLine().split(' ').map(Number);
        const distances = dijkstra(graph, startNode, roadNodes);
        const result = distances[endNode] === Infinity ? -1 : distances[endNode];
        console.log(result);
    }
}

// MinHeap class for the priority queue implementation
class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(item) {
        this.heap.push(item);
        this.bubbleUp();
    }

    pop() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return min;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        const element = this.heap[index];
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];
            if (element[1] >= parent[1]) break;
            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }

    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild[1] < element[1]) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild[1] < element[1]) ||
                    (swap !== null && rightChild[1] < leftChild[1])
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            index = swap;
        }
        this.heap[index] = element;
    }
}