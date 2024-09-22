Priyanka works for an international toy company that ships by container. Her task is to the determine the lowest cost way to combine her orders for shipping. She has a list of item weights. The shipping company has a requirement that all items loaded in a container must weigh less than or equal to 4 units plus the weight of the minimum weight item. All items meeting that requirement will be shipped in one container.

What is the smallest number of containers that can be contracted to ship the items based on the given list of weights?

For example, there are items with weights . This can be broken into two containers:  and . Each container will contain items weighing within  units of the minimum weight item.

Function Description

Complete the toys function in the editor below. It should return the minimum number of containers required to ship.

toys has the following parameter(s):

w: an array of integers that represent the weights of each order to ship
Input Format

The first line contains an integer , the number of orders to ship.
The next line contains  space-separated integers, , representing the orders in a weight array.

Constraints



Output Format

Return the integer value of the number of containers Priyanka must contract to ship all of the toys.

Sample Input

8
1 2 3 21 7 12 14 21
Sample Output

4
Explanation

The first container holds items weighing ,  and . (weights in range )
The second container holds the items weighing  units. ()
The third container holds the item weighing  units. ()
The fourth container holds the items weighing  and  units. ()

 containers are required.

 /* ------------------------------------------ */

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
 * Complete the 'toys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY w as parameter.
 */
function toys(w) {
    // Sort the weights array
    w.sort((a, b) => a - b);
    
    let containers = 0; // Counter for containers
    let i = 0; // Index to iterate through weights

    while (i < w.length) {
        containers++; // We need a new container
        
        // Find the minimum weight in the current group
        const minWeight = w[i];
        const maxWeight = minWeight + 4;
        
        // Increment i to include all items that can fit in this container
        while (i < w.length && w[i] <= maxWeight) {
            i++;
        }
    }
    
    return containers;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const w = readLine().replace(/\s+$/g, '').split(' ').map(wTemp => parseInt(wTemp, 10));

    const result = toys(w);

    ws.write(result + '\n');
    ws.end();
}
