Hackerland is a one-dimensional city with houses aligned at integral locations along a road. The Mayor wants to install radio transmitters on the roofs of the city's houses. Each transmitter has a fixed range meaning it can transmit a signal to all houses within that number of units distance away.

Given a map of Hackerland and the transmission range, determine the minimum number of transmitters so that every house is within range of at least one transmitter. Each transmitter must be installed on top of an existing house.

Example



 antennae at houses  and  and  provide complete coverage. There is no house at location  to cover both  and . Ranges of coverage, are , , and .

Function Description

Complete the hackerlandRadioTransmitters function in the editor below.

hackerlandRadioTransmitters has the following parameter(s):

int x[n]: the locations of houses
int k: the effective range of a transmitter
Returns

int: the minimum number of transmitters to install
Input Format

The first line contains two space-separated integers  and , the number of houses in Hackerland and the range of each transmitter.
The second line contains  space-separated integers describing the respective locations of each house .

Constraints

There may be more than one house at the same location.
Subtasks

 for  of the maximum score.
Output Format

Print a single integer denoting the minimum number of transmitters needed to cover all of the houses.

Sample Input 0

STDIN       Function
-----       --------
5 1         x[] size n = 5, k = 1
1 2 3 4 5   x = [1, 2, 3, 4, 5]  
Sample Output 0

2
Explanation 0

The diagram below depicts our map of Hackerland:

k-nearest(2).png

We can cover the entire city by installing  transmitters on houses at locations  and .

Sample Input 1

8 2
7 2 4 6 5 9 12 11 
Sample Output 1

3
Explanation 1

The diagram below depicts our map of Hackerland:

k-nearest2(2).png

We can cover the entire city by installing  transmitters on houses at locations , , and .

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
 * Complete the 'hackerlandRadioTransmitters' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY x
 *  2. INTEGER k
 */
function hackerlandRadioTransmitters(x, k) {
    // Sort the locations of houses
    x.sort((a, b) => a - b);
    
    let numTransmitters = 0;
    let i = 0;
    const n = x.length;

    while (i < n) {
        numTransmitters++;
        // Place the transmitter at the furthest house that can cover x[i]
        let loc = x[i] + k;
        while (i < n && x[i] <= loc) {
            i++;
        }
        // Move to the house where the transmitter can still cover
        loc = x[i - 1] + k;
        while (i < n && x[i] <= loc) {
            i++;
        }
    }
    
    return numTransmitters;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const x = readLine().replace(/\s+$/g, '').split(' ').map(xTemp => parseInt(xTemp, 10));

    const result = hackerlandRadioTransmitters(x, k);

    ws.write(result + '\n');

    ws.end();
}

