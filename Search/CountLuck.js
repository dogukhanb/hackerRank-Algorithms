Ron and Hermione are deep in the Forbidden Forest collecting potion ingredients, and they've managed to lose their way. The path out of the forest is blocked, so they must make their way to a portkey that will transport them back to Hogwarts.

Consider the forest as an  grid. Each cell is either empty (represented by .) or blocked by a tree (represented by ). Ron and Hermione can move (together inside a single cell) LEFT, RIGHT, UP, and DOWN through empty cells, but they cannot travel through a tree cell. Their starting cell is marked with the character , and the cell with the portkey is marked with a . The upper-left corner is indexed as .

.X.X......X
.X*.X.XXX.X
.XX.X.XM...
......XXXX.
In example above, Ron and Hermione are located at index  and the portkey is at . Each cell is indexed according to Matrix Conventions.

Hermione decides it's time to find the portkey and leave. They start along the path and each time they have to choose a direction, she waves her wand and it points to the correct direction. Ron is betting that she will have to wave her wand exactly  times. Can you determine if Ron's guesses are correct?

The map from above has been redrawn with the path indicated as a series where  is the starting point (no decision in this case),  indicates a decision point and  is just a step on the path:

.X.X.10000X
.X*0X0XXX0X
.XX0X0XM01.
...100XXXX.
There are three instances marked with  where Hermione must use her wand.

Note: It is guaranteed that there is only one path from the starting location to the portkey.

Function Description

Complete the countLuck function in the editor below. It should return a string, either  if Ron is correct or  if he is not.

countLuck has the following parameters:

matrix: a list of strings, each one represents a row of the matrix
k: an integer that represents Ron's guess
Input Format

The first line contains an integer , the number of test cases.

Each test case is described as follows:
The first line contains  space-separated integers  and , the number of forest matrix rows and columns.
Each of the next  lines contains a string of length  describing a row of the forest matrix.
The last line contains an integer , Ron's guess as to how many times Hermione will wave her wand.

Constraints

There will be exactly one  and one  in the forest.
Exactly one path exists between  and .
Output Format

On a new line for each test case, print  if Ron impresses Hermione by guessing correctly. Otherwise, print .

Sample Input

3
2 3
*.M
.X.
1
4 11
.X.X......X
.X*.X.XXX.X
.XX.X.XM...
......XXXX.
3
4 11
.X.X......X
.X*.X.XXX.X
.XX.X.XM...
......XXXX.
4
Sample Output

Impressed
Impressed
Oops!
Explanation

For each test case,  denotes the number of times Hermione waves her wand.

Case 0: Hermione waves her wand at , giving us . Because , we print  on a new line.
Case 1: Hermione waves her wand at , , and , giving us . Because , we print  on a new line.
Case 2: Hermione waves her wand at , , and , giving us . Because  and ,  and we print  on a new line.


 /* ----------------------------- */

 function countLuck(matrix, k) {
    const n = matrix.length;
    const m = matrix[0].length;
    let startX, startY, endX, endY;
    
    // Find the start ('M') and end ('*') positions
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === 'M') {
                startX = i;
                startY = j;
            }
            if (matrix[i][j] === '*') {
                endX = i;
                endY = j;
            }
        }
    }
    
    // Directions for moving in the matrix (UP, DOWN, LEFT, RIGHT)
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    // BFS function to traverse the grid and count decision points
    const bfs = () => {
        const queue = [[startX, startY, 0]]; // (x, y, number of wand waves)
        const visited = Array.from({ length: n }, () => Array(m).fill(false));
        visited[startX][startY] = true;

        while (queue.length > 0) {
            const [x, y, waves] = queue.shift();

            // If we reach the portkey, return the number of wand waves
            if (x === endX && y === endY) return waves;

            // Count how many possible directions we can go from current position
            let possibleDirections = 0;
            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;
                if (newX >= 0 && newX < n && newY >= 0 && newY < m && matrix[newX][newY] !== 'X' && !visited[newX][newY]) {
                    possibleDirections++;
                }
            }

            // If more than one direction is available, it's a decision point (Hermione waves her wand)
            let newWaves = waves;
            if (possibleDirections > 1) {
                newWaves++;
            }

            // Explore all valid directions
            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;
                if (newX >= 0 && newX < n && newY >= 0 && newY < m && matrix[newX][newY] !== 'X' && !visited[newX][newY]) {
                    visited[newX][newY] = true;
                    queue.push([newX, newY, newWaves]);
                }
            }
        }

        // If we somehow never reach the end, return -1 (shouldn't happen as per problem constraints)
        return -1;
    };

    // Count the wand waves and check if it matches Ron's guess
    const actualWaves = bfs();
    return actualWaves === k ? "Impressed" : "Oops!";
}

function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const [n, m] = readLine().split(' ').map(Number);

        let matrix = [];
        for (let i = 0; i < n; i++) {
            matrix.push(readLine());
        }

        const k = parseInt(readLine().trim(), 10);

        const result = countLuck(matrix, k);
        console.log(result);
    }
}
