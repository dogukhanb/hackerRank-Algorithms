Byteland has  cities (numbered from  to ) and  bidirectional roads. It is guaranteed that there is a route from any city to any other city.

Jeanie is a postal worker who must deliver  letters to various cities in Byteland. She can start and end her delivery route in any city. Given the destination cities for  letters and the definition of each road in Byteland, find and print the minimum distance Jeanie must travel to deliver all  letters.

Note: The letters can be delivered in any order.

Input Format

The first line contains two space-separated integers,  (the number of cities) and  (the number of letters), respectively.
The second line contains  space-separated integers describing the delivery city for each letter.
Each line  of the  subsequent lines contains  space-separated integers describing a road as , where  is the distance (length) of the bidirectional road between cities  and .

Constraints

Output Format

Print the minimum distance Jeanie must travel to deliver all  letters.

Sample Input 0

5 3
1 3 4
1 2 1
2 3 2
2 4 2
3 5 3
Sample Output 0

6
Explanation 0

Jeanie has  letters she must deliver to cities , , and  in the following map of Byteland: jub1.png

One of Jeanie's optimal routes is , for a total distanced traveled of . Thus, we print  on a new line.

 /* ---------------------------- */

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
 * Complete the 'jeanisRoute' function below.
 */
function jeanisRoute(k, delivery, roads) {
    const n = roads.length + 1; // Number of cities
    const graph = Array.from({ length: n + 1 }, () => []);
    
    // Build the graph from roads
    for (const [u, v, w] of roads) {
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }

    // Function to run Dijkstra's algorithm
    function dijkstra(start) {
        const distances = Array(n + 1).fill(Infinity);
        distances[start] = 0;
        const pq = [[0, start]]; // [distance, node]

        while (pq.length > 0) {
            const [currentDistance, currentNode] = pq.shift();

            if (currentDistance > distances[currentNode]) {
                continue;
            }

            for (const [neighbor, weight] of graph[currentNode]) {
                const distance = currentDistance + weight;

                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    pq.push([distance, neighbor]);
                }
            }
        }

        return distances;
    }

    let minTotalDistance = Infinity;

    // Calculate minimum distance for each city
    for (let city = 1; city <= n; city++) {
        const distances = dijkstra(city);
        let totalDistance = 0;

        // Sum distances to all delivery cities
        for (const deliveryCity of delivery) {
            totalDistance += distances[deliveryCity];
        }

        // Update minimum total distance
        minTotalDistance = Math.min(minTotalDistance, totalDistance);
    }

    return minTotalDistance;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);
    const k = parseInt(nk[1], 10);

    const delivery = readLine().split(' ').map(cityTemp => parseInt(cityTemp, 10));

    let roads = [];
    for (let roadsRowItr = 0; roadsRowItr < n - 1; roadsRowItr++) {
        roads[roadsRowItr] = readLine().split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    let result = jeanisRoute(k, delivery, roads);

    ws.write(result + "\n");

    ws.end();
}
