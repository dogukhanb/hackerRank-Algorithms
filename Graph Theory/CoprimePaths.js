You are given an undirected, connected graph, , with  nodes and  edges where . Each node  is initially assigned a value, , that has at most  prime divisors.

You must answer  queries in the form u v. For each query, find and print the number of  pairs of nodes on the path between  and  such that  and the length of the path between  and  is minimal among all paths from  to .

Input Format

The first line contains two space-separated integers describing the respective values of  and .
The second line contains  space-separated integers describing the respective values of .
Each of the  subsequent lines contains two space-separated integers,  and , describing an edge between nodes  and .
Each of the  subsequent lines contains two space-separated integers,  and , describing a query.

Constraints

Output Format

For each query, print an integer on a new line denoting the number of  pairs of nodes on the path between  and  such that  and the length of the path between  and  is minimal among all paths from  to .

Sample Input 0

6 5
3 2 4 1 6 5
1 2
1 3
2 4
2 5
3 6
4 6
5 6
1 1
1 6
6 1
Sample Output 0

9
6
0
3
3
Explanation 0

The diagram below depicts graph  and the  paths specified by each query, as well as the Pair Values for each path in the form :

image

Recall that, for each queried path, we want to find and print the number of  pairs of nodes such that .

 /* ------------------------- */

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
    const firstMultipleInput = readLine().trim().split(' ');
    const n = parseInt(firstMultipleInput[0], 10);
    const q = parseInt(firstMultipleInput[1], 10);
   
    const values = readLine().trim().split(' ').map(Number);
    const graph = Array.from({ length: n + 1 }, () => []);
   
    for (let i = 0; i < n - 1; i++) {
        const edge = readLine().trim().split(' ').map(Number);
        graph[edge[0]].push(edge[1]);
        graph[edge[1]].push(edge[0]);
    }
   
    // Read all queries
    for (let i = 0; i < q; i++) {
        const query = readLine().trim().split(' ').map(Number);
        const u = query[0];
        const v = query[1];
       
        const path = bfs(graph, u, v);
        const count = countPairs(path, values);
        console.log(count);
    }
}

function bfs(graph, start, end) {
    const queue = [start];
    const visited = new Set();
    const parent = new Map();
    visited.add(start);
   
    while (queue.length > 0) {
        const node = queue.shift();
       
        if (node === end) {
            const path = [];
            let curr = end;
            while (curr !== undefined) {
                path.push(curr);
                curr = parent.get(curr);
            }
            return path.reverse(); // Return the path in the correct order
        }
       
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parent.set(neighbor, node);
                queue.push(neighbor);
            }
        }
    }
   
    return []; // No path found, should not happen in a connected graph
}

function countPairs(path, values) {
    const countMap = {};
    let pairCount = 0;

    for (const node of path) {
        const value = values[node - 1];
        const divisors = getPrimeDivisors(value);
       
        // Count pairs with previous nodes
        for (const divisor of divisors) {
            if (countMap[divisor] !== undefined) {
                pairCount += countMap[divisor]; // Add pairs with previous counts
            }
        }
       
        // Update countMap with current node's divisors
        for (const divisor of divisors) {
            countMap[divisor] = (countMap[divisor] || 0) + 1; // Initialize or increment
        }
    }

    return pairCount;
}

function getPrimeDivisors(num) {
    const divisors = new Set();
    for (let i = 2; i * i <= num; i++) {
        while (num % i === 0) {
            divisors.add(i);
            num /= i;
        }
    }
    if (num > 1) {
        divisors.add(num); // Add the last prime if any
    }
    return Array.from(divisors);
}