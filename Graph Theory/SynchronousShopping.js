Bitville is a seaside city that has a number of shopping centers connected by bidirectional roads, each of which has a travel time associated with it. Each of the shopping centers may have a fishmonger who sells one or more kinds of fish. Two cats, Big Cat and Little Cat, are at shopping center  (each of the centers is numbered consecutively from  to ). They have a list of fish they want to purchase, and to save time, they will divide the list between them. Determine the total travel time for the cats to purchase all of the types of fish, finally meeting at shopping center . Their paths may intersect, they may backtrack through shopping center , and one may arrive at a different time than the other. The minimum time to determine is when both have arrived at the destination.

For example, there are  shopping centers selling  types of fish. The following is a graph that shows a possible layout of the shopping centers connected by  paths. Each of the centers is labeled . Here  and  represent Big Cat and Little Cat, respectively. In this example, both cats take the same path, i.e.  and arrive at time  having purchased all three types of fish they want. Neither cat visits shopping centers  or .

image

Function Description

Complete the shop function in the editor below. It should return an integer that represents the minimum time required for their shopping.

shop has the following parameters:
- n: an integer, the number of shopping centers
- k: an integer, the number of types of fish
- centers: an array of strings of space-separated integers where the first integer of each element is the number of types of fish sold at a center and the remainder are the types sold
- roads: a 2-dimensional array of integers where the first two values are the shopping centers connected by the bi-directional road, and the third is the travel time for that road

Input Format

The first line contains  space-separated integers:  (the number of shopping centers),  (the number of roads), and  (the number of types of fish sold in Bitville), respectively.

Each line  of the  subsequent lines () describes a shopping center as a line of space-separated integers. Each line takes the following form:

The first integer, , denotes the number of types of fish that are sold by the fishmonger at the  shopping center.
Each of the  subsequent integers on the line describes a type of fish sold by that fishmonger, denoted by , where  going forward.
Each line  of the  subsequent lines () contains  space-separated integers that describe a road. The first two integers,  and , describe the two shopping centers it connects. The third integer, , denotes the amount of time it takes to travel the road.

Constraints

All  are different for every fixed .
Each road connectes  distinct shopping centers (i.e., no road connects a shopping center to itself).
Each pair of shopping centers is directly connected by no more than  road.
It is possible to get to any shopping center from any other shopping center.
Each type of fish is always sold by at least one fishmonger.
Output Format

Print the minimum amount of time it will take for the cats to collectively purchase all  fish and meet up at shopping center .

Sample Input

5 5 5
1 1
1 2
1 3
1 4
1 5
1 2 10
1 3 10
2 4 10
3 5 10
4 5 10
Sample Output

30
Explanation

image
 represents a location Big Cat visits,  represents a location where Little Cat visits.

Big Cat can travel  and buy fish at all of the shopping centers on his way.

Little Cat can then travel , and buy fish from the fishmonger at the  shopping center only.


/* ----------------------------------- */


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

function dijkstra(graph, start) {
    const dist = Array(graph.length).fill(Infinity);
    const visited = Array(graph.length).fill(false);
    dist[start] = 0;

    const pq = new MinPriorityQueue();
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { element } = pq.dequeue();
        if (visited[element]) continue;
        visited[element] = true;

        for (const [neighbor, weight] of graph[element]) {
            if (!visited[neighbor] && dist[element] + weight < dist[neighbor]) {
                dist[neighbor] = dist[element] + weight;
                pq.enqueue(neighbor, dist[neighbor]);
            }
        }
    }

    return dist;
}

function shop(n, k, centers, roads) {
    // Construct graph
    const graph = Array.from({ length: n }, () => []);
    const fishTypes = Array.from({ length: n }, () => new Set());

    // Fill fish types
    centers.forEach((center, index) => {
        const types = center.split(' ').map(Number).slice(1); // Ignore the first number
        types.forEach(type => fishTypes[index].add(type));
    });

    // Build the graph
    roads.forEach(road => {
        const [u, v, time] = road;
        graph[u - 1].push([v - 1, time]); // Convert to 0-indexed
        graph[v - 1].push([u - 1, time]);
    });

    // Get the shortest distances from each cat's starting point
    const bigCatStart = 0; // 0-indexed
    const littleCatStart = 1; // 0-indexed
    const bigCatDistances = dijkstra(graph, bigCatStart);
    const littleCatDistances = dijkstra(graph, littleCatStart);

    // Collect the fish types
    const fishTypeOwners = Array(k + 1).fill(0); // index 0 unused
    for (let i = 0; i < n; i++) {
        fishTypes[i].forEach(type => fishTypeOwners[type] |= (1 << i));
    }

    // To collect all fish types
    const allFishMask = (1 << k) - 1; // Mask representing all fish collected

    let minTime = Infinity;

    // Find combinations of fish distribution for both cats
    for (let i = 0; i < (1 << n); i++) {
        let bigCatFish = 0; // Fish types collected by Big Cat
        let littleCatFish = 0; // Fish types collected by Little Cat
        let bigCatTravelTime = 0; // Total time for Big Cat
        let littleCatTravelTime = 0; // Total time for Little Cat

        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) { // If center j is visited by Big Cat
                bigCatFish |= [...fishTypes[j]].reduce((mask, type) => mask | (1 << (type - 1)), 0);
                bigCatTravelTime += bigCatDistances[j];
            } else { // If center j is visited by Little Cat
                littleCatFish |= [...fishTypes[j]].reduce((mask, type) => mask | (1 << (type - 1)), 0);
                littleCatTravelTime += littleCatDistances[j];
            }
        }

        // Check if both have collected all fish
        if ((bigCatFish | littleCatFish) === ((1 << k) - 1)) {
            const meetingTime = Math.max(bigCatTravelTime, littleCatTravelTime);
            minTime = Math.min(minTime, meetingTime);
        }
    }

    return minTime;
}

class MinPriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority); // Sort based on priority
    }

    dequeue() {
        return this.elements.shift(); // Remove the first (highest priority)
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);
    const k = parseInt(firstMultipleInput[2], 10);

    let centers = [];
    for (let i = 0; i < n; i++) {
        const centersItem = readLine();
        centers.push(centersItem);
    }

    let roads = Array(m);
    for (let i = 0; i < m; i++) {
        roads[i] = readLine().replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    const res = shop(n, k, centers, roads);
    ws.write(res + '\n');
    ws.end();
}
