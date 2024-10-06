The mayor of Farzville is studying the city's road system to find ways of improving its traffic conditions. Farzville's road system consists of  junctions connected by  bidirectional toll roads, where the  toll road connects junctions  and . In addition, some junctions may not be reachable from others and there may be multiple roads connecting the same pair of junctions.

Each toll road has a toll rate that's paid each time it's used. This rate varies depending on the direction of travel:

If traveling from  to , then the toll rate is .
If traveling from  to , then the toll rate is . It is guaranteed that .
image

For each digit , the mayor wants to find the number of ordered pairs of  junctions such that  and a path exists from  to  where the total cost of the tolls (i.e., the sum of all toll rates on the path) ends in digit . Given a map of Farzville, can you help the mayor answer this question? For each digit  from  to , print the the number of valid ordered pairs on a new line.

Note: Each toll road can be traversed an unlimited number of times in either direction.

Input Format

The first line contains two space-separated integers describing the respective values of  (the number of junctions) and  (the number of roads).
Each line  of the  subsequent lines describes a toll road in the form of three space-separated integers, , , and .

Constraints

Output Format

Print ten lines of output. Each line  (where ) must contain a single integer denoting the answer for . For example, the first line must contain the answer for , the second line must contain the answer for , and so on.

Sample Input 0

3 3
1 3 602
1 2 256
2 3 411
Sample Output 0

0
2
1
1
2
0
2
1
1
2
Explanation 0

The table below depicts the distinct pairs of junctions for each :

Note the following:

There may be multiple paths between each pair of junctions.
Junctions and roads may be traversed multiple times. For example, the path  is also valid, and it has total cost of .
An ordered pair can be counted for more than one . For example, the pair  is counted for  and .
Each ordered pair must only be counted once for each . For example, the paths  and  both have total costs that end in , but the pair  is only counted once.


 /* --------------------- */

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
    const roadNodesEdges = readLine().split(' ');
    const roadNodes = parseInt(roadNodesEdges[0], 10);
    const roadEdges = parseInt(roadNodesEdges[1], 10);

    const graph = Array.from({ length: roadNodes + 1 }, () => []);
   
    // Read in all edges
    for (let i = 0; i < roadEdges; i++) {
        const roadFromToWeight = readLine().split(' ');
        const u = parseInt(roadFromToWeight[0], 10);
        const v = parseInt(roadFromToWeight[1], 10);
        const w = parseInt(roadFromToWeight[2], 10);

        // Store both directions with their respective costs
        graph[u].push({ node: v, weight: w });
        graph[v].push({ node: u, weight: w });
    }

    // To hold count of valid pairs for each last digit from 0 to 9
    const countByDigit = Array(10).fill(0);

    // Traverse from each junction
    for (let start = 1; start <= roadNodes; start++) {
        const queue = [];
        const visited = new Set();
        const tollCounts = Array(10).fill(0); // Count paths for each last digit

        // Start BFS from the current junction
        queue.push({ node: start, cost: 0 });
        tollCounts[0] = 1; // Start with a cost of 0

        while (queue.length > 0) {
            const { node, cost } = queue.shift();

            // Explore neighbors
            for (const { node: neighbor, weight } of graph[node]) {
                const newCost = (cost + weight) % 10;

                // If not visited, add to queue
                if (!visited.has(neighbor)) {
                    queue.push({ node: neighbor, cost: newCost });
                    visited.add(neighbor);
                }

                // Count the ways to reach `neighbor` with `newCost`
                tollCounts[newCost] += tollCounts[cost % 10];
            }
        }

        // Count pairs based on the last digit counts
        for (let j = 1; j <= roadNodes; j++) {
            if (j !== start) { // Don't count the same node
                for (let d = 0; d < 10; d++) {
                    countByDigit[d] += tollCounts[d];
                }
            }
        }
    }

    // Output results
    for (let i = 0; i < 10; i++) {
        console.log(countByDigit[i]);
    }
}