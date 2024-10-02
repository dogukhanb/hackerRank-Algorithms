Goodland is a country with a number of evenly spaced cities along a line. The distance between adjacent cities is  unit. There is an energy infrastructure project planning meeting, and the government needs to know the fewest number of power plants needed to provide electricity to the entire list of cities. Determine that number. If it cannot be done, return -1.

You are given a list of city data. Cities that may contain a power plant have been labeled . Others not suitable for building a plant are labeled . Given a distribution range of , find the lowest number of plants that must be built such that all cities are served. The distribution range limits supply to cities where distance is less than k.

Example


Each city is  unit distance from its neighbors, and we'll use  based indexing. We see there are  cities suitable for power plants, cities  and . If we build a power plant at , it can serve  through  because those endpoints are at a distance of  and . To serve , we would need to be able to build a plant in city  or . Since none of those is suitable, we must return -1. It cannot be done using the current distribution constraint.

Function Description

Complete the pylons function in the editor below.

pylons has the following parameter(s):

int k: the distribution range
int arr[n]: each city's suitability as a building site
Returns

int: the minimum number of plants required or -1
Input Format

The first line contains two space-separated integers  and , the number of cities in Goodland and the plants' range constant.
The second line contains  space-separated binary integers where each integer indicates suitability for building a plant.

Constraints

Each .
Subtask

 for  of the maximum score.
Output Format

Print a single integer denoting the minimum number of plants that must be built so that all of Goodland's cities have electricity. If this is not possible for the given value of , print .

Sample Input

STDIN         Function
-----         --------
6 2           arr[] size n = 6, k = 2
0 1 1 1 1 0   arr = [0, 1, 1, 1, 1, 0]
Sample Output

2
Explanation

Cities , , , and  are suitable for power plants. Each plant will have a range of . If we build in cities  cities,  and , then all cities will have electricity.

 /* -------------------------------- */

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
 * Complete the 'pylons' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function pylons(k, arr) {
    const n = arr.length;
    let count = 0; // Number of power plants
    let i = 0; // Current city index

    while (i < n) {
        let plantLocation = -1;

        // Check the range from the farthest suitable city back to the nearest suitable city
        for (let j = Math.min(i + k, n - 1); j >= Math.max(i - k, 0); j--) {
            if (arr[j] === 1) {
                plantLocation = j; // Found a suitable city
                break;
            }
        }

        // If no suitable location was found, return -1
        if (plantLocation === -1) {
            return -1;
        }

        // Place the power plant at plantLocation
        count++;
        // Move the index to the next city that is not covered by this plant
        i = plantLocation + k; // Move to the city after the plant's coverage
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = pylons(k, arr);

    ws.write(result + '\n');
    ws.end();
}
