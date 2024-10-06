You have a rooted tree with  vertices numbered from  through  where the root is vertex .

You are given  triplets, the  triplet is denoted by three integers . The  triplet represents a simple path in the tree with endpoints in  and  such that  is ancestor of . The cost of the path is .

You have to select a subset of the paths such that the sum of path costs is maximum and the  edge of the tree belongs to at most  paths from the subset. Print the sum as the output.

Input Format

The first line contains a single integer, , denoting the number of testcases. Each testcase is defined as follows:

The first line contains two space-separated integers,  (the number of vertices) and  (the number of paths), respectively.
Each line  of the  subsequent lines contains three space-separated integers describing the respective values of , , and  where (, ) is an edge in the tree and  is maximum number of paths which can include this edge.
Each line of the  subsequent lines contains three space-separated integers describing the respective values of , , and  () that define the  path and its cost.
Constraints

Let  be the sum of  over all the trees.
Let  be the sum of  over all the trees.
Output Format

You must print  lines, where each line contains a single integer denoting the answer for the corresponding testcase.

Sample Input

1
8 8
1 2 3
1 3 1
2 4 5
2 5 1
2 6 1
3 7 2
4 8 1
1 2 3
2 8 5
1 8 7
1 5 8
1 6 10
3 7 5
1 7 6
1 7 6
Sample Output

37
Explanation

vertical(1).png

One of the possible subsets contains paths . Its total cost is .


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
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'verticalPaths' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY paths
 *  3. 2D_INTEGER_ARRAY edges
 */

function verticalPaths(n, paths, edges) {
    // Prepare the tree structure and limits for edges
    const edgeLimit = {};
    const tree = new Array(n + 1).fill(null).map(() => []);
   
    for (const [u, v, limit] of edges) {
        const edge = `${Math.min(u, v)}-${Math.max(u, v)}`; // Unique edge representation
        edgeLimit[edge] = limit;
        tree[u].push(v);
        tree[v].push(u);
    }

    // Prepare path costs and their edge lists
    const pathCosts = [];
   
    for (const [u, v, cost] of paths) {
        const pathEdges = getPathEdges(u, v, tree);
        pathCosts.push({ cost, edges: pathEdges });
    }

    // Sort paths by cost in descending order
    pathCosts.sort((a, b) => b.cost - a.cost);

    const edgeUsage = {};
    let totalCost = 0;

    // Process each path in descending order of cost
    for (const { cost, edges } of pathCosts) {
        let canTake = true;

        // Check edge usage
        for (const edge of edges) {
            if (!edgeUsage[edge]) edgeUsage[edge] = 0;
            if (edgeUsage[edge] >= edgeLimit[edge]) {
                canTake = false; // Exceeds limit
                break;
            }
        }

        // If we can take this path, update total cost and edge usage
        if (canTake) {
            totalCost += cost;
            for (const edge of edges) {
                edgeUsage[edge]++;
            }
        }
    }

    return totalCost;
}

// Helper function to get the path edges between two nodes (u and v)
function getPathEdges(u, v, tree) {
    const edges = [];
    const visited = new Set();
   
    const dfs = (node, target, path) => {
        if (node === target) {
            for (let i = 0; i < path.length - 1; i++) {
                edges.push(`${Math.min(path[i], path[i + 1])}-${Math.max(path[i], path[i + 1])}`);
            }
            return true;
        }
       
        visited.add(node);
       
        for (const neighbor of tree[node]) {
            if (!visited.has(neighbor)) {
                path.push(neighbor);
                if (dfs(neighbor, target, path)) return true;
                path.pop();
            }
        }
       
        return false;
    };

    dfs(u, v, [u]);
    return edges;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const m = parseInt(firstMultipleInput[1], 10);

        let paths = Array(n - 1);

        for (let i = 0; i < n - 1; i++) {
            paths[i] = readLine().replace(/\s+$/g, '').split(' ').map(pathsTemp => parseInt(pathsTemp, 10));
        }

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const result = verticalPaths(n, paths, edges);

        ws.write(result + '\n');
    }

    ws.end();
}