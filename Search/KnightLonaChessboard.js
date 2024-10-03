is a chess piece that moves in an L shape. We define the possible moves of  as any movement from some position  to some  satisfying either of the following:

and , or
and 
Note that  and  allow for the same exact set of movements. For example, the diagram below depicts the possible locations that  or  can move to from its current location at the center of a  chessboard:

image

Observe that for each possible movement, the Knight moves  units in one direction (i.e., horizontal or vertical) and  unit in the perpendicular direction.

Given the value of  for an  chessboard, answer the following question for each  pair where :

What is the minimum number of moves it takes for  to get from position  to position ? If it's not possible for the Knight to reach that destination, the answer is -1 instead.
Then print the answer for each  according to the Output Format specified below.

Input Format

A single integer denoting .

Constraints

Output Format

Print exactly  lines of output in which each line  (where ) contains  space-separated integers describing the minimum number of moves  must make for each respective  (where ). If some  cannot reach position , print -1 instead.

For example, if , we organize the answers for all the  pairs in our output like this:

(1,1) (1,2)
(2,1) (2,2)
Sample Input 0

5
Sample Output 0

4 4 2 8
4 2 4 4
2 4 -1 -1
8 4 -1 1
Explanation 0

The diagram below depicts possible minimal paths for , , and :

image

One minimal path for  is:

We then print 4 4 2 8 as our first line of output because  took  moves,  took  moves,  took  moves, and  took  moves.

In some of the later rows of output, it's impossible for  to reach position . For example,  can only move back and forth between  and  so it will never reach .


 /* -------------------------------- */

 function knightlOnAChessboard(n) {
    // Function to perform BFS for a specific knight movement (a, b)
    const bfs = (a, b) => {
        const directions = [
            [a, b], [a, -b], [-a, b], [-a, -b],
            [b, a], [b, -a], [-b, a], [-b, -a]
        ];
        
        const queue = [[0, 0, 0]]; // Start at (0, 0) with 0 moves
        const visited = Array.from({ length: n }, () => Array(n).fill(false));
        visited[0][0] = true;

        while (queue.length > 0) {
            const [x, y, moves] = queue.shift();

            // If we reached the target (n-1, n-1), return the number of moves
            if (x === n - 1 && y === n - 1) return moves;

            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;

                if (newX >= 0 && newY >= 0 && newX < n && newY < n && !visited[newX][newY]) {
                    visited[newX][newY] = true;
                    queue.push([newX, newY, moves + 1]);
                }
            }
        }
        
        // If we exhaust all possible moves without reaching (n-1, n-1), return -1
        return -1;
    };

    // Iterate through all possible (a, b) knight moves
    const result = [];
    for (let a = 1; a < n; a++) {
        const row = [];
        for (let b = 1; b < n; b++) {
            row.push(bfs(a, b));
        }
        result.push(row);
    }

    return result;
}

function main() {
    const n = parseInt(readLine().trim(), 10);
    const result = knightlOnAChessboard(n);

    // Print each row of the result
    result.forEach(row => console.log(row.join(' ')));
}
