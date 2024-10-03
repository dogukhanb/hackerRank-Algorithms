King Arthur has a large kingdom that can be represented as a tree, where nodes correspond to cities and edges correspond to the roads between cities. The kingdom has a total of  cities numbered from  to .

The King wants to divide his kingdom between his two children, Reggie and Betty, by giving each of them  or more cities; however, they don't get along so he must divide the kingdom in such a way that they will not invade each other's cities. The first sibling will invade the second sibling's city if the second sibling has no other cities directly connected to it. For example, consider the kingdom configurations below:

image

Given a map of the kingdom's  cities, find and print the number of ways King Arthur can divide it between his two children such that they will not invade each other. As this answer can be quite large, it must be modulo .

Input Format

The first line contains a single integer denoting  (the number of cities in the kingdom).
Each of the  subsequent lines contains two space-separated integers,  and , describing a road connecting cities  and .

Constraints

It is guaranteed that all cities are connected.
Subtasks

 for  of the maximum score.
Output Format

Print the number of ways to divide the kingdom such that the siblings will not invade each other, modulo .

Sample Input

5
1 2
1 3
3 4
3 5
Sample Output

4
Explanation

In the diagrams below, red cities are ruled by Betty and blue cities are ruled by Reggie. The diagram below shows a division of the kingdom that results in war between the siblings:

image

Because cities  and  are not connected to any other red cities, blue city  will cut off their supplies and declare war on them. That said, there are four valid ways to divide the kingdom peacefully:

image

We then print the value of  as our answer.


 /* ---------------------- */

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
 * Complete the 'kingdomDivision' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY roads
 */

const MOD = 1000000007;

function kingdomDivision(n, roads) {
    // Create an adjacency list for the tree
    const graph = Array.from({ length: n + 1 }, () => []);
    
    for (const [u, v] of roads) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let totalWays = 0;

    // Function to perform DFS and count the sizes of subtrees
    const dfs = (node, parent) => {
        let size = 1; // Count this node

        for (const neighbor of graph[node]) {
            if (neighbor === parent) continue; // Avoid going back to the parent

            const subtreeSize = dfs(neighbor, node);
            // After returning from the child, calculate possible divisions
            totalWays = (totalWays + (subtreeSize * (n - subtreeSize)) % MOD) % MOD;

            size += subtreeSize; // Increment the size of the current subtree
        }

        return size; // Return the size of the subtree rooted at this node
    };

    dfs(1, -1); // Start DFS from node 1 (arbitrary root)

    return totalWays;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let roads = Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
        roads[i] = readLine().replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    const result = kingdomDivision(n, roads);

    ws.write(result + '\n');

    ws.end();
}
