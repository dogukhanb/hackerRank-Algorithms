Allison loves graph theory and just started learning about Minimum Spanning Trees(MST). She has three integers, , , and , and uses them to construct a graph with the following properties:

The graph has  nodes and  undirected edges where each edge has a positive integer length.
No edge may directly connect a node to itself, and each pair of nodes can only be directly connected by at most one edge.
The graph is connected, meaning each node is reachable from any other node.
The value of the minimum spanning tree is . Value of the MST is the sum of all the lengths of all edges of which are part of the tree.
The sum of the lengths of all edges is as small as possible.
For example, let's say ,  and . We need to construct a graph with  nodes and  edges. The value of minimum spanning tree must be . The diagram belows shows a way to construct such a graph while keeping the lengths of all edges is as small as possible:

image

Here the sum of lengths of all edges is .

Given , , and  for  graphs satisfying the conditions above, find and print the minimum sum of the lengths of all the edges in each graph on a new line.

Note: It is guaranteed that, for all given combinations of , , and , we can construct a valid graph.

Input Format

The first line contains an integer, , denoting the number of graphs.
Each of the  subsequent lines contains three space-separated integers describing the respective values of  (the number of nodes in the graph),  (the number of edges in the graph), and  (the value of the MST graph).

Constraints

For  of the maximum score:

    
    
    
    
For  of the maximum score:

    
    
    
    
For  of the maximum score:

    
    
    
    
For  of the maximum score:

    
    
    
    
Output Format

For each graph, print an integer on a new line denoting the minimum sum of the lengths of all edges in a graph satisfying the given conditions.

Sample Input

2
4 5 4
4 3 6
Sample Output

7
6
Explanation

Graph :
The answer for this sample is already explained the problem statement.

Graph :
We must construct a graph with  nodes,  edges, and an MST value of . Recall that a connected graph with  nodes and  edges is already a tree, so the MST will contain all  edges and the total length of all the edges of the graph will be equal to the value of the minimum spanning tree. So the answer is .

/*---------------------------- */

'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function main() {
    const g = parseInt(readLine(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const nms = readLine().split(' ');

        const n = parseInt(nms[0], 10);
        const m = parseInt(nms[1], 10);
        const s = parseInt(nms[2], 10);

        // Calculate minimum sum of the lengths of all edges
        let totalLength;
        if (m === n - 1) {
            // If the number of edges is exactly n - 1, the total length equals the MST value
            totalLength = s;
        } else {
            // Add the number of extra edges we can afford
            totalLength = s + (m - (n - 1));
        }

        console.log(totalLength);
    }
}