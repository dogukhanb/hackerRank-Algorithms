HackerLand is a country with  beautiful cities and  undirected roads. Like every other beautiful country, HackerLand has traffic jams.

Each road has a crowd value. The crowd value of a path is defined as the maximum crowd value for all roads in the path. For example, if the crowd values for all roads are , then the crowd value for the path will be .

Each city  has a type value, , denoting the type of buildings in the city.

David just started his vacation in HackerLand. He wants to travel from city  to city . He also wants to see at least  different types of buildings along the path from  to . When choosing a path from city  to city  that has at least  different types of buildings along the path, David always selects the one with the minimum crowd value.

You will be given  queries. Each query takes the form of  space-separated integers, , , and , denoting the respective values for starting city, destination city, and minimum number of unique buildings that David wants to see along the way. For each query, you must print the minimum crowd value for a path between  and  that has at least  different buildings along the route. If there is no such path, print -1.

Note: A path may contain cycles (i.e., the same roads or cities may be traveled more than once).

Input Format

The first line contains  space-separated integers denoting the respective values for  (the number of cities),  (the number of roads), and  (the number of queries).

The second line contains  space-separated integers describing the respective building type for each city in array  (where the -th value is  and ).

Each of the  subsequent lines defines a road in the form of  space-separated integers, , , and , defining an undirected road with crowd value  that connects cities  and .

Each of the  subsequent lines defines a query in the form of  space-separated integers, , , and  (where ), respectively.

Constraints

Each road connect  distinct cities, meaning no road starts and ends in the same city.
Output Format

For each query, print its answer on a new line.

Sample Input

7 6 1
1 1 4 5 1 3 2
1 2 3
2 6 2
2 3 4
3 4 3
2 4 9
5 7 9
1 2 4
Sample Output

4
Explanation

The diagram below depicts the country given as Sample Input. Different values of  are shown in different colors.

davaro.png

The path for the last query (1 2 4) will be . David sees his first type of building in cities  and , his second type of building in city , his third type of building in city , and his fourth type of building in city . The crowd values for each road traveled on this path are ; the maximum of these values is . Thus, we print  on a new line.





/*--------------------------- */


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
 * Complete the 'travel' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY t
 *  2. 2D_INTEGER_ARRAY roads
 *  3. 2D_INTEGER_ARRAY queries
 */

function travel(t, roads, queries) {
    const n = t.length;
    const graph = Array.from({ length: n }, () => []);
    const crowdValues = new Set();

    // Building the graph
    for (const [u, v, c] of roads) {
        graph[u - 1].push({ city: v - 1, crowd: c });
        graph[v - 1].push({ city: u - 1, crowd: c });
        crowdValues.add(c);
    }

    const sortedCrowdValues = Array.from(crowdValues).sort((a, b) => a - b);
    const results = [];

    for (const [start, end, minTypes] of queries) {
        const startIdx = start - 1;
        const endIdx = end - 1;

        // Binary search on crowd values
        let low = 0, high = sortedCrowdValues.length - 1;
        let answer = -1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const currentCrowdValue = sortedCrowdValues[mid];

            if (canReachWithMinTypes(startIdx, endIdx, currentCrowdValue, minTypes, graph, t)) {
                answer = currentCrowdValue; // Found a valid path, try for lower crowd value
                high = mid - 1;
            } else {
                low = mid + 1; // No valid path, try for higher crowd value
            }
        }

        results.push(answer);
    }

    return results;
}

function canReachWithMinTypes(start, end, maxCrowd, minTypes, graph, buildingTypes) {
    const visited = new Set();
    const queue = [{ city: start, types: new Set([buildingTypes[start]]) }];
   
    while (queue.length > 0) {
        const { city, types } = queue.shift();
       
        if (city === end) {
            return types.size >= minTypes;
        }

        if (visited.has(city)) continue;
        visited.add(city);
       
        // Explore neighbors
        for (const { city: neighbor, crowd } of graph[city]) {
            if (crowd <= maxCrowd) {
                const newTypes = new Set(types);
                newTypes.add(buildingTypes[neighbor]);
                queue.push({ city: neighbor, types: newTypes });
            }
        }
    }

    return false; // If we exit the loop without reaching the end
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);
    const q = parseInt(firstMultipleInput[2], 10);

    const t = readLine().replace(/\s+$/g, '').split(' ').map(tTemp => parseInt(tTemp, 10));

    let roads = Array(m);
    for (let i = 0; i < m; i++) {
        roads[i] = readLine().replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    let queries = Array(q);
    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = travel(t, roads, queries);

    result.forEach(res => ws.write(res + '\n'));

    ws.end();
}