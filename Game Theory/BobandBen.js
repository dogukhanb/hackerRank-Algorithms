Bob and Ben are playing a game with forests! The game's rules are as follows:

The game starts with a forest of  trees.
Bob always moves first and they take alternating turns. The first player with no available move loses the game.
During each move, the player removes one node. If the node is not a leaf, then the whole tree vanishes; otherwise, the rest of the tree remains in the forest. We define a leaf to be a node with exactly  connected edge.
Both players play optimally, meaning they will not make a move that causes them to lose the game if some better, winning move exists.
We define each tree  in the -tree forest as follows:

Tree  is defined by two integers,  (the number of nodes in the tree) and  (a constant).
Its nodes are numbered sequentially from  to .
Its edges are numbered sequentially from  to , and each edge  connects node  to node .
Given the values of  and  for each tree in the forest, can you determine who will win the game?

Input Format

The first line contains an integer, , denoting the number of games. The subsequent lines describe each game in the following format:

The first line contains an integer, , denoting the number of trees in the forest.
Each of the  subsequent lines contains two space-separated integers describing the respective values of  and  for tree .
Constraints

The sum of  over all games is at most .
Subtasks

For  of the maximum score:

The sum of  over all games is at most .
For  of the maximum score:

Output Format

For each game, print the name of the winner on a new line (i.e., BOB or BEN).

Sample Input

2
2
1 2
1 3
1
3 2
Sample Output

BEN
BOB
Explanation

Bob and Ben play the following two games:

The forest consists of  trees containing one node each, and each tree has no edges as  and  are both  (so both trees have  edges). The sequence of moves is as follows:
image
We then print the name of the winner, BEN, on a new line.
The forest consists of  tree containing three nodes. We find the  edges like so:

Edge  connects node  to node .
Edge  connects node  to node .
The game then plays out as follows:
image
We then print the name of the winner, BOB, on a new line.

 /* ----------------------- */
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
  * Complete the 'bobAndBen' function below.
  *
  * The function is expected to return a STRING.
  * The function accepts 2D_INTEGER_ARRAY trees as parameter.
  */
 
 function bobAndBen(trees) {
     let totalCoins = 0;
 
     // Calculate the total number of trees and their nodes
     for (const tree of trees) {
         const n = tree[0]; // Number of nodes
         totalCoins += n;
     }
 
     // Determine the winner based on the total number of nodes
     // If the total number of nodes is even, Ben wins; if odd, Bob wins.
     return totalCoins % 2 === 0 ? 'BEN' : 'BOB';
 }
 
 function main() {
     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
 
     const g = parseInt(readLine().trim(), 10); // Number of games
 
     for (let gItr = 0; gItr < g; gItr++) {
         const n = parseInt(readLine().trim(), 10); // Number of trees
 
         let trees = Array(n);
 
         for (let i = 0; i < n; i++) {
             trees[i] = readLine().replace(/\s+$/g, '').split(' ').map(treesTemp => parseInt(treesTemp, 10));
         }
 
         const result = bobAndBen(trees); // Get the result
 
         ws.write(result + '\n'); // Write the result
     }
 
     ws.end(); // Close the output stream
 }
 