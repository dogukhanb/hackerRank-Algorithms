Fedya is a seasoned traveller and is planning his trip to Treeland. Treeland is a country with an ancient road system which is in the form of a tree structure.  cities of Treeland are numbered by  positive integers: .

Fedya has not yet decided the starting point (city) of his journey and the cities he will visit. But there are a few things you know about Fedya's trip:

Fedya is fond of travelling to great distances. So if he is currently located in city , his destination will be a city which is most distant from city .

There might be more than 1 such cities. In that case, Fedya will choose a city that was already visited as less times as possible in this journey.

There still might be more than 1 such cities. In that case, Fedya will go to the city with the smallest number.

Fedya has prepared a list of  possible journeys. Each one is characterized by two integers - the starting city  and the total number of cities to be visited, . For each of them, he is keen to know the total distance travelled by him.

Input Format

The first line of input will contain two space separated integers  and  - the number of cities and the number of possible journeys.

Then, there will be  lines, each of them will contain two space separated integers  , denoting the bi-directional road between the cities with numbers  and  with the unitary length.

Then there will be  lines, each of them will have two space separated integers  and , denoting a journey.

Constraints




Output Format

For each journey, output the travelled distance on a separate line.

Sample Input

8 7
2 1
3 2
4 2
5 1
6 1
7 1
8 7
4 6
3 4
6 3
7 6
4 6
7 1
2 6
Sample Output

24
16
11
23
24
3
23
Explanation

The tree in question is given in the picture below.

image

4 6 indicates that Fedya starts at 4. Now we see that the most distant city from 4 is 8. Fedya now travels to city 8. From 8, the most distance cities are [4, 3]. As 4 is already visited, he chooses to visit city 3. From city 3, he revisits city 8 and so on. The cities in the order of visit is 4 - > 8 -> 3 -> 8 -> 4 -> 8 -> 3 which sums to 24. Hence, the answer.
6 3 indicates that Fedya starts at city 6. From 6, the most distant cities are [3,4,8]. In this leg of the journey, no city is visited and hence Fedya chooses to visit the city with the smallest number 3. From 3, he visits 8 and then he ends his trip at city 4 which sums to 3 + 4 + 4 = 11. Hence, the answer.


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

function journeyScheduling(n, roads, journeys) {
    const graph = Array.from({ length: n + 1 }, () => []);
   
    // Build the adjacency list for the tree
    for (const [u, v] of roads) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const results = [];

    // Helper function to find the farthest node using DFS
    const findFarthestNode = (start) => {
        const stack = [{ node: start, parent: -1, depth: 0 }];
        let farthestNode = start;
        let maxDepth = 0;

        while (stack.length > 0) {
            const { node, parent, depth } = stack.pop();
            if (depth > maxDepth) {
                maxDepth = depth;
                farthestNode = node;
            }

            for (const neighbor of graph[node]) {
                if (neighbor !== parent) {
                    stack.push({ node: neighbor, parent: node, depth: depth + 1 });
                }
            }
        }
        return [farthestNode, maxDepth];
    };

    for (const [startCity, totalVisits] of journeys) {
        const visitCount = Array(n + 1).fill(0);
        let currentCity = startCity;
        let totalDistance = 0;

        for (let i = 0; i < totalVisits; i++) {
            visitCount[currentCity]++;
            totalDistance += visitCount[currentCity]; // Add distance for visiting this city

            // Find the farthest city from the current city
            const [farthestCity] = findFarthestNode(currentCity);
            let nextCity = farthestCity;
            let minVisit = visitCount[farthestCity];

            // Check all connected cities to find the best next city
            for (const neighbor of graph[currentCity]) {
                if (visitCount[neighbor] < minVisit ||
                    (visitCount[neighbor] === minVisit && neighbor < nextCity)) {
                    nextCity = neighbor;
                    minVisit = visitCount[neighbor];
                }
            }

            // Move to the next city
            currentCity = nextCity;
        }

        results.push(totalDistance);
    }

    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);

    let roads = Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
        roads[i] = readLine().replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    let journeys = Array(m);
    for (let i = 0; i < m; i++) {
        journeys[i] = readLine().replace(/\s+$/g, '').split(' ').map(journeysTemp => parseInt(journeysTemp, 10));
    }

    const result = journeyScheduling(n, roads, journeys);

    ws.write(result.join('\n') + '\n');
    ws.end();
}