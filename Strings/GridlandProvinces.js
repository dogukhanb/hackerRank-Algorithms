The Kingdom of Gridland contains  provinces. Each province is defined as a  grid where each cell in the grid represents a city. Every cell in the grid contains a single lowercase character denoting the first character of the city name corresponding to that cell.

From a city with the coordinates , it is possible to move to any of the following cells in  unit of time (provided that the destination cell is within the confines of the grid):

A knight wants to visit all the cities in Gridland. He can start his journey in any city and immediately stops his journey after having visited each city at least once. Moreover, he always plans his journey in such a way that the total time required to complete it is minimum.

After completing his tour of each province, the knight forms a string by concatenating the characters of all the cells in his path. How many distinct strings can he form in each province?

Input Format

The first line contains a single integer, , denoting the number of provinces. The  subsequent lines describe each province over the following three lines:
The first line contains an integer, , denoting the number of columns in the province.
Each of the next two lines contains a string, , of length  denoting the characters for the first and second row of the province.

Constraints

Output Format

For each province, print the number of distinct strings the knight can form on a new line.

Sample Input

3
1
a
a
3
dab
abd
5
ababa
babab
Sample Output

1
8
2
Explanation

Province 0:
query 0

The knight can only form one string (aa), so we print  on a new line.

Province 1:
query 1

The knight can form eight different strings (abdbad, adabdb, badabd, bdbada, dababd, dabdba, dbabad, and dbadab), so we print  on a new line.

Province 2:
query 2

The knight can form two different strings (ababababab and bababababa), so we print  on a new line.


 /* -------------------------------- */

 function gridlandProvinces(s1, s2) {
    const n = s1.length; // Number of columns
    const directions = [
        [0, 1], // Right
        [0, -1], // Left
        [1, 0], // Down
        [-1, 0] // Up
    ];

    const grid = [s1.split(''), s2.split('')]; // Representing the grid as a 2D array
    const visited = Array.from({ length: 2 }, () => Array(n).fill(false)); // To mark visited cities
    const distinctStrings = new Set();

    // Check if the move is within bounds of the grid
    function isValid(x, y) {
        return x >= 0 && x < 2 && y >= 0 && y < n;
    }

    // DFS function to explore all possible paths
    function dfs(x, y, path) {
        if (path.length === 2 * n) {
            distinctStrings.add(path.join('')); // Add the formed string to the set
            return;
        }

        visited[x][y] = true; // Mark the current cell as visited
        path.push(grid[x][y]); // Add the current city to the path

        // Explore all 4 directions
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            if (isValid(newX, newY) && !visited[newX][newY]) {
                dfs(newX, newY, path);
            }
        }

        // Backtrack: Unmark the current cell and remove the last city from the path
        visited[x][y] = false;
        path.pop();
    }

    // Try to start DFS from every cell in the grid
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < n; j++) {
            dfs(i, j, []); // Start DFS from (i, j)
        }
    }

    return distinctStrings.size; // Return the number of distinct strings
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const p = parseInt(readLine().trim(), 10);

    for (let pItr = 0; pItr < p; pItr++) {
        const n = parseInt(readLine().trim(), 10);

        const s1 = readLine();

        const s2 = readLine();

        const result = gridlandProvinces(s1, s2);

        ws.write(result + '\n');
    }

    ws.end();
}
