You are given an array with  -bit integers: .

BIT(x, i) = (x >> i) & 1, where  is the  lower bit of  in binary form. If we regard every bit as a vertex of a graph G, there is an undirected edge between vertices  and  if there is a value  such that BIT(d[k], i) == 1 && BIT(d[k], j) == 1.

For every subset of the input array, how many connected-components are there in that graph?

A connected component in a graph is a set of nodes which are accessible to each other via a path of edges. There may be multiple connected components in a graph.

Example

In the real challenge, there will be  nodes associated with each integer in  represented as a  bit binary value. For clarity, only  bits will be shown in the example but all  will be considered in the calculations.

    Decimal  Binary Edges   Node ends
    d[0] = 1   0001   0
    d[1] = 2   0010   0
    d[2] = 3   0011   1       0 and 1
    d[3] = 5   0101   1       0 and 2
Consider all subsets:

                 Edges
    Subset   Count  Nodes  Connected components
    {1}         0           64
    {2}         0           64
    {3}         1   0-1     63
    {5}         1   0-2     63
    {1,2}       0           64
    {1,3}       1   0-1     63
    {1,5}       1   0-2     63
    {2,3}       1   0-1     63
    {2,5}       1   0-2     63
    {3,5}       2   0-1-2   62
    {1,2,3}     1   0-1     63
    {1,2,5}     1   0-2     63
    {1,3,5}     2   0-1-2   62
    {2,3,5}     2   0-1-2   62
    {1,2,3,5}   2   0-1-2   62
    Sum                    944
The values  and  have  bits set, so they have  edge each. If a subset contains only a  or , there will be one connected component with  nodes, and  components with  node for a total of .

If both  and  are in a subset,  component with nodes  and  is formed since node  is one end of each edge described. The other  nodes are solitary, so there are  connected components total.

All other values have only  bit set, so they have no edges. They have  components with  node each.

Function Description

Complete the findConnectedComponents function in the editor below.

findConnectedComponents has the following parameters:

int d[n]: an array of integers
Returns

int: the sum of the number of connected components for all subsets of 
Input Format

The first row contains the integer , the size of .
The next row has  space-separated integers, .

Constraints



Sample Input 1

CopyDownload
Array: d
2
5
9

 
3
2 5 9
Sample Output 1

504

Explanation 1

There are  subset of .

{}
=> We don't have any number in this subset => no edge in the graph => Every node is a component by itself => Number of connected-components = 64.

{2}
=> The Binary Representation of 2 is . There is a bit at only one position. => So there is no edge in the graph, every node is a connected-component by itself => Number of connected-components = 64.

{5}
=> The Binary Representation of 5 is . There is a bit at the 0th and 2nd position. => So there is an edge: (0, 2) in the graph => There is one component with a pair of nodes (0,2) in the graph. Apart from that, all remaining 62 vertices are indepenent components of one node each (1,3,4,5,6...63) => Number of connected-components = 63.

{9}
=> The Binary Representation of 9 is . => There is a 1-bit at the 0th and 3rd position in this binary representation. => edge: (0, 3) in the graph => Number of components = 63

{2, 5}
=> This will contain the edge (0, 2) in the graph which will form one component
=> Other nodes are all independent components
=> Number of connected-component = 63

{2, 9}
=> This has edge (0,3) in the graph
=> Similar to examples above, this has 63 connected components

{5, 9}
=> This has edges (0, 2) and (0, 3) in the graph
=> Similar to examples above, this has 62 connected components

{2, 5, 9}
=> This has edges(0, 2) (0, 3) in the graph. All three vertices (0,2,3) make one component => Other 61 vertices are all independent components
=> Number of connected-components = 62


/*-----------------------------*/

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
 * Complete the 'findConnectedComponents' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts LONG_INTEGER_ARRAY d as parameter.
 */

function findConnectedComponents(d) {
    const n = d.length;
    const bitCount = new Array(64).fill(0);
    
    // Count the number of integers that have each bit set
    for (const number of d) {
        for (let bit = 0; bit < 64; bit++) {
            if ((number & (1n << BigInt(bit))) !== 0n) {
                bitCount[bit]++;
            }
        }
    }

    let totalComponents = 0;

    // Calculate contributions from each bit
    for (let bit = 0; bit < 64; bit++) {
        const count = bitCount[bit];
        if (count > 0) {
            // Each bit contributes (2^count - 1) components from the subsets that include this bit
            const subsetsWithThisBit = (1n << BigInt(count)) - 1n; // 2^count - 1
            totalComponents += Number(subsetsWithThisBit * BigInt(64 - count)); // 64 - count gives the independent components
        }
    }

    // Adding the empty subset case, which has 64 components
    totalComponents += 64;

    return totalComponents;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const dCount = parseInt(readLine().trim(), 10);
    const d = readLine().replace(/\s+$/g, '').split(' ').map(dTemp => BigInt(dTemp));

    const components = findConnectedComponents(d);

    ws.write(components + '\n');
    ws.end();
}