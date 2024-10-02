John lives in HackerLand, a country with  cities and  bidirectional roads. Each of the roads has a distinct length, and each length is a power of two (i.e.,  raised to some exponent). It's possible for John to reach any city from any other city.

Given a map of HackerLand, can you help John determine the sum of the minimum distances between each pair of cities? Print your answer in binary representation.

Input Format

The first line contains two space-seperated integers denoting  (the number of cities) and  (the number of roads), respectively.
Each line  of the  subsequent lines contains the respective values of , , and  as three space-separated integers. These values define a bidirectional road between cities  and  having length .

Constraints

, 
If , then .
Output Format

Find the sum of minimum distances of each pair of cities and print the answer in binary representation.

Sample Input

5 6
1 3 5
4 5 0
2 1 3
3 2 1
4 3 4
4 2 2
Sample Output

1000100
Explanation

In the sample, the country looks like this:

image

Let  be the minimum distance between city  and city .



/* ------------------------------ */

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
 * Complete the 'roadsInHackerland' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY roads
 */

function roadsInHackerland(n, roads) {
    // Initialize the distance matrix
    const inf = Infinity;
    const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(inf));

    // Set the distance to zero for each city to itself
    for (let i = 1; i <= n; i++) {
        dist[i][i] = 0;
    }

    // Fill the distance matrix with the given roads
    for (const [u, v, length] of roads) {
        dist[u][v] = Math.min(dist[u][v], length); // In case of multiple roads
        dist[v][u] = Math.min(dist[v][u], length);
    }

    // Apply the Floyd-Warshall algorithm
    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (dist[i][k] !== inf && dist[k][j] !== inf) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    // Calculate the sum of all minimum distances
    let totalDistance = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = i + 1; j <= n; j++) { // Only sum pairs (i, j) where i < j
            totalDistance += dist[i][j];
        }
    }

    // Convert the total distance to binary
    return totalDistance.toString(2);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);

    let roads = Array(m);
    for (let i = 0; i < m; i++) {
        roads[i] = readLine().replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    const result = roadsInHackerland(n, roads);
    ws.write(result + '\n');

    ws.end();
}
