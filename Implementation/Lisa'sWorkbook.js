Lisa just got a new math workbook. A workbook contains exercise problems, grouped into chapters. Lisa believes a problem to be special if its index (within a chapter) is the same as the page number where it's located. The format of Lisa's book is as follows:

There are  chapters in Lisa's workbook, numbered from  to .
The  chapter has  problems, numbered from  to .
Each page can hold up to  problems. Only a chapter's last page of exercises may contain fewer than  problems.
Each new chapter starts on a new page, so a page will never contain problems from more than one chapter.
The page number indexing starts at .
Given the details for Lisa's workbook, can you count its number of special problems?

Example


Lisa's workbook contains  problems for chapter , and  problems for chapter . Each page can hold  problems.

The first page will hold  problems for chapter . Problem  is on page , so it is special. Page  contains only Chapter , Problem , so no special problem is on page . Chapter  problems start on page  and there are  problems. Since there is no problem  on page , there is no special problem on that page either. There is  special problem in her workbook.

Note: See the diagram in the Explanation section for more details.

Function Description

Complete the workbook function in the editor below.

workbook has the following parameter(s):

int n: the number of chapters
int k: the maximum number of problems per page
int arr[n]: the number of problems in each chapter
Returns
- int: the number of special problems in the workbook

Input Format

The first line contains two integers  and , the number of chapters and the maximum number of problems per page.
The second line contains  space-separated integers  where  denotes the number of problems in the  chapter.

Constraints

Sample Input

STDIN       Function
-----       --------
5 3         n = 5, k = 3
4 2 6 1 10  arr = [4, 2, 6, 1, 10]
Sample Output

4
Explanation

The diagram below depicts Lisa's workbook with  chapters and a maximum of  problems per page. Special problems are outlined in red, and page numbers are in yellow squares.

bear_workbook.png

There are  special problems and thus we print the number  on a new line.

/* ---------------------------------------------------------------- */

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
 * Complete the 'workbook' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER_ARRAY arr
 */
function workbook(n, k, arr) {
    let specialProblems = 0;
    let currentPage = 1;  // Page number starts from 1

    for (let i = 0; i < n; i++) {
        let problems = arr[i];
        let fullPages = Math.ceil(problems / k);

        for (let page = 0; page < fullPages; page++) {
            let start = page * k + 1; // Start index of problems on this page
            let end = Math.min(start + k - 1, problems); // End index of problems on this page

            if (currentPage >= start && currentPage <= end) {
                specialProblems++;
            }

            currentPage++; // Move to next page
        }
    }
    
    return specialProblems;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = workbook(n, k, arr);

    ws.write(result + '\n');

    ws.end();
}
