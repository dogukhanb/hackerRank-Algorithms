Daniel loves graphs. He thinks a graph is special if it has the following properties:

It is undirected.
The length of each edge is .
It includes exactly  different lovely triplets.
A triplet is a set of  different nodes. A triplet is lovely if the minimum distance between each pair of nodes in the triplet is exactly . Two triplets are different if  or more of their component nodes are different.

Given  and , help Daniel draw a special graph.

Input Format

A single line containing  space-separated integers,  (the number of different lovely triplets you must have in your graph) and  (the required distance between each pair of nodes in a lovely triplet), respectively.

Constraints

Output Format

For the first line, print  space-separated integers,  (the number of nodes in the graph) and  (the number of edges in the graph), respectively.
On each line  of the  subsequent lines, print two space-separated integers,  and , describing an edge between nodes  and .

Your output must satisfy the following conditions:



If there is more than one correct answer, print any one of them.

Sample Input

3 2
Sample Output

7 7
1 2
2 3
3 4
4 5
5 6
6 1
1 7
Explanation

There are exactly  lovely triplets in this graph: , , and . tripletex.png Observe that each node in a lovely triplet is  edges away from the other nodes composing the lovely triplet.

 /* -------------- */

 'use strict';

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

function main() {
    const PQ = readLine();
   
    // Check if the input is defined and not empty
    if (!PQ) {
        console.log('-1');
        return;
    }

    const [P, Q] = PQ.trim().split(' ').map(Number);

    // Handle the case where Q is not 2 (only implemented for Q = 2)
    if (Q !== 2) {
        console.log('-1');
        return;
    }

    const n = 3 * P; // Total number of nodes
    const edges = []; // To store edges

    // Create a cycle for the first 3P nodes
    for (let i = 1; i <= n; i++) {
        const next = (i % n) + 1; // Wrap around to create a cycle
        edges.push([i, next]);
    }

    // Adding additional edges to ensure lovely triplets can be formed
    for (let i = 1; i <= P; i++) {
        edges.push([i, n - i + 1]); // Connect each triplet node to ensure distance
    }

    // Print the number of nodes and edges
    console.log(n + ' ' + edges.length);
   
    // Print all the edges
    for (const edge of edges) {
        console.log(edge[0] + ' ' + edge[1]);
    }
}

// Call the main function to start the program
main();