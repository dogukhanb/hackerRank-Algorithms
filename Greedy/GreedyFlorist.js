A group of friends want to buy a bouquet of flowers. The florist wants to maximize his number of new customers and the money he makes. To do this, he decides he'll multiply the price of each flower by the number of that customer's previously purchased flowers plus . The first flower will be original price, , the next will be  and so on.

Given the size of the group of friends, the number of flowers they want to purchase and the original prices of the flowers, determine the minimum cost to purchase all of the flowers. The number of flowers they want equals the length of the  array.

Example


The length of , so they want to buy  flowers total. Each will buy one of the flowers priced  at the original price. Having each purchased  flower, the first flower in the list, , will now cost . The total cost is .

Function Description

Complete the getMinimumCost function in the editor below.

getMinimumCost has the following parameter(s):

int c[n]: the original price of each flower
int k: the number of friends
Returns
- int: the minimum cost to purchase all flowers

Input Format

The first line contains two space-separated integers  and , the number of flowers and the number of friends.
The second line contains  space-separated positive integers , the original price of each flower.

Constraints

Sample Input 0

3 3
2 5 6
Sample Output 0

13
Explanation 0

There are  flowers with costs  and  people in the group. If each person buys one flower, the total cost of prices paid is  dollars. Thus, we print  as our answer.

Sample Input 1

3 2
2 5 6
Sample Output 1

15
Explanation 1

There are  flowers with costs  and  people in the group. We can minimize the total purchase cost like so:

The first person purchases  flowers in order of decreasing price; this means they buy the more expensive flower () first at price  dollars and the less expensive flower () second at price  dollars.
The second person buys the most expensive flower at price  dollars.
We then print the sum of these purchases, which is , as our answer.

Sample Input 2

5 3
1 3 5 7 9
Sample Output 2

29
Explanation 2

The friends buy flowers for ,  and ,  and  for a cost of .

/* ----------------------------- */

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

// Complete the getMinimumCost function below.
function getMinimumCost(k, c) {
  // Sort the flower prices in descending order
  c.sort((a, b) => b - a);

  let totalCost = 0;
  let purchases = new Array(k).fill(0); // Track the number of flowers each friend has purchased

  for (let i = 0; i < c.length; i++) {
    const friendIndex = i % k; // Determine which friend buys the flower
    totalCost += c[i] * (purchases[friendIndex] + 1); // Price with multiplier
    purchases[friendIndex]++; // Increment the number of flowers this friend has purchased
  }

  return totalCost;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const nk = readLine().split(" ");

  const n = parseInt(nk[0], 10);

  const k = parseInt(nk[1], 10);

  const c = readLine()
    .split(" ")
    .map((cTemp) => parseInt(cTemp, 10));

  const minimumCost = getMinimumCost(k, c);

  ws.write(minimumCost + "\n");

  ws.end();
}
