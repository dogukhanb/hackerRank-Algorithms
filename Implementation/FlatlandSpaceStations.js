Flatland is a country with a number of cities, some of which have space stations. Cities are numbered consecutively and each has a road of  length connecting it to the next city. It is not a circular route, so the first city doesn't connect with the last city. Determine the maximum distance from any city to its nearest space station.

Example


There are  cities and city  has a space station. They occur consecutively along a route. City  is  unit away and city  is  units away. City  is  units from its nearest space station as one is located there. The maximum distance is .

Function Description

Complete the flatlandSpaceStations function in the editor below.

flatlandSpaceStations has the following parameter(s):

int n: the number of cities
int c[m]: the indices of cities with a space station
Returns
- int: the maximum distance any city is from a space station

Input Format

The first line consists of two space-separated integers,  and .
The second line contains  space-separated integers, the indices of each city that has a space-station. These values are unordered and distinct.

Constraints

There will be at least  city with a space station.
No city has more than one space station.
Output Format

Sample Input 0

STDIN   Function
-----   --------
5 2     n = 5, c[] size m = 2
0 4     c = [0, 4]
Sample Output 0

2
Explanation 0

This sample corresponds to following graphic:

hreasy(5).png

The distance to the nearest space station for each city is listed below:

 has distance , as it contains a space station.
 has distance  to the space station in .
 has distance  to the space stations in  and .
 has distance  to the space station in .
 has distance , as it contains a space station.
We then take .

Sample Input 1

6 6
0 1 2 4 3 5
Sample Output 1

0
Explanation 1

In this sample,  so every city has space station and we print  as our answer.



/* ---------------------------------------------------------- */

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
 * Complete the 'flatlandSpaceStations' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY c
 */
function flatlandSpaceStations(n, c) {
    // Sort the space station indices
    c.sort((a, b) => a - b);

    let maxDistance = 0;

    // Calculate distance before the first space station
    maxDistance = Math.max(maxDistance, c[0]);

    // Calculate distance after the last space station
    maxDistance = Math.max(maxDistance, n - 1 - c[c.length - 1]);

    // Calculate the distance between consecutive space stations
    for (let i = 1; i < c.length; i++) {
        let distanceBetweenStations = Math.floor((c[i] - c[i - 1]) / 2);
        maxDistance = Math.max(maxDistance, distanceBetweenStations);
    }

    return maxDistance;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    const result = flatlandSpaceStations(n, c);

    ws.write(result + "\n");

    ws.end();
}
