The member states of the UN are planning to send  people to the moon. They want them to be from different countries. You will be given a list of pairs of astronaut ID's. Each pair is made of astronauts from the same country. Determine how many pairs of astronauts from different countries they can choose from.

Example



There are  astronauts numbered  through . Astronauts grouped by country are  and . There are  pairs to choose from:  and .

Function Description

Complete the journeyToMoon function in the editor below.

journeyToMoon has the following parameter(s):

int n: the number of astronauts
int astronaut[p][2]: each element  is a  element array that represents the ID's of two astronauts from the same country
Returns
- int: the number of valid pairs

Input Format

The first line contains two integers  and , the number of astronauts and the number of pairs.
Each of the next  lines contains  space-separated integers denoting astronaut ID's of two who share the same nationality.

Constraints

Sample Input 0

5 3
0 1
2 3
0 4
Sample Output 0

6
Explanation 0

Persons numbered  belong to one country, and those numbered  belong to another. The UN has  ways of choosing a pair:


Sample Input 1

4 1
0 2
Sample Output 1

5
Explanation 1

Persons numbered  belong to the same country, but persons  and  don't share countries with anyone else. The UN has  ways of choosing a pair:




 /*- --------------------------------- */


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

function find(parent, i) {
    if (parent[i] !== i) {
        parent[i] = find(parent, parent[i]); // Path compression
    }
    return parent[i];
}

function union(parent, rank, x, y) {
    const xroot = find(parent, x);
    const yroot = find(parent, y);
    if (xroot !== yroot) {
        if (rank[xroot] < rank[yroot]) {
            parent[xroot] = yroot;
        } else if (rank[xroot] > rank[yroot]) {
            parent[yroot] = xroot;
        } else {
            parent[yroot] = xroot;
            rank[xroot]++;
        }
    }
}

function journeyToMoon(n, astronaut) {
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = Array(n).fill(0);

    // Union the astronauts based on the pairs
    for (const [a, b] of astronaut) {
        union(parent, rank, a, b);
    }

    // Count the size of each country
    const countrySize = new Map();
    for (let i = 0; i < n; i++) {
        const root = find(parent, i);
        countrySize.set(root, (countrySize.get(root) || 0) + 1);
    }

    // Calculate valid pairs
    let totalPairs = 0;
    let sum = 0;

    for (const size of countrySize.values()) {
        totalPairs += sum * size; // Pairs with astronauts from different countries
        sum += size; // Update the total astronauts counted so far
    }

    return totalPairs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const p = parseInt(firstMultipleInput[1], 10);

    let astronaut = Array(p);
    for (let i = 0; i < p; i++) {
        astronaut[i] = readLine().replace(/\s+$/g, '').split(' ').map(astronautTemp => parseInt(astronautTemp, 10));
    }

    const result = journeyToMoon(n, astronaut);
    ws.write(result + '\n');
    ws.end();
}
