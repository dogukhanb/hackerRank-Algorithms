There is an undirected tree where each vertex is numbered from  to , and each contains a data value. The sum of a tree is the sum of all its nodes' data values. If an edge is cut, two smaller trees are formed. The difference between two trees is the absolute value of the difference in their sums.

Given a tree, determine which edge to cut so that the resulting trees have a minimal difference between them, then return that difference.

Example


In this case, node numbers match their weights for convenience. The graph is shown below.

image

The values are calculated as follows:

Edge    Tree 1  Tree 2  Absolute
Cut     Sum      Sum     Difference
1        8         13         5
2        9         12         3
3        6         15         9
4        4         17        13
5        5         16        11
The minimum absolute difference is .

Note: The given tree is always rooted at vertex .

Function Description

Complete the cutTheTree function in the editor below.

cutTheTree has the following parameter(s):

int data[n]: an array of integers that represent node values
int edges[n-1][2]: an 2 dimensional array of integer pairs where each pair represents nodes connected by the edge
Returns

int: the minimum achievable absolute difference of tree sums
Input Format

The first line contains an integer , the number of vertices in the tree.
The second line contains  space-separated integers, where each integer  denotes the  data value, .
Each of the  subsequent lines contains two space-separated integers  and  that describe edge  in tree .

Constraints

, where .
Sample Input

STDIN                       Function
-----                       --------
6                           data[] size n = 6
100 200 100 500 100 600     data = [100, 200, 100, 500, 100, 600]
1 2                         edges = [[1, 2], [2, 3], [2, 5], [4, 5], [5, 6]]
2 3
2 5
4 5
5 6
Sample Output

400
Explanation

We can visualize the initial, uncut tree as:

cut-the-tree.png

There are  edges we can cut:

Edge  results in 
Edge  results in 
Edge  results in 
Edge  results in 
Edge  results in 
The minimum difference is .

 /* ------------------------ */

 function cutTheTree(data, edges) {
    const n = data.length;
    const totalSum = data.reduce((acc, val) => acc + val, 0);
    
    // Create adjacency list for the tree
    const tree = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        // Adjusting from 1-based index to 0-based index
        tree[u - 1].push(v - 1);
        tree[v - 1].push(u - 1);
    }

    // Array to hold the sum of subtree rooted at each node
    const subtreeSum = new Array(n).fill(0);
    let minDifference = Infinity;

    // DFS to calculate subtree sums
    function dfs(node, parent) {
        let currentSum = data[node];

        for (const neighbor of tree[node]) {
            if (neighbor !== parent) {  // Ensure we do not go back to the parent
                currentSum += dfs(neighbor, node);
            }
        }

        // If the node is not the root, calculate the difference
        if (parent !== null) {
            const diff = Math.abs(totalSum - 2 * currentSum);
            minDifference = Math.min(minDifference, diff);
        }

        subtreeSum[node] = currentSum; // Store the current subtree sum
        return currentSum;
    }

    // Start DFS from the root node (0 in 0-based index)
    dfs(0, null);

    return minDifference;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const data = readLine().replace(/\s+$/g, '').split(' ').map(dataTemp => parseInt(dataTemp, 10));
    
    let edges = Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
        edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
    }

    const result = cutTheTree(data, edges);
    ws.write(result + '\n');
    ws.end();
}
