Given a set of  intervals, find the size of its largest possible subset of intervals such that no three intervals in the subset share a common point.

Input Format

The first line contains an integer, , denoting the number of interval sets you must find answers for. The  subsequent lines describe each of the  interval sets as follows:

The first line contains an integer, , denoting the number of intervals in the list.
Each line  of the  subsequent lines contains two space-separated integers describing the respective starting () and ending () boundaries of an interval.
Constraints

Output Format

For each of the  interval sets, print an integer denoting the size of the largest possible subset of intervals in the given set such that no three points in the subset overlap.

Sample Input

4
3
1 2
2 3
2 4
3
1 5
1 5
1 5
4
1 10
1 3
4 6
7 10
4
1 10
1 3
3 6
7 10
Sample Output

2
2
4
3
Explanation

For set , all three intervals fall on point  so we can only choose any  of the intervals. Thus, we print  on a new line.

For set , all three intervals span the range from  to  so we can only choose any  of them. Thus, we print  on a new line.

For set , we can choose all  intervals without having more than two of them overlap at any given point. Thus, we print  on a new line.

For set , the intervals , , and  all overlap at point , so we must only choose  of these intervals to combine with the last interval, , for a total of  qualifying intervals. Thus, we print  on a new line.


 /* ----------------------------------------- */

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
 * Complete the 'intervalSelection' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY intervals as parameter.
 */

function intervalSelection(intervals) {
    // Sort intervals by their starting point, and then by their ending point
    intervals.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }
        return a[1] - b[1];
    });

    let count = 0;
    let active = []; // To store active intervals

    for (const [start, end] of intervals) {
        // Remove intervals that have ended before the current start
        active = active.filter(([_, e]) => e >= start);

        // If we have less than 2 active intervals, we can add the current interval
        if (active.length < 2) {
            active.push([start, end]);
            count++;
        }
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = parseInt(readLine().trim(), 10);

    for (let sItr = 0; sItr < s; sItr++) {
        const n = parseInt(readLine().trim(), 10);

        let intervals = Array(n);

        for (let i = 0; i < n; i++) {
            intervals[i] = readLine().replace(/\s+$/g, '').split(' ').map(intervalsTemp => parseInt(intervalsTemp, 10));
        }

        const result = intervalSelection(intervals);

        ws.write(result + '\n');
    }

    ws.end();
}