Consider a matrix where each cell contains either a  or a . Any cell containing a  is called a filled cell. Two cells are said to be connected if they are adjacent to each other horizontally, vertically, or diagonally. In the following grid, all cells marked X are connected to the cell marked Y.

XXX
XYX  
XXX    
If one or more filled cells are also connected, they form a region. Note that each cell in a region is connected to zero or more cells in the region but is not necessarily directly connected to all the other cells in the region.

Given an  matrix, find and print the number of cells in the largest region in the matrix. Note that there may be more than one region in the matrix.

For example, there are two regions in the following  matrix. The larger region at the top left contains  cells. The smaller one at the bottom right contains .

110
100
001
Function Description

Complete the connectedCell function in the editor below.

connectedCell has the following parameter(s):
- int matrix[n][m]:  represents the  row of the matrix

Returns
- int: the area of the largest region

Input Format

The first line contains an integer , the number of rows in the matrix.
The second line contains an integer , the number of columns in the matrix.
Each of the next  lines contains  space-separated integers .

Constraints

Sample Input

STDIN       Function
-----       --------
4           n = 4
4           m = 4
1 1 0 0     grid = [[1, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 0, 0]]
0 1 1 0
0 0 1 0
1 0 0 0
Sample Output

5
Explanation

The diagram below depicts two regions of the matrix. Connected regions are filled with X or Y. Zeros are replaced with dots for clarity.

X X . .
. X X .
. . X .
Y . . .
The larger region has  cells, marked X.

 /* --------------------------- */
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
  * Complete the 'connectedCell' function below.
  *
  * The function is expected to return an INTEGER.
  * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
  */
 
 function connectedCell(matrix) {
     const n = matrix.length;
     const m = matrix[0].length;
     const visited = Array.from({ length: n }, () => Array(m).fill(false));
     const directions = [
         [-1, -1], [-1, 0], [-1, 1],
         [0, -1],          [0, 1],
         [1, -1], [1, 0], [1, 1]
     ];
 
     function dfs(x, y) {
         let size = 1;
         visited[x][y] = true;
 
         for (const [dx, dy] of directions) {
             const newX = x + dx;
             const newY = y + dy;
             if (newX >= 0 && newX < n && newY >= 0 && newY < m && matrix[newX][newY] === 1 && !visited[newX][newY]) {
                 size += dfs(newX, newY);
             }
         }
 
         return size;
     }
 
     let maxRegionSize = 0;
 
     for (let i = 0; i < n; i++) {
         for (let j = 0; j < m; j++) {
             if (matrix[i][j] === 1 && !visited[i][j]) {
                 const regionSize = dfs(i, j);
                 maxRegionSize = Math.max(maxRegionSize, regionSize);
             }
         }
     }
 
     return maxRegionSize;
 }
 
 function main() {
     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
 
     const n = parseInt(readLine().trim(), 10);
     const m = parseInt(readLine().trim(), 10);
 
     let matrix = Array(n);
 
     for (let i = 0; i < n; i++) {
         matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
     }
 
     const result = connectedCell(matrix);
 
     ws.write(result + '\n');
     ws.end();
 }
 
