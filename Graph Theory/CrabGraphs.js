A crab is an undirected graph which has two kinds of vertices: 1 head, and K feet , and exactly K edges which join the head to each of the feet.( 1 <= K <= T, where T is given)

Given an undirected graph, you have to find in it some vertex-disjoint subgraphs where each one is a crab . The goal is to select those crabs in such a way that the total number of vertices covered by them is maximized.

Note: two graphs are vertex-disjoint if they do not have any vertices in common. 

Input Format

The first line of input contains a single integer C. C test-cases follow. The first line of each test-case contains three integers N, T, and M (the number of nodes, max number of feet in the crab graph, and number of edges, respectively). Each of next M lines contains two space separated values v1i, v2i meaning that the there is an edge between vertices v1i and v2i. Note that the graph doesn't have parallel edges or loops.

Constraints

1 <= C <= 10
2 <= T <= 100
2 <= N <= 100
0 <= M <= N * (N-1)/2
1 <= v1i <= N
1 <= v2i <= N
Output Format

For each test-case, output a single integer indicating the maximum number of vertices which can be covered by vertex-disjoint sub-graphs of crab- graphs.

Sample Input

2  
8 2 7  
1 4  
2 4  
3 4  
5 4  
5 8  
5 7  
5 6  
6 3 8  
1 2  
2 3  
3 4  
4 5  
5 6  
6 1  
1 4  
2 5
Sample Output

6  
6
Explanation

Test #1: The graph for this test-case below. Because T = 2, each crab can have a maximum of 2 feet => each crab can cover a maximum of 3 nodes. We can cover 6 nodes of this graph with these two crabs: One of the crabs has 4 as its head and 1 and 3 as its feet, the other crab has 5 as its head and 7 and 8 as its feet. No additional crabs can be added.

The above is not a unique solution: any combination of two crabs, with one head at 4 and one head at 5, will suffice. We could have also chosen Head[4]feet[1,2] and Head[5]feet[6,7] as our two crabs.

im1.png

Test #2: The graph for this test-case below. We can cover all 6 nodes using two crabs. One of the crabs has 2 as its head and 1 and 3 as its feet, the other crab has 5 as its head and 4 and 6 as its feet.

im2.png

 /* ----------------------- */


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
 * Complete the 'crabGraphs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER t
 *  3. 2D_INTEGER_ARRAY graph
 */

function crabGraphs(n, t, graph) {
    const adjacencyList = Array.from({ length: n + 1 }, () => []);
    
    // Building the adjacency list
    for (const [u, v] of graph) {
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    }

    const visited = Array(n + 1).fill(false);
    let maxCovered = 0;

    function backtrack(coveredCount) {
        // Try to find a head and its feet
        for (let head = 1; head <= n; head++) {
            if (visited[head]) continue;

            // Gather possible feet
            const feet = [];
            for (const neighbor of adjacencyList[head]) {
                if (!visited[neighbor]) {
                    feet.push(neighbor);
                }
            }

            const numFeet = Math.min(feet.length, t);
            if (numFeet > 0) {
                // Select up to T feet and mark them as visited
                for (let i = 0; i < numFeet; i++) {
                    visited[feet[i]] = true;
                }
                visited[head] = true;

                // Recurse and count the covered vertices
                backtrack(coveredCount + (numFeet + 1));

                // Unmark for backtracking
                for (let i = 0; i < numFeet; i++) {
                    visited[feet[i]] = false;
                }
                visited[head] = false;
            }
        }
        
        // Update max covered vertices
        maxCovered = Math.max(maxCovered, coveredCount);
    }

    backtrack(0);
    return maxCovered;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const c = parseInt(readLine().trim(), 10);

    for (let cItr = 0; cItr < c; cItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const t = parseInt(firstMultipleInput[1], 10);
        const m = parseInt(firstMultipleInput[2], 10);

        let graph = Array(m);
        for (let i = 0; i < m; i++) {
            graph[i] = readLine().replace(/\s+$/g, '').split(' ').map(graphTemp => parseInt(graphTemp, 10));
        }

        const result = crabGraphs(n, t, graph);
        ws.write(result + '\n');
    }

    ws.end();
}
