Given an array of strings of digits, try to find the occurrence of a given pattern of digits. In the grid and pattern arrays, each string represents a row in the grid. For example, consider the following grid:

1234567890  
0987654321  
1111111111  
1111111111  
2222222222  
The pattern array is:

876543  
111111  
111111
The pattern begins at the second row and the third column of the grid and continues in the following two rows. The pattern is said to be present in the grid. The return value should be YES or NO, depending on whether the pattern is found. In this case, return YES.

Function Description

Complete the gridSearch function in the editor below. It should return YES if the pattern exists in the grid, or NO otherwise.

gridSearch has the following parameter(s):

string G[R]: the grid to search
string P[r]: the pattern to search for
Input Format

The first line contains an integer , the number of test cases.

Each of the  test cases is represented as follows:
The first line contains two space-separated integers  and , the number of rows in the search grid  and the length of each row string.
This is followed by  lines, each with a string of  digits that represent the grid .
The following line contains two space-separated integers,  and , the number of rows in the pattern grid  and the length of each pattern row string.
This is followed by  lines, each with a string of  digits that represent the pattern grid .

Returns

string: either YES or NO
Constraints





Sample Input

2
10 10
7283455864
6731158619
8988242643
3830589324
2229505813
5633845374
6473530293
7053106601
0834282956
4607924137
3 4
9505
3845
3530
15 15
400453592126560
114213133098692
474386082879648
522356951189169
887109450487496
252802633388782
502771484966748
075975207693780
511799789562806
404007454272504
549043809916080
962410809534811
445893523733475
768705303214174
650629270887160
2 2
99
99
Sample Output

YES
NO
Explanation

The first test in the input file is:

10 10
7283455864
6731158619
8988242643
3830589324
2229505813
5633845374
6473530293
7053106601
0834282956
4607924137
3 4
9505
3845
3530
The pattern is present in the larger grid as marked in bold below.

7283455864  
6731158619  
8988242643  
3830589324  
2229505813  
5633845374  
6473530293  
7053106601  
0834282956  
4607924137  
The second test in the input file is:

15 15
400453592126560
114213133098692
474386082879648
522356951189169
887109450487496
252802633388782
502771484966748
075975207693780
511799789562806
404007454272504
549043809916080
962410809534811
445893523733475
768705303214174
650629270887160
2 2
99
99
The search pattern is:

99
99
This pattern is not found in the larger grid.

/* ----------------------------------------------- */


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
 * Complete the 'gridSearch' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING_ARRAY G
 *  2. STRING_ARRAY P
 */

function gridSearch(G, P) {
    const G_rows = G.length;
    const G_cols = G[0].length;
    const P_rows = P.length;
    const P_cols = P[0].length;

    // Loop through each position in G where P could fit
    for (let i = 0; i <= G_rows - P_rows; i++) {
        for (let j = 0; j <= G_cols - P_cols; j++) {
            // Check if the pattern P matches starting at G[i][j]
            let found = true;

            for (let k = 0; k < P_rows; k++) {
                if (G[i + k].substring(j, j + P_cols) !== P[k]) {
                    found = false;
                    break;
                }
            }

            if (found) {
                return "YES";
            }
        }
    }

    return "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
        const R = parseInt(firstMultipleInput[0], 10);
        const C = parseInt(firstMultipleInput[1], 10);

        let G = [];
        for (let i = 0; i < R; i++) {
            const GItem = readLine();
            G.push(GItem);
        }

        const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
        const r = parseInt(secondMultipleInput[0], 10);
        const c = parseInt(secondMultipleInput[1], 10);

        let P = [];
        for (let i = 0; i < r; i++) {
            const PItem = readLine();
            P.push(PItem);
        }

        const result = gridSearch(G, P);
        ws.write(result + '\n');
    }

    ws.end();
}
