Alice gives Bob a board composed of  wooden squares and asks him to find the minimum cost of breaking the board back down into its individual squares. To break the board down, Bob must make cuts along its horizontal and vertical lines.

To reduce the board to squares, Bob makes horizontal and vertical cuts across the entire board. Each cut has a given cost,  or  for each cut along a row or column across one board, so the cost of a cut must be multiplied by the number of segments it crosses. The cost of cutting the whole board down into  squares is the sum of the costs of each successive cut.

Can you help Bob find the minimum cost? The number may be large, so print the value modulo .

For example, you start with a  board. There are two cuts to be made at a cost of  for the horizontal and  for the vertical. Your first cut is across  piece, the whole board. You choose to make the horizontal cut between rows  and  for a cost of . The second cuts are vertical through the two smaller boards created in step  between columns  and . Their cost is . The total cost is  and .

Function Description

Complete the boardCutting function in the editor below. It should return an integer.

boardCutting has the following parameter(s):

cost_x: an array of integers, the costs of vertical cuts
cost_y: an array of integers, the costs of horizontal cuts
Input Format

The first line contains an integer , the number of queries.

The following  sets of lines are as follows:

The first line has two positive space-separated integers  and , the number of rows and columns in the board.
The second line contains  space-separated integers cost_y[i], the cost of a horizontal cut between rows  and  of one board.
The third line contains  space-separated integers cost_x[j], the cost of a vertical cut between columns  and  of one board.
Constraints

Output Format

For each of the  queries, find the minimum cost () of cutting the board into  squares and print the value of .

Sample Input 0

1
2 2
2
1
Sample Output 0

4
Explanation 0
We have a  board, with cut costs  and . Our first cut is horizontal between  and , because that is the line with the highest cost (). Our second cut is vertical, at . Our first cut has a  of  because we are making a cut with cost  across  segment, the uncut board. The second cut also has a  of  but we are making a cut of cost  across  segments. Our answer is .

Sample Input 1

1
6 4
2 1 3 1 4
4 1 2
Sample Output 1

42
Explanation 1
Our sequence of cuts is: , , , , , ,  and .
Cut 1: Horizontal with cost  across  segment. .
Cut 2: Vertical with cost  across  segments. .
Cut 3: Horizontal with cost  across  segments. .
Cut 4: Horizontal with cost  across  segments. .
Cut 5: Vertical with cost  across  segments. .
Cut 6: Horizontal with cost  across  segments. .
Cut 7: Horizontal with cost  across  segments. .
Cut 8: Vertical with cost  across  segments. .

. We then print the value of .

/* ------------------------------------------- */
"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'boardCutting' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY cost_y
 *  2. INTEGER_ARRAY cost_x
 */

function boardCutting(cost_y, cost_x) {
  // Sort both costs in descending order
  cost_y.sort((a, b) => b - a);
  cost_x.sort((a, b) => b - a);

  let totalCost = 0;
  let verticalCuts = 1; // Start with one segment for vertical
  let horizontalCuts = 1; // Start with one segment for horizontal
  let i = 0,
    j = 0;
  const MOD = 1000000007;

  // While there are still cuts to be made in either direction
  while (i < cost_y.length || j < cost_x.length) {
    // If there are remaining horizontal cuts or if vertical cuts are exhausted
    if (i < cost_y.length && (j >= cost_x.length || cost_y[i] >= cost_x[j])) {
      totalCost = (totalCost + ((cost_y[i] * horizontalCuts) % MOD)) % MOD;
      verticalCuts++; // A horizontal cut increases the number of vertical segments
      i++;
    } else {
      totalCost = (totalCost + ((cost_x[j] * verticalCuts) % MOD)) % MOD;
      horizontalCuts++; // A vertical cut increases the number of horizontal segments
      j++;
    }
  }

  return totalCost; // Return the total cost modulo 1,000,000,007
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const m = parseInt(firstMultipleInput[0], 10);
    const n = parseInt(firstMultipleInput[1], 10);

    const cost_y = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((cost_yTemp) => parseInt(cost_yTemp, 10));
    const cost_x = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((cost_xTemp) => parseInt(cost_xTemp, 10));

    const result = boardCutting(cost_y, cost_x);

    ws.write(result + "\n");
  }

  ws.end();
}
