Detective Rust is investigating a homicide and he wants to chase down the murderer. The murderer knows he would definitely get caught if he takes the main roads for fleeing, so he uses the village roads (or side lanes) for running away from the crime scene.

Rust knows that the murderer will take village roads and he wants to chase him down. He is observing the city map, but it doesn't show the village roads (or side lanes) on it and shows only the main roads.

The map of the city is a graph consisting  nodes (labeled  to ) where a specific given node  represents the current position of Rust and the rest of the nodes denote other places in the city, and an edge between two nodes is a main road between two places in the city. It can be suitably assumed that an edge that doesn't exist/isn't shown on the map is a village road (side lane). That means, there is a village road between two nodes  and  iff(if and only if) there is no city road between them.

In this problem, distance is calculated as number of village roads (side lanes) between any two places in the city.

Rust wants to calculate the shortest distance from his position (Node ) to all the other places in the city if he travels only using the village roads (side lanes).

Note: The graph/map of the city is ensured to be a sparse graph.

Input Format

The first line contains , denoting the number of test cases.  testcases follow.
First line of each test case has two integers , denoting the number of cities in the map and , denoting the number of roads in the map.
The next  lines each consist of two space-separated integers  and  denoting a main road between city  and city . The last line has an integer , denoting the current position of Rust.

Constraints

Note

No nodes will have a road to itself.
There will not be multiple edges between any pair of nodes i.e. there is at most one undirected edge between them.
Graph is guaranteed to be sparse.
It is guranteed that there will be a path between any pair of nodes using the side lanes.
Output Format

For each of T test cases, print a single line consisting of N-1 space separated integers, denoting the shortest distances of the remaining N-1 places from Rust's position (that is all distances, except the source node to itself) using the village roads/side lanes in ascending order based on vertex number.

Sample Input 0

2
4 3
1 2
2 3
1 4
1
4 2
1 2
2 3
2
Sample Output 0

3 1 2
2 2 1
Explanation 0

The graph in the first testcase can be shown as:

image Here the source node is 1 (marked S).
The distance from 1 to 2 is 3. Path: 1 -> 3 -> 4 -> 2
The distance from 1 to 3 is 1. Path: 1 -> 3
The distance from 1 to 4 is 2. Path: 1 -> 3 -> 4


 /* ---------------------------- */

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
 * Complete the rustMurdered function below.
 */
function rustMurdered(n, roads, s) {
    // Create an adjacency list for the main roads
    const graph = Array.from({ length: n + 1 }, () => new Set());
    
    for (const [u, v] of roads) {
        graph[u].add(v);
        graph[v].add(u);
    }

    // BFS to find distances using village roads (non-existing edges)
    const distances = Array(n + 1).fill(-1); // -1 indicates unvisited
    const queue = [s];
    distances[s] = 0; // Distance to itself is 0

    while (queue.length > 0) {
        const current = queue.shift();
        
        // Check all possible nodes from 1 to n
        for (let neighbor = 1; neighbor <= n; neighbor++) {
            // If neighbor is not connected to current and not visited
            if (!graph[current].has(neighbor) && neighbor !== current && distances[neighbor] === -1) {
                distances[neighbor] = distances[current] + 1; // Increase distance
                queue.push(neighbor); // Add to the queue
            }
        }
    }

    // Collect results and sort them based on node number
    const result = [];
    for (let i = 1; i <= n; i++) {
        if (i !== s) {
            result.push(distances[i]);
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const nm = readLine().split(' ');
        const n = parseInt(nm[0], 10);
        const m = parseInt(nm[1], 10);

        let roads = Array(m);
        for (let roadsRowItr = 0; roadsRowItr < m; roadsRowItr++) {
            roads[roadsRowItr] = readLine().split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
        }

        const s = parseInt(readLine(), 10);
        const result = rustMurdered(n, roads, s);

        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}
