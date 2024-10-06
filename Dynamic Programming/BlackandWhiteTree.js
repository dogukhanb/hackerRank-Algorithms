Nikita is making a graph as a birthday gift for her boyfriend, a fellow programmer! She drew an undirected connected graph with  nodes numbered from  to  in her notebook.

Each node is shaded in either white or black. We define  to be the number of white nodes, and  to be the number of black nodes. The graph is drawn in such a way that:

No  adjacent nodes have same coloring.
The value of , which we'll call , is minimal.
Nikita's mischievous little brother erased some of the edges and all of the coloring from her graph! As a result, the graph is now decomposed into one or more components. Because you're her best friend, you've decided to help her reconstruct the graph by adding  edges such that the aforementioned graph properties hold true.

Given the decomposed graph, construct and shade a valid connected graph such that the difference  between its shaded nodes is minimal.

Input Format

The first line contains  space-separated integers,  (the number of nodes in the original graph) and  (the number of edges in the decomposed graph), respectively.
The  subsequent lines each contain  space-separated integers,  and , describing a bidirectional edge between nodes  and  in the decomposed graph.

Constraints

It is guaranteed that every edge will be between  distinct nodes, and there will never be more than  edge between any  nodes.
Your answer must meet the following criteria:
The graph is connected and no  adjacent nodes have the same coloring.
The value of  is minimal.
Output Format

You must have  lines of output. The first line contains  space-separated integers:  (the minimum possible value of ) and  (the number of edges you've added to the graph), respectively.
Each of the  subsequent lines contains  space-separated integers,  and , describing a newly-added bidirectional edge in your final graph (i.e.: new edge ).

You may print any  of the possible reconstructions of Nikita's graph such that the value of  in the reconstructed shaded graph is minimal.

Sample Input 0

 8 8
 1 2
 2 3
 3 4
 4 1
 1 5
 2 6
 3 7
 4 8
Sample output 0

0 0
Sample Input 1

 8 6
 1 2
 3 4
 3 5
 3 6
 3 7
 3 8
Sample Output 1

4 1
1 5
Sample Input 2

 5 4
 1 2
 2 3
 3 4
 4 1
Sample Output 2

  1 2
  2 5
  4 5
Explanation

In the figure below, the solid lines show the decomposed graph after Nikita's brother erased the edges, and the dotted lines show one possible correct answer:

bw.jpg

In Sample , no additional edges are added and . Because  and , we get . Thus, we print  on a new line (there is only  line of output, as ).

In Sample , the only edge added is , so . Here,  and , so . Thus, we print  on the first line. Next, we must print  lines describing each edge added; because , we print a single line describing the  space-separated nodes connected by our new edge: .

In Sample , we can either add  edge  or , or both of them. In both cases we get  and , so . Thus  and  or  both are correct.


 /* ------------------------------------------- */

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
 * Complete the 'blackWhiteTree' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts the number of nodes and the edges of the graph as parameters.
 */

function blackWhiteTree(gNodes, gFrom, gTo) {
    const graph = Array.from({ length: gNodes + 1 }, () => []);
    for (let i = 0; i < gFrom.length; i++) {
        graph[gFrom[i]].push(gTo[i]);
        graph[gTo[i]].push(gFrom[i]);
    }

    const color = Array(gNodes + 1).fill(-1); // -1 means uncolored
    const components = [];
   
    // Function to perform BFS and color the graph
    function bfs(start) {
        const queue = [start];
        color[start] = 0; // Start coloring with 0 (white)
        let count = [1, 0]; // Count[0] = white, Count[1] = black
       
        while (queue.length > 0) {
            const node = queue.shift();
            const currentColor = color[node];
            for (const neighbor of graph[node]) {
                if (color[neighbor] === -1) {
                    // Not colored yet
                    color[neighbor] = 1 - currentColor; // Alternate color
                    count[color[neighbor]]++;
                    queue.push(neighbor);
                }
            }
        }
       
        return count; // Return count of white and black nodes in this component
    }
   
    // Find all components and their color counts
    for (let i = 1; i <= gNodes; i++) {
        if (color[i] === -1) {
            const count = bfs(i);
            components.push(count);
        }
    }

    let totalWhite = 0;
    let totalBlack = 0;
    let edgesToAdd = [];
   
    // Calculate total white and black counts
    for (const [whiteCount, blackCount] of components) {
        totalWhite += whiteCount;
        totalBlack += blackCount;
    }

    // Calculate the minimum difference
    const minDiff = Math.abs(totalWhite - totalBlack);
   
    // Add edges to connect components
    for (let i = 1; i < components.length; i++) {
        const [prevWhiteCount, prevBlackCount] = components[i - 1];
        const [currWhiteCount, currBlackCount] = components[i];
        edgesToAdd.push([1, 1 + i]); // Add an edge between component i and i-1
    }

    return [minDiff, edgesToAdd.length, ...edgesToAdd.flat()];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
   
    const gNodesEdges = readLine().split(' ');
    const gNodes = parseInt(gNodesEdges[0], 10);
    const gEdges = parseInt(gNodesEdges[1], 10);

    let gFrom = [];
    let gTo = [];

    for (let i = 0; i < gEdges; i++) {
        const gFromTo = readLine().split(' ');
        gFrom.push(parseInt(gFromTo[0], 10));
        gTo.push(parseInt(gFromTo[1], 10));
    }

    const result = blackWhiteTree(gNodes, gFrom, gTo);
    ws.write(result.join(' ') + '\n');
    ws.end();
}