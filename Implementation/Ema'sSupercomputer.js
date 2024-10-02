Ema built a quantum computer! Help her test its capabilities by solving the problem below.

Given a grid of size , each cell in the grid is either  or .

A valid plus is defined here as the crossing of two segments (horizontal and vertical) of equal lengths. These lengths must be odd, and the middle cell of its horizontal segment must cross the middle cell of its vertical segment.

In the diagram below, the blue pluses are valid and the orange ones are not valid. pluseses.png

Find the two largest valid pluses that can be drawn on  cells in the grid, and return an integer denoting the maximum product of their areas. In the above diagrams, our largest pluses have areas of  and . The product of their areas is .

Note: The two pluses cannot overlap, and the product of their areas should be maximal.

Function Description

Complete the twoPluses function in the editor below. It should return an integer that represents the area of the two largest pluses.

twoPluses has the following parameter(s):

grid: an array of strings where each string represents a row and each character of the string represents a column of that row
Input Format

The first line contains two space-separated integers,  and .
Each of the next  lines contains a string of  characters where each character is either G () or B (). These strings represent the rows of the grid. If the  character in the  line is G, then  is a  cell. Otherwise it's a  cell.

Constraints



Output Format

Find  pluses that can be drawn on  cells of the grid, and return an integer denoting the maximum product of their areas.

Sample Input 0

5 6
GGGGGG
GBBBGB
GGGGGG
GGBBGB
GGGGGG
Sample Output 0

5
Sample Input 1

6 6
BGBBGB
GGGGGG
BGBBGB
GGGGGG
BGBBGB
BGBBGB
Sample Output 1

25
Explanation

Here are two possible solutions for Sample 0 (left) and Sample 1 (right): plusss.png

Explanation Key:

Green:  cell
Red:  cell
Blue: possible .
For the explanation below, we will refer to a plus of length  as .

Sample 0
There is enough good space to color one  plus and one  plus. , and . The product of their areas is .

Sample 1
There is enough good space to color two  pluses. . The product of the areas of our two  pluses is .


/* ---------------------------- */

'use strict';

function doesOverlap(plus1, plus2) {
    const cellsSet = new Set(plus1.map(cell => `${cell[0]},${cell[1]}`));
    return plus2.some(cell => cellsSet.has(`${cell[0]},${cell[1]}`));
}

function getPlus(r, c, size) {
    const plusCells = [];
    plusCells.push([r, c]); // center
    for (let i = 1; i <= size; i++) {
        plusCells.push([r - i, c]); // top
        plusCells.push([r + i, c]); // bottom
        plusCells.push([r, c - i]); // left
        plusCells.push([r, c + i]); // right
    }
    return plusCells;
}

function isValidPlus(r, c, size, n, m, grid) {
    if (r - size < 0 || r + size >= n || c - size < 0 || c + size >= m) return false;
    for (let i = 0; i <= size; i++) {
        if (
            grid[r - i][c] !== 'G' ||
            grid[r + i][c] !== 'G' ||
            grid[r][c - i] !== 'G' ||
            grid[r][c + i] !== 'G'
        ) {
            return false;
        }
    }
    return true;
}

function twoPluses(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const allPluses = [];

    // Find all valid pluses and their coordinates
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            if (grid[r][c] === 'G') {
                let size = 0;
                while (isValidPlus(r, c, size, n, m, grid)) {
                    const area = 1 + 4 * size; // area of plus
                    allPluses.push({ area, cells: getPlus(r, c, size) });
                    size++;
                }
            }
        }
    }

    let maxProduct = 0;

    // Compare each pair of pluses and check for overlap
    for (let i = 0; i < allPluses.length; i++) {
        for (let j = i + 1; j < allPluses.length; j++) {
            if (!doesOverlap(allPluses[i].cells, allPluses[j].cells)) {
                const product = allPluses[i].area * allPluses[j].area;
                maxProduct = Math.max(maxProduct, product);
            }
        }
    }

    return maxProduct;
}

// Read input
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').split('\n');
const [n, m] = input[0].split(' ').map(Number);
const grid = input.slice(1, n + 1);

// Calculate result
const result = twoPluses(grid);
console.log(result);
