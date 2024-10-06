Given a tree with vertices numbered from  to . You need to process  queries. Each query represents a vertex number encoded in the following way:

Queries are encoded in the following way: Let,  be the  query and  be the answer for the  query where  and  is always . Then vertex . We are assure that  is between  and , and hasn't been removed before.

Note:  is the bitwise XOR operator.

For each query, first decode the vertex  and then perform the following:

Print the size of the connected component containing .
Remove vertex  and all edges connected to .
Input Format

The first line contains a single integer, , denoting the number of vertices in the tree.
Each line  of the  subsequent lines (where ) contains  space-separated integers describing the respective nodes,  and , connected by edge .
The next line contains a single integer, , denoting the number of queries.
Each line  of the  subsequent lines contains a single integer, vertex number .

Constraints

Output Format

For each query, print the size of the corresponding connected component on a new line.

Sample Input 0

3
1 2
1 3
3
1
1
2
Sample Output 0

3
1
1
Sample Input 1

4
1 2
1 3
1 4
4
3
6
2
6
Sample Output 1

4
3
2
1
Explanation

Sample Case 0:
We have,  = 0 and connected component : 
 has vertex =  =  = . The size of connected component containing  is .
So,  = . Removing vertex  and all of it's edges, we get two disconnected components : 
 has vertex =  =  = . The size of connected component containing  is .
So,  = .
Removing vertex  and all of it's edges, we are left with only one component : 
 has vertex =  =  = . The size of connected component containing  is .
So,  = .
Removed vertex .

Sample Case 1:
We have,  =  and connected component : 
 has vertex =  =  = . The size of connected component containing  is .
So,  = .
Removing vertex  and all of it's edges, we get component : 
 has vertex =  =  = . The size of connected component containing  is .
So,  = .
Removing vertex  and all of it's edges, now, we get two disconnected components : 
 has vertex =  =  = . The size of connected component containing  is .
So,  = .
Removing vertex  and all of it's edges, now we are left with only one component : 
 has vertex =  =  = . The size of connected component containing  is .
So,  = .
Removed vertex .

 /*--------------------------*/


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
 * Complete the 'treeSplitting' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY edges
 *  3. INTEGER_ARRAY queries
 */

function treeSplitting(n, edges, queries) {
    const graph = Array.from({ length: n + 1 }, () => []);
    const removed = Array(n + 1).fill(false);
    
    // Build the graph
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    // Store the results for the queries
    const results = [];
    
    // Function to compute the size of the connected component
    function dfs(node) {
        let size = 1;
        removed[node] = true; // Mark this node as removed

        for (const neighbor of graph[node]) {
            if (!removed[neighbor]) {
                size += dfs(neighbor);
            }
        }
        return size;
    }

    let currentXOR = 0;

    // Process each query
    for (const query of queries) {
        const vertex = query ^ currentXOR; // Decode the vertex

        // Calculate size of the component containing the vertex
        const size = dfs(vertex); // Perform DFS to get the size
        results.push(size);

        currentXOR = vertex; // Update currentXOR for the next query
    }

    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let edges = Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
        edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
    }

    const queriesCount = parseInt(readLine().trim(), 10);

    let queries = [];

    for (let i = 0; i < queriesCount; i++) {
        const queriesItem = parseInt(readLine().trim(), 10);
        queries.push(queriesItem);
    }

    const result = treeSplitting(n, edges, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
