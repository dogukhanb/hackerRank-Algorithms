Jack has just moved to a new city called Rapture. He wants to use the public public transport system. The fare rules are as follows:

Each pair of connected stations has a fare assigned to it regardless of direction of travel.
If Jack travels from station A to station B, he only has to pay the difference between (the fare from A to B) and (the cumulative fare paid to reach station A), [fare(A,B) - total fare to reach station A]. If the difference is negative, travel is free of cost from A to B.
Jack is low on cash and needs your help to figure out the most cost efficient way to go from the first station to the last station. Given the number of stations  (numbered from  to ), and the fares (weights) between the  pairs of stations that are connected, determine the lowest fare from station  to station .

Example




The graph looks like this:

image
Travel from station  costs  for the first segment () then the cost differential, an additional  for the remainder. The total cost is .

Travel from station  costs  for the first segment, then an additional  for the remainder, a total cost of .

The lower priced option costs .

Function Description
Complete the getCost function in the editor below.

getCost has the following parameters:

int g_nodes: the number of stations in the network
int g_from[g_edges]: end stations of a bidirectional connection
int g_to[g_edges]:  is connected to  at cost 
int g_weight[g_edges]: the cost of travel between associated stations
Prints
- int or string: the cost of the lowest priced route from station  to station  or NO PATH EXISTS. No return value is expected.

Input Format

The first line contains two space-separated integers,  and , the number of stations and the number of connections between them.
Each of the next  lines contains three space-separated integers,  and , the connected stations and the fare between them.

Constraints

Sample Input 1

CopyDownload
Undirected Weighed Graph: g
1
2
60
4
120
3
80
5
70
150

 
5 5
1 2 60
3 5 70
1 4 120
4 5 150
2 3 80
Sample Output 1

80
Explanation 1

There are two ways to go from first station to last station.

For the first path, Jack first pays  units of fare to go from station  to . Next, Jack has to pay  units to go from  to . Now, to go from  to , Jack has to pay  units, but since this is a negative value, Jack pays  units to go from  to . Thus the total cost of this path is  units.

For the second path, Jack pays  units to reach station  from station . To go from station  to , Jack has to pay  units. Thus the total cost becomes  units. So, the first path is the most cost efficient, with a cost of .


Sample Input 2

CopyDownload
Undirected Weighed Graph: g
1
2
30
3
70
50
4
70
5
85
90

 
5 6
1 2 30
2 3 50
3 4 70
4 5 90
1 3 70
3 5 85
Sample Output 2

85
Explanation 2

Travel starts at node  and there are two paths to node  that cost either  or . Taking the route from  through  to  brings the cost up to , while going directly from  to  costs only .


 /* ------------------- */

 'use strict';

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
 * Complete the 'getCost' function below.
 *
 * The function accepts WEIGHTED_INTEGER_GRAPH g as parameter.
 */

function getCost(gNodes, gFrom, gTo, gWeight) {
    const graph = Array.from({ length: gNodes + 1 }, () => []);
    
    // Build the graph
    for (let i = 0; i < gFrom.length; i++) {
        const u = gFrom[i];
        const v = gTo[i];
        const w = gWeight[i];
        graph[u].push({ node: v, weight: w });
        graph[v].push({ node: u, weight: w });
    }

    const cost = Array(gNodes + 1).fill(Infinity);
    cost[1] = 0; // Starting from station 1
    const minHeap = [{ node: 1, totalCost: 0 }];

    while (minHeap.length > 0) {
        // Get the station with the lowest total cost
        minHeap.sort((a, b) => a.totalCost - b.totalCost);
        const { node: current, totalCost: cumFareToCurrent } = minHeap.shift();

        if (current === gNodes) {
            console.log(cumFareToCurrent); // Found the cheapest way to station N
            return;
        }

        for (const { node: neighbor, weight } of graph[current]) {
            // Calculate the fare to go to the neighbor
            const fareToNeighbor = weight - cumFareToCurrent;
            const costToNeighbor = cumFareToCurrent + Math.max(fareToNeighbor, 0);

            // If the new cost to reach neighbor is cheaper, update and add to the minHeap
            if (costToNeighbor < cost[neighbor]) {
                cost[neighbor] = costToNeighbor;
                minHeap.push({ node: neighbor, totalCost: costToNeighbor });
            }
        }
    }

    console.log("NO PATH EXISTS");
}

function main() {
    const gNodesEdges = readLine().split(' ');

    const gNodes = parseInt(gNodesEdges[0], 10);
    const gEdges = parseInt(gNodesEdges[1], 10);

    let gFrom = [];
    let gTo = [];
    let gWeight = [];

    for (let i = 0; i < gEdges; i++) {
        const gFromToWeight = readLine().split(' ');

        gFrom.push(parseInt(gFromToWeight[0], 10));
        gTo.push(parseInt(gFromToWeight[1], 10));
        gWeight.push(parseInt(gFromToWeight[2], 10));
    }

    getCost(gNodes, gFrom, gTo, gWeight);
}
