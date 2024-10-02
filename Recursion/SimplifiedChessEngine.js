Chess is a very popular game played by hundreds of millions of people. Nowadays, we have chess engines such as Stockfish and Komodo to help us analyze games. These engines are very powerful pieces of well-developed software that use intelligent ideas and algorithms to analyze positions and sequences of moves, as well as find tactical ideas. Consider the following simplified version of chess:

Board: It's played on a  board between two players named Black and White.
Pieces and Movement:
White initially has  pieces and Black initially has  pieces.
There are no Kings and no Pawns on the board. Each player has exactly one Queen, at most two Rooks, and at most two minor pieces (i.e., a Bishop and/or Knight).
Each piece's possible moves are the same as in classical chess, and each move made by any player counts as a single move.
There is no draw when positions are repeated as there is in classical chess.
Objective: The goal of the game is to capture the opponent’s Queen without losing your own.
Given  and the layout of pieces for  games of simplified chess, implement a very basic (in comparison to the real ones) engine for our simplified version of chess with the ability to determine whether or not White can win in  moves (regardless of how Black plays) if White always moves first. For each game, print YES on a new line if White can win under the specified conditions; otherwise, print NO.

Input Format

The first line contains a single integer, , denoting the number of simplified chess games. The subsequent lines define each game in the following format:

The first line contains three space-separated integers denoting the respective values of  (the number of White pieces),  (the number of Black pieces), and  (the maximum number of moves we want to know if White can win in).
The  subsequent lines describe each chesspiece in the format t c r, where  is a character  denoting the type of piece (where  is Queen,  is Knight,  is Bishop, and  is Rook), and  and  denote the respective column and row on the board where the figure is placed (where  and ). These inputs are given as follows:
Each of the  subsequent lines denotes the type and location of a White piece on the board.
Each of the  subsequent lines denotes the type and location of a Black piece on the board.
Constraints

It is guaranteed that the locations of all pieces given as input are distinct.
Each player initially has exactly one Queen, at most two Rooks and at most two minor pieces.
Output Format

For each of the  games of simplified chess, print whether or not White can win in  moves on a new line. If it's possible, print YES; otherwise, print NO.

Sample Input 0

1
2 1 1
N B 2
Q B 1
Q A 4
Sample Output 0

YES
Explanation 0

We play  games of simplified chess, where the initial piece layout is as follows:

simplified-chess.png

White is the next to move, and they can win the game in  move by taking their Knight to  and capturing Black's Queen. Because it took  move to win and , we print YES on a new line.

 /* ----------------------------------------------------- */
 'use strict';

 const fs = require('fs');
 
 process.stdin.resume();
 process.stdin.setEncoding('utf-8');
 
 let inputString = '';
 let currentLine = 0;
 
 process.stdin.on('data', inputStdin => {
     inputString += inputStdin;
 });
 
 process.stdin.on('end', _ => {
     inputString = inputString.trim().split('\n').map(str => str.trim());
     main();
 });
 
 function readLine() {
     return inputString[currentLine++];
 }
 
 /*
  * Complete the simplifiedChessEngine function below.
  */
 function simplifiedChessEngine(whites, blacks, moves) {
     const directions = {
         'Q': [ // Queen
             [-1, 0], [1, 0], [0, -1], [0, 1], // vertical and horizontal
             [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonal
         ],
         'R': [ // Rook
             [-1, 0], [1, 0], [0, -1], [0, 1] // vertical and horizontal
         ],
         'B': [ // Bishop
             [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonal
         ],
         'N': [ // Knight
             [-2, -1], [-1, -2], [1, -2], [2, -1],
             [2, 1], [1, 2], [-1, 2], [-2, 1]
         ]
     };
 
     // Convert column and row to numeric indices
     const positionToIndex = (position) => {
         return [position.charCodeAt(0) - 'A'.charCodeAt(0), parseInt(position[1]) - 1];
     };
 
     // Initialize the board and find the Black Queen's position
     let blackQueenPosition = null;
     const board = Array.from({ length: 8 }, () => Array(8).fill(null));
     
     whites.forEach(piece => {
         const [type, col, row] = [piece[0], piece[1], piece[2]];
         board[positionToIndex(col)[0]][positionToIndex(row)[1]] = type;
     });
 
     blacks.forEach(piece => {
         const [type, col, row] = [piece[0], piece[1], piece[2]];
         board[positionToIndex(col)[0]][positionToIndex(row)[1]] = type;
         if (type === 'Q') {
             blackQueenPosition = positionToIndex(col).concat(positionToIndex(row));
         }
     });
 
     // If there's no black Queen, White can't win
     if (!blackQueenPosition) return "NO"; 
 
     // Check for possible captures in the allowed number of moves
     for (let piece of whites) {
         const [type, col, row] = [piece[0], piece[1], piece[2]];
         const [indexCol, indexRow] = positionToIndex(col);
 
         if (canCapture(type, indexCol, indexRow, blackQueenPosition, board, moves)) {
             return "YES";
         }
     }
 
     return "NO"; // No possible way to capture the Queen
 }
 
 // Helper function to check if a move can capture the Black Queen
 function canCapture(type, col, row, blackQueenPos, board, moves) {
     const directions = {
         'Q': [ // Queen
             [-1, 0], [1, 0], [0, -1], [0, 1], // vertical and horizontal
             [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonal
         ],
         'R': [ // Rook
             [-1, 0], [1, 0], [0, -1], [0, 1] // vertical and horizontal
         ],
         'B': [ // Bishop
             [-1, -1], [-1, 1], [1, -1], [1, 1] // diagonal
         ],
         'N': [ // Knight
             [-2, -1], [-1, -2], [1, -2], [2, -1],
             [2, 1], [1, 2], [-1, 2], [-2, 1]
         ]
     };
 
     const moveQueue = [{ col, row, moveCount: 0 }];
     const visited = new Set();
 
     while (moveQueue.length > 0) {
         const { col: currentCol, row: currentRow, moveCount } = moveQueue.shift();
 
         // If we've reached the Black Queen's position within the move limit
         if (currentCol === blackQueenPos[0] && currentRow === blackQueenPos[1] && moveCount <= moves) {
             return true;
         }
 
         // Stop if we've used all allowed moves
         if (moveCount >= moves) continue;
 
         // Explore possible moves for the piece
         for (let [dc, dr] of directions[type]) {
             if (type === 'N') { // Knight moves
                 const newCol = currentCol + dc;
                 const newRow = currentRow + dr;
                 if (isValidMove(newCol, newRow, visited, board)) {
                     visited.add(`${newCol}-${newRow}`);
                     moveQueue.push({ col: newCol, row: newRow, moveCount: moveCount + 1 });
                 }
             } else { // Sliding pieces (Rook, Bishop, Queen)
                 let newCol = currentCol;
                 let newRow = currentRow;
                 while (true) {
                     newCol += dc;
                     newRow += dr;
                     if (!isValidMove(newCol, newRow, visited, board)) break;
                     visited.add(`${newCol}-${newRow}`);
                     moveQueue.push({ col: newCol, row: newRow, moveCount: moveCount + 1 });
                     // Stop sliding if we hit another piece
                     if (board[newCol][newRow] !== null) break;
                 }
             }
         }
     }
 
     return false; // No way to capture the Queen within the allowed moves
 }
 
 // Helper function to check if a move is valid
 function isValidMove(col, row, visited, board) {
     return col >= 0 && col < 8 && row >= 0 && row < 8 && !visited.has(`${col}-${row}`);
 }
 
 function main() {
     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
 
     const g = parseInt(readLine(), 10);
 
     for (let gItr = 0; gItr < g; gItr++) {
         const wbm = readLine().split(' ');
 
         const w = parseInt(wbm[0], 10);
         const b = parseInt(wbm[1], 10);
         const m = parseInt(wbm[2], 10);
 
         let whites = Array(w);
         for (let whitesRowItr = 0; whitesRowItr < w; whitesRowItr++) {
             whites[whitesRowItr] = readLine().split(' ');
         }
 
         let blacks = Array(b);
         for (let blacksRowItr = 0; blacksRowItr < b; blacksRowItr++) {
             blacks[blacksRowItr] = readLine().split(' ');
         }
 
         let result = simplifiedChessEngine(whites, blacks, m);
         ws.write(result + '\n');
     }
 
     ws.end();
 }
 
