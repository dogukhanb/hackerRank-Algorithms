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
 
 // Helper function to get possible moves of a piece
 function getPossibleMoves(piece, position) {
     const moves = [];
     const [type, col, row] = piece;
     const x = col.charCodeAt(0) - 'A'.charCodeAt(0); // Convert column to index (0-7)
     const y = parseInt(row) - 1; // Convert row to index (0-7)
 
     if (type === 'Q') {
         // Queen: Horizontal, Vertical, Diagonal
         for (let i = 0; i < 8; i++) {
             if (i !== x) moves.push([i, y]); // Horizontal
             if (i !== y) moves.push([x, i]); // Vertical
             if (x + i < 8 && y + i < 8) moves.push([x + i, y + i]); // Down Right
             if (x - i >= 0 && y + i < 8) moves.push([x - i, y + i]); // Down Left
             if (x + i < 8 && y - i >= 0) moves.push([x + i, y - i]); // Up Right
             if (x - i >= 0 && y - i >= 0) moves.push([x - i, y - i]); // Up Left
         }
     } else if (type === 'R') {
         // Rook: Horizontal, Vertical
         for (let i = 0; i < 8; i++) {
             if (i !== x) moves.push([i, y]); // Horizontal
             if (i !== y) moves.push([x, i]); // Vertical
         }
     } else if (type === 'B') {
         // Bishop: Diagonal
         for (let i = 1; i < 8; i++) {
             if (x + i < 8 && y + i < 8) moves.push([x + i, y + i]); // Down Right
             if (x - i >= 0 && y + i < 8) moves.push([x - i, y + i]); // Down Left
             if (x + i < 8 && y - i >= 0) moves.push([x + i, y - i]); // Up Right
             if (x - i >= 0 && y - i >= 0) moves.push([x - i, y - i]); // Up Left
         }
     } else if (type === 'N') {
         // Knight: L-shape moves
         const knightMoves = [
             [2, 1], [2, -1], [-2, 1], [-2, -1],
             [1, 2], [1, -2], [-1, 2], [-1, -2]
         ];
         for (const [dx, dy] of knightMoves) {
             const newX = x + dx;
             const newY = y + dy;
             if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                 moves.push([newX, newY]);
             }
         }
     }
 
     return moves.filter(([nx, ny]) => nx >= 0 && nx < 8 && ny >= 0 && ny < 8);
 }
 
 // Check if White can win in the specified number of moves
 function simplifiedChessEngine(whites, blacks, maxMoves) {
     const whitePieces = whites.map(w => [w[0], w[1], w[2]]);
     const blackPieces = blacks.map(b => [b[0], b[1], b[2]]);
     const blackQueen = blackPieces.find(b => b[0] === 'Q');
    
     if (!blackQueen) return "NO"; // No black queen present, should not happen as per constraints
 
     let queue = [{ pieces: whitePieces, blackPieces: blackPieces, moves: 0 }];
     let visited = new Set();
 
     while (queue.length > 0) {
         const { pieces, blackPieces, moves } = queue.shift();
        
         // Check if Black Queen is captured
         if (blackPieces.some(b => b[1] === blackQueen[1] && b[2] === blackQueen[2])) {
             if (moves <= maxMoves) return "YES";
         }
        
         if (moves >= maxMoves) continue;
 
         for (const piece of pieces) {
             const possibleMoves = getPossibleMoves(piece, piece.slice(1));
 
             for (const [nx, ny] of possibleMoves) {
                 // Create a new board state
                 const newWhitePieces = pieces.map(p => p.slice());
                 const newBlackPieces = blackPieces.map(b => b.slice());
 
                 // Capture Black Queen if possible
                 const capturedBlackQueen = newBlackPieces.find(b => b[1] === nx && b[2] === ny);
                 if (capturedBlackQueen && capturedBlackQueen[0] === 'Q') {
                     newBlackPieces.splice(newBlackPieces.indexOf(capturedBlackQueen), 1);
                 }
 
                 // Update White piece position
                 const pieceIndex = newWhitePieces.indexOf(piece);
                 newWhitePieces[pieceIndex] = [piece[0], String.fromCharCode(nx + 'A'.charCodeAt(0)), (ny + 1).toString()];
 
                 // Convert state to string for uniqueness check
                 const stateKey = JSON.stringify({ w: newWhitePieces, b: newBlackPieces });
 
                 if (!visited.has(stateKey)) {
                     visited.add(stateKey);
                     queue.push({ pieces: newWhitePieces, blackPieces: newBlackPieces, moves: moves + 1 });
                 }
             }
         }
     }
    
     return "NO";
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
 