The city of Gridland is represented as an  matrix where the rows are numbered from  to  and the columns are numbered from  to .

Gridland has a network of train tracks that always run in straight horizontal lines along a row. In other words, the start and end points of a train track are  and , where  represents the row number,  represents the starting column, and  represents the ending column of the train track.

The mayor of Gridland is surveying the city to determine the number of locations where lampposts can be placed. A lamppost can be placed in any cell that is not occupied by a train track.

Given a map of Gridland and its  train tracks, find and print the number of cells where the mayor can place lampposts.

Note: A train track may overlap other train tracks within the same row.

Example

If Gridland's data is the following (1-based indexing):

k = 3
r   c1  c2
1   1   4
2   2   4
3   1   2
4   2   3
It yields the following map:

image

In this case, there are five open cells (red) where lampposts can be placed.

Function Description

Complete the gridlandMetro function in the editor below.

gridlandMetro has the following parameter(s):

int n:: the number of rows in Gridland
int m:: the number of columns in Gridland
int k:: the number of tracks
track[k][3]: each element contains  integers that represent , all 1-indexed
Returns

int: the number of cells where lampposts can be installed
Input Format

The first line contains three space-separated integers  and , the number of rows, columns and tracks to be mapped.

Each of the next  lines contains three space-separated integers,  and , the row number and the track column start and end.

Constraints

Sample Input

STDIN   Function
-----   --------
4 4 3   n = 4, m = 4, k = 3
2 2 3   track = [[2, 2, 3], [3, 1, 4], [4, 4, 4]]
3 1 4
4 4 4
Sample Output

9
Explanation

image

In the diagram above, the yellow cells denote the first train track, green denotes the second, and blue denotes the third. Lampposts can be placed in any of the nine red cells.

 /* -------------------------------------------------------------- */


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
 * Complete the 'gridlandMetro' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. INTEGER k
 *  4. 2D_INTEGER_ARRAY track
 */

function gridlandMetro(n, m, k, track) {
    const rowTracks = {};

    // Populate rowTracks with intervals
    for (let i = 0; i < k; i++) {
        const [row, start, end] = track[i];
        if (!rowTracks[row]) {
            rowTracks[row] = [];
        }
        rowTracks[row].push([start, end]);
    }

    let totalCoveredCells = 0;

    // Process each row
    for (const row in rowTracks) {
        const intervals = rowTracks[row];
        intervals.sort((a, b) => a[0] - b[0]);

        let mergedStart = intervals[0][0];
        let mergedEnd = intervals[0][1];

        for (let i = 1; i < intervals.length; i++) {
            const [start, end] = intervals[i];
            if (start <= mergedEnd + 1) {
                // Overlapping or contiguous intervals
                mergedEnd = Math.max(mergedEnd, end);
            } else {
                // Non-overlapping interval
                totalCoveredCells += (mergedEnd - mergedStart + 1);
                mergedStart = start;
                mergedEnd = end;
            }
        }
        // Add the last merged interval
        totalCoveredCells += (mergedEnd - mergedStart + 1);
    }

    // Total cells in the grid
    const totalCells = n * m;

    // Cells available for lampposts
    return totalCells - totalCoveredCells;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);
    const k = parseInt(firstMultipleInput[2], 10);

    let track = Array(k);

    for (let i = 0; i < k; i++) {
        track[i] = readLine().replace(/\s+$/g, '').split(' ').map(trackTemp => parseInt(trackTemp, 10));
    }

    const result = gridlandMetro(n, m, k, track);

    ws.write(result + '\n');

    ws.end();
}
