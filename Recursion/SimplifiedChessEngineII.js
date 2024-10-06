Chess is a very popular game played by hundreds of millions of people. Nowadays, we have chess engines such as Stockfish and Komodo to help us analyze games. These engines are very powerful pieces of well-developed software that use intelligent ideas and algorithms to analyze positions and sequences of moves, as well as to find tactical ideas. Consider the following simplified version of chess:

Board:
It's played on a  board between two players named Black and White.
Rows are numbered from  to , where the top row is  and the bottom row is .
Columns are lettered from  to , where the leftmost column is  and the rightmost column is .
Pieces and Movement:
White initially has  pieces and Black initially has  pieces.
There are no Kings on the board. Each player initially has exactly  Queen, at most  Pawns, at most  Rooks, and at most  minor pieces (i.e., a Bishop and/or Knight).
White's Pawns move up the board, while Black's Pawns move down the board.
Each move made by any player counts as a single move.
Each piece's possible moves are the same as in classical chess, with the following exceptions:
Pawns cannot move two squares forward.
The en passant move is not possible.
Promotion:
Pawns promote to either a Bishop, Knight, or Rook when they reach the back row (promotion to a Queen is not allowed).
The players must perform promotions whenever possible. This means White must promote their Pawns when they reach any cell in the top row, and Black must promote their Pawns when they reach any cell in the bottom row.
Objective:
The goal of the game is to capture the opponent’s Queen without losing your own.
There will never be a draw or tie scenario like you might see in classical chess.
Given  and the layout of pieces for  games, implement a very basic engine for our simplified version of chess that determines whether or not White can win in  moves (regardless of how Black plays) if White always moves first. For each game, print YES on a new line if White can win in  moves; otherwise, print NO.

Input Format

The first line contains an integer, , denoting the number of games. The subsequent lines describe each game in the following format:

The first line contains three space-separated integers describing the respective values of  (the number of white pieces),  (the number of black pieces), and  (the maximum number of moves we want to know if White can win in).
The  subsequent lines describe each chess piece in the form t c r, where  is a character  denoting the type of piece (where  is Queen,  is Knight,  is Bishop,  is Rook, and  is a Pawn), and  and  denote the respective column and row on the board where the figure is located (where  and ). These inputs are given as follows:
Each of the first  lines describes the type and location of a White piece.
Each of the subsequent  lines describes the type and location of a Black piece.
Constraints

Each player has exactly  Queen, at most  Pawns, at most  Rooks, and at most  minor pieces (i.e., a Bishop and/or Knight).
It is guaranteed that the initial location of each chess piece is distinct.
No pawn is initially placed in a row where it would promote.
Output Format

For each of the  games of simplified chess, print whether or not White can win in  moves on a new line. If it's possible, print YES; otherwise, print NO instead.

Sample Input 0

1
2 1 1
Q B 1
P B 3
Q A 4
Sample Output 0

YES
Explanation 0

We play the following  game of simplified chess:

image

White wins by moving their Pawn to  and capturing Black's Queen, so we print YES on a new line.


 /* --------------------- */

 'use strict';

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

function isWinning(wPieces, bPieces, maxMoves, whitePieces, blackPieces) {
    const boardSize = 8; // 8x8 board

    // Create a board to keep track of piece positions
    const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

    // Place White pieces on the board
    for (const [type, col, row] of whitePieces) {
        board[row - 1][col.charCodeAt(0) - 'A'.charCodeAt(0)] = { type: 'W', pieceType: type };
    }
    
    // Place Black pieces on the board
    for (const [type, col, row] of blackPieces) {
        board[row - 1][col.charCodeAt(0) - 'A'.charCodeAt(0)] = { type: 'B', pieceType: type };
    }

    // Get White Queen position
    let whiteQueenPosition = null;
    for (const [type, col, row] of whitePieces) {
        if (type === 'Q') {
            whiteQueenPosition = [row - 1, col.charCodeAt(0) - 'A'.charCodeAt(0)];
            break;
        }
    }

    // Directions for different pieces
    const directions = {
        Q: [ // Queen directions (horizontal, vertical, diagonal)
            [-1, 0], [1, 0], [0, -1], [0, 1],
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ],
        R: [ // Rook directions
            [-1, 0], [1, 0], [0, -1], [0, 1]
        ],
        B: [ // Bishop directions
            [-1, -1], [-1, 1], [1, -1], [1, 1]
        ],
        K: [ // Knight moves
            [-2, -1], [-1, -2], [1, -2], [2, -1],
            [2, 1], [1, 2], [-1, 2], [-2, 1]
        ]
    };

    // Check if a piece can capture the opponent's queen
    const canCapture = (r, c) => {
        const blackQueenPos = blackPieces.find(([type]) => type === 'Q');
        if (blackQueenPos) {
            const [_, col, row] = blackQueenPos;
            const br = row - 1; // black queen row
            const bc = col.charCodeAt(0) - 'A'.charCodeAt(0); // black queen column
            
            return (r === br && c === bc); // Same position as black queen
        }
        return false;
    };

    // Recursive function to simulate moves
    const simulateMove = (currentMove, whitePositions) => {
        // If maximum moves reached, check for winning condition
        if (currentMove > maxMoves) return false;

        // Check for capture possibility
        if (canCapture(whiteQueenPosition[0], whiteQueenPosition[1])) {
            return true;
        }

        // Try all possible moves for white pieces
        for (const [type, col, row] of whitePositions) {
            const r = row - 1; // Convert to 0-based index
            const c = col.charCodeAt(0) - 'A'.charCodeAt(0); // Convert to 0-based index

            // Check moves based on the type of piece
            if (type === 'Q' || type === 'R' || type === 'B') {
                for (const [dr, dc] of directions[type]) {
                    let nr = r + dr;
                    let nc = c + dc;
                    while (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
                        if (board[nr][nc] && board[nr][nc].type === 'B') {
                            break; // Cannot move through Black pieces
                        }
                        // Capture Black Queen if in range
                        if (canCapture(nr, nc)) {
                            return true;
                        }
                        nr += dr;
                        nc += dc;
                    }
                }
            } else if (type === 'K') { // Knight moves
                for (const [dr, dc] of directions[type]) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
                        // Capture Black Queen if in range
                        if (canCapture(nr, nc)) {
                            return true;
                        }
                    }
                }
            } else if (type === 'P') { // Pawn moves
                // Move forward and capture diagonally
                const pawnsMoves = [
                    [r - 1, c - 1], // Capture left diagonal
                    [r - 1, c + 1]  // Capture right diagonal
                ];
                for (const [nr, nc] of pawnsMoves) {
                    if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
                        // Capture Black Queen if in range
                        if (canCapture(nr, nc)) {
                            return true;
                        }
                    }
                }
            }
        }

        // If no winning moves found, return false
        return false;
    };

    // Start simulating from the first move
    const canWin = simulateMove(0, whitePieces);
    return canWin ? 'YES' : 'NO';
}

function main() {
    const g = parseInt(readLine().trim(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const w = parseInt(firstMultipleInput[0], 10); // Number of white pieces
        const b = parseInt(firstMultipleInput[1], 10); // Number of black pieces
        const m = parseInt(firstMultipleInput[2], 10); // Max moves

        let whitePieces = Array(w);
        for (let i = 0; i < w; i++) {
            whitePieces[i] = readLine().replace(/\s+$/g, '').split(' ');
        }

        let blackPieces = Array(b);
        for (let i = 0; i < b; i++) {
            blackPieces[i] = readLine().replace(/\s+$/g, '').split(' ');
        }

        // Check if White can win
        const result = isWinning(w, b, m, whitePieces, blackPieces);
        console.log(result);
    }
}
