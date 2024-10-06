Range Minimum Query is a well-known problem: given an array of distinct integers with size  and  queries, find the minimum element on subsegment .

One of the most efficient and famous solutions to this problem is a segment tree. A segment tree is a full binary tree with  nodes where the leaves contain the values of the original array and each non-leaf node contains the minimum value of its entire subtree.

Usually, a segment tree is represented as an array of integers with  elements. The left child of the  node is in the  cell, and the right child is in the  cell. For example,  represents the following segment tree where the first number in a node describes the array index, , in  and the second number denotes the value stored at index  (which corresponds to the minimum value in that node's subtree):

example1_graph.png

You've just used  distinct integers to construct your first segment tree and saved it as an array, , of  values. Unfortunately, some evil guy came and either shuffled or altered the elements in your array. Can you use the altered data to restore the original array? If no, print NO on a new line; otherwise, print two lines where the first line contains the word YES and the second line contains  space-separated integers denoting the array's original values. If there are several possible original arrays, print the lexicographically smallest one.

Input Format

The first line contains a single integer, , denoting the size of the array.
The second line contains  space-separated integers denoting the shuffled values of the segment tree.

Constraints

 is a power of two.
Each value in the segment tree is between  and .
Output Format

Print NO if this array could not be constructed by shuffling some segment tree. Otherwise, print YES on the first line, and  space-separated integers describing the respective values of the original array on the second line. If there are several possible answers, print the lexicographically smallest one.

Sample Input 0

4
3 1 3 1 2 4 1
Sample Output 0

YES
1 1 3 1 2 3 4 
Explanation 0
This is the same segment tree shown in the Problem Statement above.

Sample Input 1

2
1 1 1
Sample Output 1

NO 
Explanation 1
A segment tree with three nodes would consist of a root, a left child, and a right child. Because all three numbers in this array are the same and the leaves of the segment tree must be  distinct integers, it's not possible to reconstruct the original array.


 /* ------------------------ */

 function processData(input) {
    let data = input.split('\n');
    let n = parseInt(data[0].trim());
    let segmentTree = data[1].split(' ').map(Number);

    // Sort the segment tree to find potential leaf nodes and ensure the smallest lexicographically.
    segmentTree.sort((a, b) => a - b);

    let originalArray = segmentTree.slice(0, n); // The first `n` smallest elements are the leaves.
    let internalNodes = segmentTree.slice(n); // Remaining `n - 1` nodes are internal nodes.

    // Step 1: Try to rebuild the segment tree by checking the minimum property.
    let isValid = true;

    // Create a function to simulate a segment tree construction
    function buildSegmentTree(arr) {
        let tree = [];
        let size = arr.length;

        // Fill leaf nodes
        for (let i = 0; i < size; i++) {
            tree[size + i] = arr[i];
        }

        // Fill internal nodes
        for (let i = size - 1; i > 0; i--) {
            tree[i] = Math.min(tree[2 * i], tree[2 * i + 1]);
        }

        return tree;
    }

    // Step 2: Build the tree based on the original array and compare with shuffled segment tree
    let reconstructedTree = buildSegmentTree(originalArray);

    // Compare the reconstructed tree with the original shuffled one
    for (let i = 1; i < 2 * n - 1; i++) {
        if (reconstructedTree[i] !== segmentTree[i - 1]) {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        console.log('YES');
        console.log(originalArray.join(' '));
    } else {
        console.log('NO');
    }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});
