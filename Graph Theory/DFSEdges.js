Let  be a connected, directed graph with vertices numbered from  to  such that any vertex is reachable from vertex . In addition, any two distinct vertices,  and , are connected by at most one edge .

Consider the standard DFS (Depth-First Search) algorithm starting from vertex . As every vertex is reachable, each edge  of  is classified by the algorithm into one of four groups:

tree edge: If  was discovered for the first time when we traversed .
back edge: If  was already on the stack when we tried to traverse .
forward edge: If  was already discovered while  was on the stack.
cross edge: Any edge that is not a tree, back, or forward edge.
To better understand this, consider the following C++ pseudocode:

// initially false
bool discovered[n]; 

// initially false
bool finished[n];   

vector<int> g[n];

void dfs(int u) {
    // u is on the stack now
    discovered[u] = true;
    for (int v: g[u]) {
        if (finished[v]) {
            // forward edge if u was on the stack when v was discovered
            // cross edge otherwise
            continue;
        }
        if (discovered[v]) {
            // back edge
            continue;
        }
        // tree edge
        dfs(v);
    }
    finished[u] = true;
    // u is no longer on the stack
}
Given four integers, , , , and , construct any graph  having exactly  tree edges, exactly  back edges, exactly  forward edges, and exactly  cross edges. Then print  according to the Output Format specified below.

Input Format

A single line of four space-separated integers describing the respective values of , , , and .

Constraints

Output Format

If there is no such graph , print -1; otherwise print the following:

The first line must contain an integer, , denoting the number of vertices in .
Each line  of the  subsequent lines must contain the following space-separated integers:
The first integer is the outdegree, , of vertex .
This is followed by  distinct numbers, , denoting edges from  to  for . The order of each  should be the order in which a DFS considers edges.
Sample Input 0

3 1 1 1
Sample Output 0

4
3 2 4 3
1 3
1 1
1 2
Explanation 0

The DFS traversal order is: . Thus, ,  and  are tree edges;  is a back edge;  is a forward edge; and  is a cross edge. This is demonstrated by the diagram below, in which tree edges are black, forward edges are blue, back edges are red, and cross edges are green.

Illustration to the first sample

Sample Input 1

1 10 20 30
Sample Output 1

-1
Explanation 1

No such graph exists satisfying the given values.

 /* ---------------------- */

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
    const tbfc = readLine().split(' ');

    const t = parseInt(tbfc[0], 10); // tree edges
    const b = parseInt(tbfc[1], 10); // back edges
    const f = parseInt(tbfc[2], 10); // forward edges
    const c = parseInt(tbfc[3], 10); // cross edges

    // Calculate necessary vertices
    const n = Math.max(1, t + b + f + c); // At least 1 vertex is needed

    // Check if the configuration is valid
    if (t + b + f + c > n * (n - 1)) {
        console.log(-1);
        return;
    }

    // Construct the graph
    const graph = Array.from({ length: n }, () => []);

    // Add tree edges
    for (let i = 0; i < t; i++) {
        if (i + 1 < n) {
            graph[i].push(i + 1);
        }
    }

    // Add back edges
    for (let i = 0; i < b; i++) {
        if (i < n - 1) {
            graph[i + 1].push(0); // Back edge to the first vertex
        }
    }

    // Add forward edges
    for (let i = 0; i < f; i++) {
        if (i + 2 < n) {
            graph[0].push(i + 2); // Forward edge from the root to other nodes
        }
    }

    // Add cross edges
    for (let i = 0; i < c; i++) {
        if (i + 1 < n) {
            graph[i + 1].push(i + 1); // Cross edges can go within or across
        }
    }

    // Print the graph
    console.log(n);
    for (let i = 0; i < n; i++) {
        const edges = graph[i];
        console.log(edges.length, ...edges.map(v => v + 1)); // Convert 0-indexed to 1-indexed
    }
}
