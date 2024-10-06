Chinese

Fedor is a research scientist, who has recently found a road map of Ancient Berland.

Ancient Berland consisted of N cities that were connected by M bidirectional roads. The road builders weren't knowledgable. Hence, the start city and the end city for each road were always chosen randomly and independently. As a result, there were more than one road between some pairs of cities. Nevertheless, by luck, the country remained connected (i.e. you were able to get from one city to another via these M roads). And for any road, the start and the end city were not the same.

Moreover, each road had it's own value of importance. This value was assigned by the Road Minister of Ancient Berland. The Road Minister also was not knowledgable, so these numbers were assigned to the roads randomly and independently from the other roads.

When there was a war with the neighboring countries (usually it was with Ancient Herland), it was important to estimate separation number for some pairs of cities.

The separation number for a pair of cities - let's call these cities A and B - is explained below:

Consider a set of roads that were built. The subset of this set is good, if after removing all roads from this set, there's no longer a way from A to B. The minimal possible sum of roads' value of importance of any good subset is a separation number for the pair of cities (A, B).

For a research, Fedor would like to know the product of separation values over all unordered pairs of cities. Please, find this number. It can be huge, so we ask you to output its product modulo 109+7.

Input Format

The first line of input consist of two integers N and M, separated by a single space.
Then, M lines follow. Each of these lines consist of three integers Xi, Yi, Zi separated by a single space.
It means that there was a road between the city Xi and the city Yi with a value of importance equal to Zi.

Constraints

3 ≤ N ≤ 500
3 ≤ M ≤ 104
1 ≤ value of importance ≤ 105
The cities are indexed from 1 to N.

Scoring

In the 25% of the test data N = 50 and M = 300.

In another 25% of the test data N = 200 and M = 10000

In the rest of the test data N = 500 and M = 10000

Output Format

An integer that represents the value, Fedor needs, modulo 109+7.

Sample Input 1

CopyDownload
Undirected Weighed Graph: road
1
2
3
3
2
1

 
3 3
1 2 3
2 3 1
1 3 2
Sample Output 1

36
Explanation 1

There are three unordered pairs of cities: (1, 2), (1, 3) and (2, 3). Let's look at the separation numbers:

For (1, 2) we have to remove the first and the second roads. The sum of the importance values is 4.

For (1, 3) we have to remove the second and the third roads. The sum of the importance values is 3.

For (2, 3) we have to remove the second and the third roads. The sum of the importance values is 3.

So, we get 4 * 3 * 3 = 36.


/* --------------------- */


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

function roadNetwork(roadNodes, roadFrom, roadTo, roadWeight) {
    const MOD = 10 ** 9 + 7;

    // Create the capacity graph
    const capacity = Array.from({ length: roadNodes + 1 }, () => Array(roadNodes + 1).fill(0));

    for (let i = 0; i < roadFrom.length; i++) {
        const u = roadFrom[i];
        const v = roadTo[i];
        const w = roadWeight[i];
        // Store the capacity (sum of weights for multiple edges)
        capacity[u][v] += w;
        capacity[v][u] += w; // undirected graph
    }

    let product = 1;

    const bfs = (source, sink, parent) => {
        const visited = Array(capacity.length).fill(false);
        const queue = [source];
        visited[source] = true;

        while (queue.length > 0) {
            const u = queue.shift();

            for (let v = 1; v < capacity.length; v++) {
                if (!visited[v] && capacity[u][v] > 0) {
                    visited[v] = true;
                    parent[v] = u;
                    queue.push(v);
                    if (v === sink) return true;
                }
            }
        }
        return false;
    };

    const edmondsKarp = (source, sink) => {
        const parent = Array(capacity.length).fill(-1);
        let maxFlow = 0;

        while (bfs(source, sink, parent)) {
            let pathFlow = Infinity;
            for (let v = sink; v !== source; v = parent[v]) {
                const u = parent[v];
                pathFlow = Math.min(pathFlow, capacity[u][v]);
            }

            for (let v = sink; v !== source; v = parent[v]) {
                const u = parent[v];
                capacity[u][v] -= pathFlow;
                capacity[v][u] += pathFlow;
            }

            maxFlow += pathFlow;
        }

        return maxFlow;
    };

    // Calculate the separation numbers for all unique pairs of cities
    for (let i = 1; i <= roadNodes; i++) {
        for (let j = i + 1; j <= roadNodes; j++) {
            const separationValue = edmondsKarp(i, j);
            product = (product * separationValue) % MOD;
        }
    }

    return product;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const roadNodesEdges = readLine().split(' ');

    const roadNodes = parseInt(roadNodesEdges[0], 10);
    const roadEdges = parseInt(roadNodesEdges[1], 10);

    let roadFrom = [];
    let roadTo = [];
    let roadWeight = [];

    for (let i = 0; i < roadEdges; i++) {
        const roadFromToWeight = readLine().split(' ');

        roadFrom.push(parseInt(roadFromToWeight[0], 10));
        roadTo.push(parseInt(roadFromToWeight[1], 10));
        roadWeight.push(parseInt(roadFromToWeight[2], 10));
    }

    const result = roadNetwork(roadNodes, roadFrom, roadTo, roadWeight);

    ws.write(result + '\n');

    ws.end();
}